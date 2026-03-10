import { Phone, ChevronDown, MapPin, ShieldCheck, ArrowDown } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { COMPANY } from '../lib/constants'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex items-center noise-bg construction-lines overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful modern kitchen remodel in Los Angeles home"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <RevealDiv>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-medium tracking-wide uppercase">
                California Licensed & Insured — {COMPANY.license}
              </span>
            </div>
          </RevealDiv>

          <RevealDiv delay={1}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              LA Home Remodeling
              <br />
              <span className="text-emerald italic">Done Right.</span>
            </h1>
          </RevealDiv>

          <RevealDiv delay={2}>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 max-w-xl font-light">
              Kitchen & bathroom remodels, full gut renovations, and expert
              craftsmanship across Los Angeles and California. One call — no headaches.
            </p>
          </RevealDiv>

          {/* Dual CTAs */}
          <RevealDiv delay={3} className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="inline-flex items-center justify-center gap-3 bg-emerald hover:bg-emerald-dark text-white font-bold text-lg px-8 py-4 rounded-xl transition-all cta-pulse"
            >
              <Phone className="w-5 h-5" />
              {COMPANY.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all"
            >
              Request Free Quote
              <ChevronDown className="w-4 h-4" />
            </a>
          </RevealDiv>

          {/* Trust bar */}
          <RevealDiv delay={4} className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="stars text-base">★★★★★</span>
              <span>5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span>{COMPANY.license}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald" />
              <span>Serving All of Los Angeles</span>
            </div>
          </RevealDiv>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <ArrowDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  )
}
