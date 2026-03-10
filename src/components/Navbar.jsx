import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { COMPANY } from '../lib/constants'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why AKT', href: '#why-akt' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-charcoal-deep/95 backdrop-blur-md border-b border-white/5 transition-shadow duration-300 ${
        scrolled ? 'shadow-xl' : ''
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center font-display text-white text-xl font-bold tracking-tight group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight tracking-tight">
                {COMPANY.name}
              </div>
              <div className="text-emerald text-[10px] font-semibold tracking-widest uppercase">
                {COMPANY.license}
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-emerald transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="flex items-center gap-2 text-white hover:text-emerald transition-colors font-semibold text-sm"
              aria-label={`Call ${COMPANY.phone}`}
            >
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
            <a
              href="#contact"
              className="bg-emerald hover:bg-emerald-dark text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors cta-pulse"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile: Phone + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="bg-emerald text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
              aria-label="Call now"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu lg:hidden ${menuOpen ? 'open' : ''}`}>
          <div className="pb-4 pt-2 space-y-1 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-gray-300 hover:text-emerald hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-emerald font-bold hover:bg-white/5 rounded-lg transition-colors text-sm"
            >
              Get Free Quote →
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
