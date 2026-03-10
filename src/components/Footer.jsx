import { Phone, MapPin } from 'lucide-react'
import { COMPANY } from '../lib/constants'

export default function Footer({ onAdminClick }) {
  return (
    <footer className="bg-charcoal py-14 border-t border-white/5" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald rounded-lg flex items-center justify-center font-display text-white text-lg font-bold">
                A
              </div>
              <div>
                <div className="text-white font-bold text-base leading-tight">
                  {COMPANY.name}
                </div>
                <div className="text-emerald text-[10px] font-semibold tracking-widest uppercase">
                  {COMPANY.license}
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              California Licensed & Insured general contractor serving Los Angeles
              homeowners with quality remodeling.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              {[
                'Kitchen Remodeling',
                'Bathroom Remodeling',
                'Full Home Gut Remodels',
                'Flooring & Painting',
                'Door Installation',
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-emerald transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              {[
                { label: 'Why Choose AKT', href: '#why-akt' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'About Anton', href: '#about' },
                { label: 'Get a Quote', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-emerald transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="flex items-center gap-2 hover:text-emerald transition-colors font-semibold text-white"
                >
                  <Phone className="w-4 h-4 text-emerald" />
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald flex-shrink-0" />
                {COMPANY.location}
              </li>
              <li className="text-xs mt-2">
                California Licensed & Insured
                <br />
                {COMPANY.license}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <button
            onClick={onAdminClick}
            className="text-gray-700 hover:text-gray-500 text-xs transition-colors"
            aria-label="Admin panel"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  )
}
