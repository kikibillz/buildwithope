import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PortfolioConfig } from '../types';
import { AnimatedName } from './AnimatedName';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  config: PortfolioConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'projects', 'ai-videos', 'experience', 'certifications', 'resume', 'contact'];
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
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI Videos', href: '#ai-videos' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fafaf9]/90 dark:bg-[#0c0a09]/90 backdrop-blur-xl border-b border-stone-200/80 dark:border-white/10 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          id="nav-brand"
          data-cursor-text="HOME"
          className="group flex items-center gap-2.5 text-stone-900 dark:text-stone-100 font-display font-bold tracking-tight text-base py-1"
        >
          {/* Architectural Graphic Logo Emblem */}
          <div className="w-8 h-8 rounded-lg bg-stone-950 dark:bg-stone-100 text-stone-100 dark:text-stone-950 flex items-center justify-center font-mono font-bold text-xs shadow-xs border border-stone-800 dark:border-stone-200 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-4 h-4 text-emerald-400 dark:text-emerald-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="12" r="4.5" />
              <circle cx="17" cy="12" r="4.5" />
              <path d="M11.5 12h1" strokeWidth="2.5" />
            </svg>
          </div>
          <AnimatedName name={config.name} variant="nav" />
          <span className="text-stone-400 dark:text-stone-500 text-xs hidden sm:inline-block font-mono border-l border-stone-300 dark:border-stone-800 pl-2 tracking-widest uppercase">
            portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.href.substring(1)}`}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 rounded-md ${
                  isActive
                    ? 'text-stone-950 dark:text-stone-100 font-semibold bg-stone-200/70 dark:bg-stone-800/80 shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            id="nav-cta-talk"
            data-cursor-text="TALK"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white px-5 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer border border-stone-900 dark:border-white"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle + Hamburger with min 44px touch targets */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            type="button"
            data-cursor-text="MENU"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[57px] bg-stone-950/40 dark:bg-black/60 backdrop-blur-xs md:hidden z-30 animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-menu"
            className="relative z-40 md:hidden bg-[#fafaf9] dark:bg-[#121214] border-b border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 space-y-1 shadow-xl max-h-[calc(100vh-65px)] overflow-y-auto"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center min-h-[44px] px-3.5 py-2.5 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-950 dark:text-stone-100 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/80'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-3">
              <ThemeToggle variant="expanded" />
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-center text-sm font-semibold min-h-[44px] text-white dark:text-stone-950 bg-stone-900 dark:bg-stone-100 active:bg-stone-800 dark:active:bg-white px-4 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
