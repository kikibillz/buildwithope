"""Browser regressions against dist/. Requires Python Playwright and Chromium.

Run npm run build first, then python scripts/test-portfolio-browser.py.
External services are blocked: this test never sends contact messages.
"""
import functools
import json
import os
from pathlib import Path
import shutil
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import threading
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
assert (ROOT / 'dist/index.html').is_file(), 'Run npm run build first.'

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionResetError):
            # Navigation can cancel an in-flight MP4 response.
            pass

server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT / 'dist')))
threading.Thread(target=server.serve_forever, daemon=True).start()
base = f'http://127.0.0.1:{server.server_port}'
results = []

def passed(name):
    results.append(name)
    print(f'PASS {name}', flush=True)

try:
    with sync_playwright() as playwright:
        executable = os.environ.get('PORTFOLIO_CHROMIUM') or shutil.which('chromium')
        launch = {'headless': True}
        if os.environ.get('PORTFOLIO_DISABLE_BROWSER_SANDBOX') == '1':
            launch['args'] = ['--no-sandbox']
        if executable:
            launch['executable_path'] = executable
        browser = playwright.chromium.launch(**launch)
        page = browser.new_page(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
        page.set_default_timeout(10000)
        page.route('**/*', lambda route: route.continue_() if route.request.url.startswith(base + '/') else route.abort())
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(base + '/', wait_until='domcontentloaded')
        page.get_by_role('heading', level=1).wait_for()
        assert page.locator('#contact').count() == 1
        passed('main page and unique contact anchor')

        def check_dialog(trigger):
            trigger.click()
            dialog = page.get_by_role('dialog')
            dialog.wait_for()
            assert dialog.count() == 1
            assert dialog.get_attribute('aria-modal') == 'true'
            label = dialog.get_attribute('aria-label')
            label_id = dialog.get_attribute('aria-labelledby')
            assert label or (label_id and page.locator('#' + label_id).inner_text().strip())
            assert page.evaluate("!!document.activeElement.closest('[role=dialog]')")
            assert page.locator('body').evaluate("x=>x.style.overflow") == 'hidden'
            # Explicitly exercise both Tab wrap boundaries.
            dialog.evaluate("""dialog => {
              const controls = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])')].filter(x=>x.getClientRects().length && !x.closest('[inert],[hidden],[aria-hidden="true"]'));
              controls[controls.length-1].focus();
            }""")
            page.keyboard.press('Tab')
            assert page.evaluate("!!document.activeElement.closest('[role=dialog]')")
            page.keyboard.press('Shift+Tab')
            assert page.evaluate("!!document.activeElement.closest('[role=dialog]')")
            page.keyboard.press('Escape')
            assert page.get_by_role('dialog').count() == 0
            assert trigger.evaluate('x=>x===document.activeElement')
            assert not page.locator('#main-content').evaluate('x=>x.inert')

        search = page.get_by_placeholder('Search work, stack, ROI...')
        search.fill('nonexistent-query-2026')
        assert page.get_by_text('No matching projects found', exact=True).is_visible()
        search.fill('Nexus')
        card = page.locator('#project-card-enterprise-rag-prompt-engine')
        check_dialog(card.get_by_role('button', name='Case Study', exact=True))
        check_dialog(card.get_by_role('button', name='Live Demo', exact=True))
        passed('case study and Nexus dialogs: names, focus, Tab wrapping, Escape, restoration')

        search.fill('Bank Customer')
        card = page.locator('#project-card-bank-churn')
        check_dialog(card.get_by_role('button', name='Live Demo', exact=True))
        check_dialog(card.get_by_title('Launch Interactive Power BI & Excel Dashboard'))
        passed('project demo opens and BI dialog keyboard lifecycle')
        search.fill('')
        check_dialog(page.get_by_role('button', name='Play featured beauty concept', exact=True))
        passed('main video dialog keyboard lifecycle and accessible close control')

        page.get_by_role('button', name='4. Churn Analytics', exact=True).click()
        page.get_by_label('Customer geography', exact=True).select_option('Germany')
        page.get_by_label('Customer activity', exact=True).select_option('Dormant')
        assert page.get_by_text('1 of 6 records', exact=False).count() == 1
        with page.expect_download() as download_info:
            page.get_by_title('Download the current filtered sample as CSV').click()
        content = Path(download_info.value.path()).read_text()
        assert 'Customer ID' in content and 'Mitchell' in content and 'Hargrave' not in content
        passed('churn filters and matching CSV export')

        page.locator('#contact-submit-btn').click()
        assert page.get_by_text('Please enter your name.', exact=True).is_visible()
        page.locator('#contact-name').fill('Local browser test')
        page.locator('#contact-email').fill('test@example.com')
        page.locator('#contact-message').fill('Offline validation test; no email should be transmitted.')
        page.locator('#contact-submit-btn').click()
        page.get_by_text('Network connection to the mail service timed out.', exact=False).wait_for()
        assert page.locator('#contact-mailto-fallback').get_attribute('href').startswith('mailto:')
        passed('contact validation and blocked-network fallback without sending mail')

        page.get_by_role('link', name='AI UGC', exact=True).click()
        page.wait_for_url('**/ugc/')
        page.locator('.video-card').first.wait_for()
        assert page.locator('.video-card').count() == 2
        for index in [0, 1]:
            player = page.locator('video').nth(index)
            player.evaluate('(v)=>{v.muted=true;return v.play()}')
            page.wait_for_function('(index)=>document.querySelectorAll("video")[index].currentTime>0', arg=index)
            assert player.evaluate('(v)=>v.error') is None
        assert page.locator('video').first.evaluate('(v)=>v.paused')
        page.get_by_role('button', name='Beauty', exact=True).click()
        assert page.locator('.video-card').count() == 1
        assert page.get_by_role('button', name='Beauty', exact=True).get_attribute('aria-pressed') == 'true'
        page.get_by_role('button', name='All work', exact=True).click()
        assert page.locator('.video-card').count() == 2
        passed('main-to-UGC navigation, both MP4s play, playback exclusion, gallery filters')

        for width in [360, 390, 768, 1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            assert page.evaluate('document.documentElement.scrollWidth') <= width
        page.get_by_role('link', name='Back to main portfolio', exact=False).click()
        page.wait_for_url(base + '/')
        page.set_viewport_size({'width': 390, 'height': 844})
        page.get_by_role('button', name='Open navigation menu').click()
        assert page.get_by_role('link', name='AI UGC', exact=True).is_visible()
        page.keyboard.press('Escape')
        assert not page.get_by_role('link', name='AI UGC', exact=True).is_visible()
        assert page.evaluate('document.documentElement.scrollWidth') <= 390
        page.get_by_role('button', name='Switch to dark mode', exact=True).click()
        assert page.locator('html').evaluate("x=>x.classList.contains('dark')")
        page.reload(wait_until='domcontentloaded')
        assert page.locator('html').evaluate("x=>x.classList.contains('dark')")
        assert not errors, errors
        passed('responsive layouts, return navigation, mobile menu, persistent dark theme, no JavaScript exceptions')
        browser.close()
finally:
    server.shutdown()
    server.server_close()
print(json.dumps({'passed': len(results), 'checks': results}, indent=2))
