// Company Info
export const COMPANY = {
  name: 'AKT Construction',
  owner: 'Anton Karpenko',
  phone: '(310) 497-5948',
  phoneTel: '+13104975948',
  license: 'Lic #1107017',
  location: 'Los Angeles, California',
}

// Services data
export const SERVICES = [
  {
    title: 'Kitchen Remodeling',
    description: 'Custom cabinetry, stone countertops, full appliance integration. We handle demo through final finishes — one team, no hand-offs.',
    icon: 'ChefHat',
  },
  {
    title: 'Bathroom Remodeling',
    description: 'Heated floors, frameless glass, freestanding tubs, custom vanities. Tile layouts planned before a single piece is set.',
    icon: 'Bath',
  },
  {
    title: 'Home Additions',
    description: 'Guest suites, offices, entertainment rooms, second stories — built to match the existing structure in materials and finish quality.',
    icon: 'Home',
  },
  {
    title: 'Accessory Dwelling Units',
    description: 'Permitted ADUs from the ground up: guest houses, rental units, home offices. Full kitchen, bath, HVAC — a complete living space.',
    icon: 'Building2',
  },
  {
    title: 'Siding Installation',
    description: 'Natural wood, fiber cement, and engineered stone — installed with proper prep, flashing, and finish to last in LA weather.',
    icon: 'Layers',
  },
  {
    title: 'Flooring Installation',
    description: 'Wide-plank hardwood, natural stone, large-format porcelain. Subfloor prepped to tolerance; transitions planned, not improvised.',
    icon: 'Grid',
  },
  {
    title: 'Window & Door Replacement',
    description: 'Steel-frame glass, solid hardwood entries, folding wall systems. Every opening measured, framed, and sealed correctly.',
    icon: 'DoorOpen',
  },
  {
    title: 'Foundation Repair',
    description: 'We work with licensed structural engineers to fix the root cause — underpinning, waterproofing, crack remediation, seismic retrofit.',
    icon: 'Wrench',
  },
  {
    title: 'Interior Painting',
    description: 'Proper masking, patching, and priming before a drop of paint goes on. Clean finish under any light, every room.',
    icon: 'PaintBucket',
  },
  {
    title: 'Exterior Painting',
    description: 'Professional-grade UV and moisture-resistant coatings. Full surface prep — wash, scrape, prime — before anything gets applied.',
    icon: 'Paintbrush',
  },
  {
    title: 'Plumbing & Electrical',
    description: 'Re-pipes, panel upgrades, recessed lighting, smart home wiring. Licensed, permitted, and coordinated around finished surfaces.',
    icon: 'Zap',
  },
  {
    title: 'Garage Conversions',
    description: 'Gym, office, studio, or guest suite — permitted and inspected. Matching the rest of the house in quality, not just function.',
    icon: 'Car',
  },
]

// Service areas
export const SERVICE_AREAS = [
  'Beverly Hills', 'West Hollywood', 'Westwood',
  'Bel Air', 'Hollywood Hills', 'Century City',
  'Pacific Palisades', 'Studio City', 'Mar Vista',
  'Brentwood', 'Hancock Park', 'Venice',
  'Santa Monica', 'Encino', 'Playa Vista',
  'Malibu', 'Sherman Oaks', 'Culver City',
  'Holmby Hills', 'Calabasas', 'Los Feliz',
]

// Testimonials data — exactly as provided
export const TESTIMONIALS = [
  {
    name: 'Sharon D.',
    date: 'Mar 28, 2023',
    initials: 'SD',
    text: 'Anton is very knowledgeable about construction work. He is also very detailed and his pricing is fair. I also appreciate his good communication skills. I can always reach him even after business hours. He has gutted (down to the studs) several of my apartments and has also completed different projects at my house.',
  },
  {
    name: 'Jared F.',
    date: 'Dec 9, 2025',
    initials: 'JF',
    text: 'AKT did a great job moving a closet door in my spare room. Details: Interior door, like a bedroom or closet door • 2 doors • French or double • Wood • No, I need professional\'s help in purchasing • Home Door Installation',
  },
  {
    name: 'Jake T.',
    date: 'Feb 8, 2025',
    initials: 'JT',
    text: 'Anton and his team are amazing! We needed to remodel the bathroom and kitchen in our newly purchased home. He provided us with a great price, completed the job on time, and the results exceeded our expectations. I highly recommend his services!',
  },
  {
    name: 'RDM M.',
    date: 'Jun 2, 2025',
    initials: 'RM',
    text: 'I had an outstanding experience working with AKT on the full remodel of my condo, including the kitchen, bathrooms, flooring, and paint throughout. From start to finish, they were professional, communicative, and solution-oriented. They handled all sourcing of materials and coordinated seamlessly with my architect, handled all permitting efficiently, and managed the project with precision and care. Working in a condo can be especially challenging due to strict HOA rules and building regulations, but they navigated it all smoothly and respectfully. I truly appreciated their patience and professionalism throughout the process, and I\'m thrilled with the final outcome.',
    wide: true,
  },
  {
    name: 'Swampscott, MA',
    date: 'Feb 27, 2025',
    initials: 'S',
    text: 'First to Review Quality is very important to me.. They are the best so far.. price wise.. no biulders comes close.',
  },
]

// Default portfolio images (used when Supabase has none)
export const DEFAULT_PORTFOLIO = [
  { url: '/images/portfolio-bath-1.jpg', caption: 'Luxury Master Bathroom — Soaking Tub & Glass Shower', project_type: 'Bathroom Remodel' },
  { url: '/images/portfolio-kitchen-1.jpg', caption: 'Full Kitchen Remodel — White Shaker Cabinets & Quartz', project_type: 'Kitchen Remodel' },
  { url: '/images/portfolio-bath-2.jpg', caption: 'Double Vanity — LED Mirror & Custom Tile Accent Wall', project_type: 'Bathroom Remodel' },
  { url: '/images/portfolio-kitchen-2.jpg', caption: 'Kitchen Renovation — White Cabinets, Gas Range & Stainless', project_type: 'Kitchen Remodel' },
  { url: '/images/portfolio-bath-3.jpg', caption: 'Spa Bathroom — Artistic Tile Wall & Frameless Glass Shower', project_type: 'Bathroom Remodel' },
  { url: '/images/portfolio-bath-4.jpg', caption: 'Modern Bathroom — Floating Double Vanity & Large Format Tile', project_type: 'Bathroom Remodel' },
  { url: '/images/portfolio-bath-5.jpg', caption: 'Luxury Bathroom — Large Format Tile & Custom Wood Cabinetry', project_type: 'Bathroom Remodel' },
  { url: '/images/portfolio-bath-6.jpg', caption: 'Master Bath — Freestanding Soaking Tub & Gold Fixtures', project_type: 'Bathroom Remodel' },
]

// Project type options
export const PROJECT_TYPES = [
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Full Home Remodel',
  'Flooring & Painting',
  'Door Installation',
  'Other',
]
