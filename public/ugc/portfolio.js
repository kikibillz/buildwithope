'use strict';

const grid = document.getElementById('video-grid');
const count = document.getElementById('work-count');
const videos = Array.isArray(window.ugcVideos) ? window.ugcVideos : [];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function render(category) {
  grid.querySelectorAll('video').forEach(video => video.pause());
  grid.replaceChildren();
  const selected = videos.filter(item => category === 'All' || item.category === category);
  count.textContent = `${selected.length} ${selected.length === 1 ? 'concept' : 'concepts'}`;
  if (!selected.length) grid.append(element('p', '', 'New work in this category is on its way.'));
  selected.forEach(item => {
    const card = element('article', 'video-card');
    const frame = element('div', 'video-frame');
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.playsInline = true;
    video.poster = item.poster;
    video.src = item.video;
    video.setAttribute('aria-label', `${item.title} — ${item.label}`);
    const error = element('p', 'video-error', 'This video could not load. ');
    error.hidden = true;
    error.setAttribute('role', 'status');
    const link = element('a', '', 'Open the video directly');
    link.href = item.video;
    error.append(link);
    video.addEventListener('error', () => { error.hidden = false; });
    video.addEventListener('play', () => {
      grid.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
    });
    frame.append(video, error);
    const meta = element('div', 'video-meta');
    meta.append(element('span', '', item.category), element('span', '', item.label));
    card.append(frame, meta, element('h3', '', item.title), element('p', '', item.description), element('p', '', item.format));
    grid.append(card);
  });
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    render(button.dataset.filter);
  });
});

render('All');
