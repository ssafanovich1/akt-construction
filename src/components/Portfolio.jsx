'use client'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { getPortfolioImages } from '../lib/supabase'
import { DEFAULT_PORTFOLIO } from '../lib/constants'
import Image from 'next/image'

const FILTERS = ['All', 'Kitchen Remodel', 'Bathroom Remodel', 'Full Home Remodel']

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  useEffect(() => {
    loadImages()
    const handler = () => loadImages()
    window.addEventListener('portfolio-updated', handler)
    return () => window.removeEventListener('portfolio-updated', handler)
  }, [])

  async function loadImages() {
    setLoading(true)
    try {
      const supaImages = await getPortfolioImages()
      setImages(supaImages.length > 0 ? [...supaImages, ...DEFAULT_PORTFOLIO] : DEFAULT_PORTFOLIO)
    } catch {
      setImages(DEFAULT_PORTFOLIO)
    }
    setLoading(false)
  }

  const filtered = active === 'All' ? images : images.filter(img => img.project_type === active)

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-charcoal-deep relative noise-bg" aria-label="Project portfolio gallery">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <RevealDiv className="text-center mb-10">
          <span className="text-emerald font-semibold text-sm tracking-widest uppercase">Our Work</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mt-3 mb-4">
            Recent Projects in Los Angeles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real transformations for real homeowners across Beverly Hills, Bel Air, and the Westside.
          </p>
        </RevealDiv>

        {/* Filter tabs */}
        <RevealDiv className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === f
                  ? 'bg-emerald text-white shadow-lg shadow-emerald/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </RevealDiv>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((img, i) => {
              // First item is featured — spans 2 columns and is taller
              const isFeatured = i === 0
              return (
                <div
                  key={`${img.url}-${i}`}
                  className={`group relative overflow-hidden rounded-2xl bg-charcoal-light ${
                    isFeatured
                      ? 'col-span-2 row-span-2 aspect-[16/10]'
                      : 'col-span-1 aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.caption || 'AKT Construction project'}
                    fill
                    sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay — always slightly visible at bottom, full on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-emerald/90 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                      {img.project_type || 'Renovation'}
                    </span>
                    <p className={`text-white font-semibold leading-snug ${isFeatured ? 'text-base md:text-lg' : 'text-sm'}`}>
                      {img.caption || ''}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <RevealDiv className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-dark text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}
