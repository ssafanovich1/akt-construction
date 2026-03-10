import { Phone } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { COMPANY } from '../lib/constants'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white" aria-label="About Anton Karpenko and AKT Construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <RevealDiv>
              <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
                Meet Your Contractor
              </span>
            </RevealDiv>
            <RevealDiv delay={1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal mt-3 mb-6">
                Anton Karpenko &amp;
                <br />
                AKT Construction
              </h2>
            </RevealDiv>
            <RevealDiv delay={2}>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  When you hire AKT Construction, you're not handed off to a project
                  manager — you work directly with{' '}
                  <strong className="text-charcoal">Anton Karpenko</strong>, the owner
                  and lead contractor. Anton believes that honest communication, fair
                  pricing, and meticulous craftsmanship aren't luxuries — they're the
                  bare minimum every homeowner deserves.
                </p>
                <p>
                  From a straightforward bathroom refresh to a full condo gut remodel
                  with architect coordination, HOA navigation, and city permits, Anton
                  and his team handle it all. No subcontractor runaround, no surprise
                  invoices, no excuses.
                </p>
                <p>
                  AKT Construction is{' '}
                  <strong className="text-charcoal">
                    California Licensed & Insured ({COMPANY.license})
                  </strong>{' '}
                  and proudly serves homeowners across the greater Los Angeles area.
                  Every project is treated like it's Anton's own home — because your
                  trust is worth more than any single job.
                </p>
              </div>
            </RevealDiv>

            <RevealDiv delay={3} className="flex flex-wrap gap-6 mt-8">
              <div className="text-center">
                <div className="font-display text-3xl text-emerald">5.0</div>
                <div className="text-sm text-gray-500 font-medium">Star Rating</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-emerald">100%</div>
                <div className="text-sm text-gray-500 font-medium">On-Time</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-emerald">LA</div>
                <div className="text-sm text-gray-500 font-medium">Based & Local</div>
              </div>
            </RevealDiv>

            <RevealDiv delay={4} className="mt-8">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center gap-3 text-emerald hover:text-emerald-dark font-bold text-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                {COMPANY.phone} — Call Anton Directly
              </a>
            </RevealDiv>
          </div>

          {/* Image */}
          <RevealDiv className="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
              alt="Beautiful kitchen remodel by AKT Construction"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
              loading="lazy"
            />
          </RevealDiv>
        </div>
      </div>
    </section>
  )
}
