import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PortfolioConfig } from '../types';
import { AnimatedName } from './AnimatedName';

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

      const sections = ['about', 'skills', 'projects', 'ai-videos', 'experience', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'AI Videos', href: '#ai-videos' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#fafaf9]/90 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          href="#"
          id="nav-brand"
          className="group flex items-center gap-2 text-stone-900 font-semibold tracking-tight text-base"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-700 inline-block transition-transform group-hover:scale-125" />
          <AnimatedName name={config.name} variant="nav" />
          <span className="text-stone-400 text-xs hidden sm:inline-block font-mono border-l border-stone-300 pl-2">
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
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'text-stone-950 font-medium bg-stone-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            id="nav-cta-talk"
            className="inline-flex items-center gap-1 text-sm font-medium text-stone-900 bg-stone-900 text-white hover:bg-stone-800 px-4 py-1.5 rounded-md transition-colors"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 text-stone-700 hover:text-stone-950 rounded-md hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-[#fafaf9] border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 shadow-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-center text-sm font-medium text-white bg-stone-900 px-4 py-2.5 rounded-md"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
