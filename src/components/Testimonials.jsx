import { ArrowRight } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { TESTIMONIALS } from '../lib/constants'

function StarRating() {
  return <div className="stars text-sm mb-3 pt-6">★★★★★</div>
}

function ReviewCard({ review, delay = 1 }) {
  return (
    <RevealDiv
      delay={delay}
      className={`bg-white rounded-2xl p-7 hover-lift relative border border-gray-100 ${
        review.wide ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div className="quote-mark relative">
        <StarRating />
        <p className="text-gray-700 text-sm leading-relaxed mb-5">{review.text}</p>
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center text-emerald font-bold text-sm">
            {review.initials}
          </div>
          <div>
            <div className="font-bold text-charcoal text-sm">{review.name}</div>
            <div className="text-gray-500 text-xs">{review.date}</div>
          </div>
        </div>
      </div>
    </RevealDiv>
  )
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-cream" aria-label="Client testimonials and reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealDiv className="text-center mb-14">
          <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
            Client Reviews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal mt-3 mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
            <span className="stars text-xl">★★★★★</span>
            <span className="font-semibold">5.0</span>
            <span>— Five-Star Rated in Los Angeles</span>
          </div>
        </RevealDiv>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, i) => (
            <ReviewCard
              key={review.name}
              review={review}
              delay={(i % 3) + 1}
            />
          ))}
        </div>

        <RevealDiv className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-light text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Join Our Happy Clients
            <ArrowRight className="w-4 h-4" />
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}
