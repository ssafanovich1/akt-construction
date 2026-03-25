'use client'
import { Phone } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { COMPANY } from '../lib/constants'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white" aria-label="About Anton Karpenko and AKT Construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <RevealDiv>
              <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
                About Us
              </span>
            </RevealDiv>
            <RevealDiv delay={1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal mt-3 mb-6">
                AKT Construction
              </h2>
            </RevealDiv>
            <RevealDiv delay={2}>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AKT Construction is a full-service general contractor based in Los Angeles,
                  serving Beverly Hills, Bel Air, Pacific Palisades, Brentwood, Malibu,
                  West Hollywood, and communities across the Westside and the Hills.
                </p>
                <p>
                  We build and remodel high-end residential properties. Kitchens, bathrooms,
                  full-home renovations, additions, ADUs, structural work — whatever the scope,
                  our team handles it from permit to punch list. We work with your architect and
                  designer or bring our own. Either way, we keep the project on schedule, on
                  budget, and built right.
                </p>
                <p>
                  Our clients hire us because we show up, communicate clearly, and deliver
                  finished work they don't have to second-guess. That reputation is earned one
                  project at a time.{' '}
                  <strong className="text-charcoal">
                    California Contractor's License {COMPANY.license}.
                  </strong>
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
            <Image
              src="/images/portfolio-bath-1.jpg"
              alt="Luxury bathroom remodel by AKT Construction in Los Angeles"
              width={800}
              height={800}
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
            />
          </RevealDiv>
        </div>
      </div>
    </section>
  )
}
