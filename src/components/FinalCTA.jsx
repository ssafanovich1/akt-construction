import { Phone } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { COMPANY } from '../lib/constants'

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-emerald relative overflow-hidden" aria-label="Call to action">
      {/* Diagonal pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealDiv>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Your Dream Remodel Starts
            <br />
            With One Call
          </h2>
        </RevealDiv>
        <RevealDiv delay={1}>
          <p className="text-white/90 text-lg mb-8">
            Talk to Anton directly. No voicemail, no runaround — just an honest
            conversation about your home.
          </p>
        </RevealDiv>
        <RevealDiv delay={2}>
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="inline-flex items-center gap-3 bg-charcoal-deep hover:bg-charcoal text-white font-bold text-xl md:text-2xl px-10 py-5 rounded-2xl transition-colors shadow-xl"
          >
            <Phone className="w-6 h-6" />
            {COMPANY.phone}
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}
