import {
  ChefHat, Bath, Building2, PaintBucket, DoorOpen, FileCheck, ArrowRight
} from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { SERVICES } from '../lib/constants'

const iconMap = {
  ChefHat, Bath, Building2, PaintBucket, DoorOpen, FileCheck,
}

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-cream relative" aria-label="Our remodeling services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealDiv className="text-center mb-16">
          <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal mt-3 mb-4">
            Los Angeles Remodeling Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From a single room refresh to a full-gut transformation — we handle every
            phase so you don't have to.
          </p>
        </RevealDiv>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <RevealDiv
                key={service.title}
                delay={(i % 3) + 1}
                className="bg-white rounded-2xl p-8 hover-lift group cursor-pointer border border-gray-100"
              >
                <div className="w-14 h-14 bg-emerald/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald/20 transition-colors">
                  {Icon && <Icon className="w-7 h-7 text-emerald" strokeWidth={1.5} />}
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </RevealDiv>
            )
          })}
        </div>

        <RevealDiv className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-light text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}
