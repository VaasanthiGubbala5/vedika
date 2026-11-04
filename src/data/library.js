// The decor library. Each entry is one item a designer can add to the design.
// type   -> which 3D model to draw (see src/models/index.js)
// color  -> starting colour (for real models this tints the fabric)
// ring   -> radius of the gold selection ring under the item (metres)
// real   -> true when it is a real 3D model file, not built from shapes
export const LIBRARY = [
  { type: 'sofa', name: 'Glam velvet sofa', category: 'Seating', color: '#f2d6d8', ring: 1.3, real: true },
  { type: 'royalChair', name: 'Royal damask chair', category: 'Seating', color: '#ffffff', ring: 0.55, real: true },
  { type: 'loungeChair', name: 'Velvet lounge chair', category: 'Seating', color: '#ffffff', ring: 0.55, real: true },
  { type: 'chair', name: 'Chiavari chair', category: 'Seating', color: '#d4af6a', ring: 0.45 },
  { type: 'archBackdrop', name: 'Floral arch backdrop', category: 'Backdrops', color: '#f7efe6', ring: 2.8 },
  { type: 'pillar', name: 'Classic pillar', category: 'Structure', color: '#f4ede3', ring: 0.5 },
  { type: 'flowerStand', name: 'Rose ball stand', category: 'Florals', color: '#d4af6a', ring: 0.5 },
  { type: 'urn', name: 'Rose urn', category: 'Florals', color: '#c9a35e', ring: 0.55 },
  { type: 'vase', name: 'Glass vase centrepiece', category: 'Florals', color: '#ffffff', ring: 0.3, real: true },
  { type: 'hurricane', name: 'Glass hurricane candles', category: 'Lighting', color: '#ffffff', ring: 0.5, real: true },
  { type: 'candleStand', name: 'Gold candle trio', category: 'Lighting', color: '#d4af6a', ring: 0.45 },
  { type: 'guestTable', name: 'Round guest table', category: 'Tables', color: '#f8f2e8', ring: 1.6 },
]

// Items that come from photos (not shown as library buttons).
const PHOTO_TYPES = {
  photo: { name: 'Photo cut-out', ring: 0.6 },
  photoBackdrop: { name: 'Photo backdrop', ring: 3.2 },
}

export const CATEGORIES = [...new Set(LIBRARY.map((item) => item.category))]

export function findLibraryItem(type) {
  return LIBRARY.find((item) => item.type === type) ?? PHOTO_TYPES[type]
}
