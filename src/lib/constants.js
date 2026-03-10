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
    description: 'Complete kitchen transformations — custom cabinets, countertops, islands, backsplash, appliance install, and plumbing upgrades.',
    icon: 'ChefHat',
  },
  {
    title: 'Bathroom Remodeling',
    description: 'Showers, tubs, vanities, tile work, fixtures, and full layout redesign. From dated to modern in weeks.',
    icon: 'Bath',
  },
  {
    title: 'Full Home & Condo Gut Remodels',
    description: 'Down-to-the-studs renovation. We manage every trade, every permit, and every detail from demo to move-in.',
    icon: 'Building2',
  },
  {
    title: 'Flooring & Painting',
    description: 'Hardwood, tile, LVP, carpet — plus expert interior and exterior painting that transforms any space.',
    icon: 'PaintBucket',
  },
  {
    title: 'Custom Door Installation & Interior Work',
    description: 'Interior doors, French doors, closet systems, trim, molding, and all the detail work that makes a home feel finished.',
    icon: 'DoorOpen',
  },
  {
    title: 'Permitting, HOA & Material Sourcing',
    description: 'We pull all permits, navigate HOA rules, coordinate with architects, and source every material — saving you time and stress.',
    icon: 'FileCheck',
  },
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
  { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80', caption: 'Modern Kitchen Remodel', project_type: 'Kitchen Remodel' },
  { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80', caption: 'Luxury Bathroom Renovation', project_type: 'Bathroom Remodel' },
  { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80', caption: 'Open-Concept Living Space', project_type: 'Full Home Remodel' },
  { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7a5a0c?auto=format&fit=crop&w=600&q=80', caption: 'Hardwood Flooring Install', project_type: 'Flooring & Painting' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=600&q=80', caption: 'Complete Condo Gut Remodel', project_type: 'Full Home Remodel' },
  { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=600&q=80', caption: 'Custom Interior Finishes', project_type: 'Other' },
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
