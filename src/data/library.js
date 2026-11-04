// The decor library. Each entry is one item a designer can add to the design.
// type   -> which 3D model to draw (see src/models/index.js)
// color  -> starting colour (fabric, metal or wood, depending on the item)
// ring   -> radius of the gold selection ring under the item (metres)
// real   -> true when it is a real 3D model file, not built from shapes
// text   -> starting text, for items that show words (signs, boards)
// tags   -> extra words for the search box
export const LIBRARY = [
  // Mandaps
  { type: 'floralMandap', name: 'Floral canopy mandap', category: 'Mandaps', color: '#f4ede3', ring: 2.2, tags: 'flower roof jasmine' },
  { type: 'templeMandap', name: 'South Indian temple mandap', category: 'Mandaps', color: '#9a5a2e', ring: 2.2, tags: 'gopuram kalasam banana marigold traditional' },
  { type: 'modernMandap', name: 'Modern minimal mandap', category: 'Mandaps', color: '#d4af6a', ring: 2.2, tags: 'gold frame pampas sheer' },
  { type: 'domeMandap', name: 'Dome pavilion mandap', category: 'Mandaps', color: '#f4ede3', ring: 2.2, tags: 'round dome gazebo' },

  // Backdrops
  { type: 'archBackdrop', name: 'Floral arch backdrop', category: 'Backdrops', color: '#f7efe6', ring: 2.8 },
  { type: 'pleatedBackdrop', name: 'Pleated fabric backdrop', category: 'Backdrops', color: '#f6e3e5', ring: 2.8, tags: 'cloth wall' },
  { type: 'flowerWall', name: 'Rose flower wall', category: 'Backdrops', color: '#3d5a36', ring: 1.4, tags: 'photo booth' },
  { type: 'marigoldCurtain', name: 'Marigold string curtain', category: 'Backdrops', color: '#f0a12c', ring: 1.7, tags: 'genda phool ladi haldi' },
  { type: 'jasmineCurtain', name: 'Jasmine string curtain', category: 'Backdrops', color: '#fffdf6', ring: 1.7, tags: 'mogra malli ladi' },

  // Fabric decor
  { type: 'ceilingDrape', name: 'Ceiling drape', category: 'Fabric decor', color: '#fbf6ee', ring: 4, tags: 'canopy roof swag' },
  { type: 'swagArch', name: 'Fabric swag arch', category: 'Fabric decor', color: '#f6e3e5', ring: 1.6, tags: 'entrance drape' },
  { type: 'sheerCurtains', name: 'Sheer entrance curtains', category: 'Fabric decor', color: '#fbf6ee', ring: 1.7, tags: 'drape tieback' },

  // Florals
  { type: 'flowerStand', name: 'Rose ball stand', category: 'Florals', color: '#d4af6a', ring: 0.5 },
  { type: 'urn', name: 'Rose urn', category: 'Florals', color: '#c9a35e', ring: 0.55 },
  { type: 'hydrangeaBox', name: 'Hydrangea box', category: 'Florals', color: '#d4af6a', ring: 0.45, tags: 'aisle table' },
  { type: 'aisleFlowers', name: 'Aisle flowers with candle', category: 'Florals', color: '#ffffff', ring: 0.5 },
  { type: 'pampasVase', name: 'Pampas grass vase', category: 'Florals', color: '#efe7da', ring: 0.4, tags: 'boho' },
  { type: 'floralHoop', name: 'Floral hoop', category: 'Florals', color: '#d4af6a', ring: 1.1, tags: 'ring photo booth' },
  { type: 'vase', name: 'Glass vase centrepiece', category: 'Florals', color: '#ffffff', ring: 0.3, real: true },

  // Seating
  { type: 'sofa', name: 'Glam velvet sofa', category: 'Seating', color: '#f2d6d8', ring: 1.3, real: true },
  { type: 'royalChair', name: 'Royal damask chair', category: 'Seating', color: '#ffffff', ring: 0.55, real: true },
  { type: 'loungeChair', name: 'Velvet lounge chair', category: 'Seating', color: '#ffffff', ring: 0.55, real: true },
  { type: 'chair', name: 'Chiavari chair', category: 'Seating', color: '#d4af6a', ring: 0.45 },
  { type: 'jhoola', name: 'Marigold jhoola swing', category: 'Seating', color: '#8a5a2e', ring: 1.3, tags: 'haldi mehendi swing' },

  // Trending props
  { type: 'neonSign', name: 'Neon sign on greenery', category: 'Trending props', color: '#ff7eb6', ring: 1.2, text: 'Forever begins', tags: 'text name photo booth' },
  { type: 'welcomeBoard', name: 'Welcome board', category: 'Trending props', color: '#fbf6ee', ring: 0.5, text: 'Welcome to the wedding of\nRavi & Sita', tags: 'text easel sign' },
  { type: 'urli', name: 'Brass urli with floating flowers', category: 'Trending props', color: '#c08a3e', ring: 0.5, tags: 'water candles entrance' },
  { type: 'chhatris', name: 'Decorative umbrellas', category: 'Trending props', color: '#f7c33d', ring: 0.9, tags: 'chhatri haldi mehendi' },

  // Lighting
  { type: 'chandelier', name: 'Crystal chandelier', category: 'Lighting', color: '#d4af6a', ring: 0.7, tags: 'hanging' },
  { type: 'lanterns', name: 'Moroccan floor lanterns', category: 'Lighting', color: '#c9a35e', ring: 0.55 },
  { type: 'kuthuVilakku', name: 'Kuthu vilakku (brass lamp)', category: 'Lighting', color: '#c99a45', ring: 0.3, tags: 'diya deepam traditional' },
  { type: 'hurricane', name: 'Glass hurricane candles', category: 'Lighting', color: '#ffffff', ring: 0.5, real: true },
  { type: 'candleStand', name: 'Gold candle trio', category: 'Lighting', color: '#d4af6a', ring: 0.45 },

  // Structure & tables
  { type: 'pillar', name: 'Classic pillar', category: 'Structure', color: '#f4ede3', ring: 0.5 },
  { type: 'guestTable', name: 'Round guest table', category: 'Tables', color: '#f8f2e8', ring: 1.6 },
]

// Items that come from photos (not shown as library buttons).
const PHOTO_TYPES = {
  photo: { name: 'Photo cut-out', ring: 0.6 },
  photoBackdrop: { name: 'Photo backdrop', ring: 3.2 },
  aiModel: { name: 'AI 3D model', ring: 0.7 },
}

export const CATEGORIES = [...new Set(LIBRARY.map((item) => item.category))]

export function findLibraryItem(type) {
  return LIBRARY.find((item) => item.type === type) ?? PHOTO_TYPES[type]
}
