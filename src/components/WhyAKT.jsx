import { MessageSquare, DollarSign, Clock, BadgeCheck, Phone } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { COMPANY } from '../lib/constants'

const reasons = [
  {
    icon: MessageSquare,
    title: 'Exceptional Communication',
    desc: "Anton answers his phone — even after hours. You'll always know what's happening with your project, every step of the way.",
  },
  {
    icon: DollarSign,
    title: 'Fair, Transparent Pricing',
    desc: 'No hidden fees, no surprise change orders. You get a detailed quote and we stick to it. Period.',
  },
  {
    icon: Clock,
    title: 'On-Time Completion',
    desc: "We set realistic timelines and hit them. Your kitchen won't be torn apart for months — we move fast and clean.",
  },
  {
    icon: BadgeCheck,
    title: 'Complex Project Expertise',
    desc: "Condos with strict HOA rules? Full gut remodels? Multi-unit buildings? We've done it all — smoothly and by the book.",
  },
]

export default function WhyAKT() {
  return (
    <section id="why-akt" className="py-20 md:py-28 bg-white relative" aria-label="Why choose AKT Construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <RevealDiv className="relative">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
              alt="Modern bathroom remodel completed by AKT Construction in Los Angeles"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-emerald text-white rounded-2xl p-6 shadow-xl hidden md:block">
              <div className="font-display text-3xl">100%</div>
              <div className="text-sm font-medium opacity-90">Client Satisfaction</div>
            </div>
          </RevealDiv>

          {/* Right: Content */}
          <div>
            <RevealDiv>
              <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
                Why Homeowners Trust AKT
              </span>
            </RevealDiv>
            <RevealDiv delay={1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal mt-3 mb-8">
                California Remodeling
                <br />
                Without the Headaches
              </h2>
            </RevealDiv>

            <div className="space-y-6">
              {reasons.map((r, i) => (
                <RevealDiv key={r.title} delay={i + 1} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald/10 rounded-lg flex items-center justify-center mt-1">
                    <r.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg mb-1">{r.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </RevealDiv>
              ))}
            </div>

            <RevealDiv delay={5} className="mt-10">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center gap-3 bg-emerald hover:bg-emerald-dark text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Anton: {COMPANY.phone}
              </a>
            </RevealDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
