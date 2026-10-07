import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PortfolioConfig } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  config: PortfolioConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'hr-offer', 'work', 'outreach', 'skills', 'about', 'video', 'certifications', 'fastapi', 'repos', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { label: 'HR Offer', href: '#hr-offer', id: 'hr-offer' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Outreach', href: '#outreach', id: 'outreach' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'AI video', href: '#video', id: 'video' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Resume', href: '#resume', id: 'resume' },
  ];

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-xl transition-colors"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
        {/* Brand / Logo */}
        <a
          href="#top"
          id="nav-brand"
          data-cursor-text="HOME"
          className="flex items-center gap-3 group"
          aria-label={`${config.name}, home`}
        >
          <span className="grid size-9 place-items-center bg-foreground font-display text-sm text-background shadow-brutal-xs transition-transform group-hover:scale-105 rounded-xs">
            O.
          </span>
          <span className="font-bold text-foreground tracking-tight font-mono text-sm sm:text-base">
            Build with Ope
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.id}`}
                className={`nav-link transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-foreground/85 hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            id="nav-cta-talk"
            data-cursor-text="TALK"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/88 hover:-translate-y-0.5 h-8 rounded-md px-3 text-xs"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-foreground rounded-md hover:bg-foreground/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-foreground/20 backdrop-blur-xs md:hidden z-30"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative md:hidden z-40 bg-background border-b border-foreground/15 px-5 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 font-semibold text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-1.5 text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-foreground/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground shadow-[var(--shadow-button)] h-10 rounded-md text-xs font-bold uppercase tracking-wider"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
