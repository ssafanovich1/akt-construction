'use client'
import { MapPin } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { SERVICE_AREAS } from '../lib/constants'

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="py-20 md:py-28 bg-charcoal" aria-label="Service areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealDiv className="text-center mb-14">
          <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
            Where We Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mt-3 mb-4">
            Service Areas
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We serve homeowners across Los Angeles — from the Westside and the Hills
            to the Valley and the coast.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {SERVICE_AREAS.map((area, i) => (
            <RevealDiv
              key={area}
              delay={(i % 4) + 1}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
              {area}
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
