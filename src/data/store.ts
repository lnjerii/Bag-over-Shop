export type Category =
  | 'Handbags'
  | 'Backpacks'
  | 'Tote Bags'
  | 'Crossbody'
  | 'Travel Bags'
  | 'Laptop Bags'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  description: string
  image: string
  alt: string
  colors: string[]
  badge?: string
}

const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

// Keep catalog copy, product photography, category imagery, and gallery imagery together.
export const products: Product[] = [
  {
    id: 'mara-shoulder',
    name: 'Mara Shoulder Bag',
    category: 'Handbags',
    price: 4850,
    description: 'A softly structured everyday favourite with a roomy interior and thoughtful pockets for your daily essentials.',
    image: photo('photo-1584917865442-de89df76afd3'),
    alt: 'Tan leather-style shoulder bag with a structured silhouette',
    colors: ['Cognac', 'Black', 'Sand'],
    badge: 'Bestseller',
  },
  {
    id: 'weekender',
    name: 'The Weekender',
    category: 'Travel Bags',
    price: 7200,
    description: 'A generous carryall designed for spontaneous weekends, with space for the little extras.',
    image: photo('photo-1553062407-98eeb64c6a62'),
    alt: 'Olive canvas travel backpack ready for a weekend away',
    colors: ['Olive', 'Charcoal'],
    badge: 'New',
  },
  {
    id: 'everyday-tote',
    name: 'Everyday Canvas Tote',
    category: 'Tote Bags',
    price: 2950,
    description: 'An easy, unfussy tote that goes from the market to your favourite café without missing a beat.',
    image: photo('photo-1590874103328-eac38a683ce7'),
    alt: 'Neutral everyday tote bag with clean, minimal styling',
    colors: ['Natural', 'Black', 'Terracotta'],
  },
  {
    id: 'sol-crossbody',
    name: 'Sol Crossbody',
    category: 'Crossbody',
    price: 3850,
    description: 'Hands-free and just the right size, finished with an adjustable strap for all-day exploring.',
    image: photo('photo-1548036328-c9fa89d128fa'),
    alt: 'Compact warm-brown crossbody bag photographed in soft light',
    colors: ['Caramel', 'Black', 'Moss'],
    badge: 'Bestseller',
  },
  {
    id: 'city-pack',
    name: 'City Daypack',
    category: 'Backpacks',
    price: 5600,
    description: 'A lightweight city companion with a considered shape and space for everything your day asks of you.',
    image: photo('photo-1622560480654-d96214fdc887'),
    alt: 'Minimal dark daypack with practical zip compartments',
    colors: ['Black', 'Stone', 'Forest'],
  },
  {
    id: 'luna-mini',
    name: 'Luna Mini Bag',
    category: 'Handbags',
    price: 3450,
    description: 'A little statement-maker for dinners and days out, with enough room for the essentials.',
    image: photo('photo-1564422170194-896b89110ef8'),
    alt: 'Small elegant handbag in a warm neutral shade',
    colors: ['Ivory', 'Espresso', 'Rose'],
  },
  {
    id: 'commuter-tote',
    name: 'Commuter Tote',
    category: 'Laptop Bags',
    price: 6400,
    description: 'A polished workday tote with a padded laptop sleeve and a comfortable shoulder drop.',
    image: photo('photo-1591561954557-26941169b49e'),
    alt: 'Spacious structured tote suitable for commuting with a laptop',
    colors: ['Black', 'Taupe', 'Navy'],
    badge: 'New',
  },
  {
    id: 'coast-duffel',
    name: 'Coast Duffel',
    category: 'Travel Bags',
    price: 5900,
    description: 'A soft-sided overnight bag with an easy-going feel and plenty of room for a change of plans.',
    image: photo('photo-1553062407-98eeb64c6a62'),
    alt: 'Durable travel bag with generous carry space',
    colors: ['Sand', 'Olive', 'Ink'],
  },
  {
    id: 'woven-market',
    name: 'Woven Market Tote',
    category: 'Tote Bags',
    price: 4200,
    description: 'Texture, ease, and a little sunshine. Your new favourite for slow Saturdays and sunny errands.',
    image: photo('photo-1590874103328-eac38a683ce7'),
    alt: 'Textured woven tote bag with a natural, relaxed finish',
    colors: ['Natural', 'Cocoa'],
  },
  {
    id: 'mini-sling',
    name: 'Daylight Sling',
    category: 'Crossbody',
    price: 3150,
    description: 'A compact, casual sling that keeps your phone, keys, and small essentials close at hand.',
    image: photo('photo-1622560480654-d96214fdc887'),
    alt: 'Compact everyday sling bag in understated neutral tones',
    colors: ['Clay', 'Black', 'Olive'],
  },
]

export const categories: { name: Category; image: string; alt: string; note: string }[] = [
  { name: 'Handbags', image: photo('photo-1584917865442-de89df76afd3', 700), alt: 'Classic handbag in a warm tan shade', note: 'For all your little things' },
  { name: 'Backpacks', image: photo('photo-1622560480654-d96214fdc887', 700), alt: 'Modern backpack with practical details', note: 'A little room to roam' },
  { name: 'Tote Bags', image: photo('photo-1590874103328-eac38a683ce7', 700), alt: 'Versatile neutral tote bag', note: 'Your everyday plus-one' },
  { name: 'Crossbody', image: photo('photo-1548036328-c9fa89d128fa', 700), alt: 'Compact crossbody bag in soft light', note: 'Hands-free, always' },
  { name: 'Travel Bags', image: photo('photo-1553062407-98eeb64c6a62', 700), alt: 'Travel-ready backpack for a short escape', note: 'Made for the in-between' },
  { name: 'Laptop Bags', image: photo('photo-1591561954557-26941169b49e', 700), alt: 'Structured work tote with room for a laptop', note: 'Workday, well carried' },
]

export const instagramPhotos = [
  { image: photo('photo-1553062407-98eeb64c6a62', 600), alt: 'A well-loved travel bag ready for a weekend trip' },
  { image: photo('photo-1584917865442-de89df76afd3', 600), alt: 'Close-up of a timeless everyday handbag' },
  { image: photo('photo-1590874103328-eac38a683ce7', 600), alt: 'A neutral tote styled for a sunny day out' },
  { image: photo('photo-1548036328-c9fa89d128fa', 600), alt: 'A compact crossbody bag in warm natural light' },
  { image: photo('photo-1622560480654-d96214fdc887', 600), alt: 'A practical daypack for city adventures' },
]

export const heroImage = photo('photo-1553062407-98eeb64c6a62', 1800)
export const storyImage = photo('photo-1591561954557-26941169b49e', 1200)
export const whatsappNumber = '254741363694'
export const formatKes = (amount: number) =>
  `KES ${new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 }).format(amount)}`
