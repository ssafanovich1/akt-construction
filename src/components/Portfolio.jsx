import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { RevealDiv } from '../lib/useScrollReveal'
import { getPortfolioImages } from '../lib/supabase'
import { DEFAULT_PORTFOLIO } from '../lib/constants'

export default function Portfolio() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
    // Listen for custom event from admin panel
    const handler = () => loadImages()
    window.addEventListener('portfolio-updated', handler)
    return () => window.removeEventListener('portfolio-updated', handler)
  }, [])

  async function loadImages() {
    setLoading(true)
    try {
      const supaImages = await getPortfolioImages()
      if (supaImages.length > 0) {
        setImages([...supaImages, ...DEFAULT_PORTFOLIO])
      } else {
        setImages(DEFAULT_PORTFOLIO)
      }
    } catch {
      setImages(DEFAULT_PORTFOLIO)
    }
    setLoading(false)
  }

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-charcoal-deep relative noise-bg" aria-label="Project portfolio gallery">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealDiv className="text-center mb-14">
          <span className="text-emerald font-semibold text-sm tracking-widest uppercase">
            Our Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mt-3 mb-4">
            Recent Projects in Los Angeles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real transformations for real homeowners. See what AKT Construction can do
            for your space.
          </p>
        </RevealDiv>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="group relative rounded-xl overflow-hidden bg-charcoal-light aspect-[4/3]"
              >
                <img
                  src={img.url}
                  alt={img.caption || 'AKT Construction project'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML =
                      '<div class="flex items-center justify-center h-full text-gray-500 text-sm">Image unavailable</div>'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-emerald text-xs font-semibold uppercase tracking-wider">
                      {img.project_type || ''}
                    </span>
                    <p className="text-white font-semibold text-sm mt-1">
                      {img.caption || ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <RevealDiv className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-dark text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Start Your Transformation
            <ArrowRight className="w-4 h-4" />
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}
