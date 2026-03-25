import { Playfair_Display, Outfit } from 'next/font/google'
import '../index.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'AKT Construction | Luxury Construction & Remodeling Los Angeles | Lic #1107017',
  description: 'Full-service general contractor in Los Angeles — kitchens, bathrooms, additions, ADUs, and full-home renovations in Beverly Hills, Bel Air, Pacific Palisades, Brentwood, Malibu, and across the Westside.',
  keywords: [
    'Los Angeles contractor',
    'luxury remodeling Los Angeles',
    'kitchen remodel Beverly Hills',
    'bathroom remodel Bel Air',
    'home addition Los Angeles',
    'ADU builder LA',
    'AKT Construction',
    'Anton Karpenko contractor',
    'licensed contractor Los Angeles',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'AKT Construction | Luxury Construction & Remodeling Los Angeles',
    description: 'Full-service general contractor serving Beverly Hills, Bel Air, Pacific Palisades, Brentwood, Malibu, and across the Westside. Call (310) 497-5948.',
    url: 'https://aktconstructioncorp.com',
    siteName: 'AKT Construction',
    images: [
      {
        url: 'https://aktconstructioncorp.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AKT Construction — Luxury Remodeling in Los Angeles',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aktconstructioncorp.com',
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Los Angeles',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'AKT Construction',
  url: 'https://aktconstructioncorp.com',
  telephone: '+1-310-497-5948',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Los Angeles' },
    { '@type': 'State', name: 'California' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction & Remodeling Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Additions' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Accessory Dwelling Units' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Siding Installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring Installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Window & Door Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foundation Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumbing & Electrical' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Garage Conversions' } },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
