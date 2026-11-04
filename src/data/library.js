// The decor library. Each entry is one item a designer can add to the design.
// type   -> which 3D model to draw (see src/models/index.js)
// color  -> the starting colour of the main material
// ring   -> radius of the gold selection ring under the item (metres)
export const LIBRARY = [
  { type: 'sofa', name: 'Velvet loveseat', category: 'Seating', color: '#6d1f3a', ring: 1.4 },
  { type: 'chair', name: 'Chiavari chair', category: 'Seating', color: '#d4af6a', ring: 0.45 },
  { type: 'archBackdrop', name: 'Floral arch backdrop', category: 'Backdrops', color: '#f7efe6', ring: 2.8 },
  { type: 'pillar', name: 'Classic pillar', category: 'Structure', color: '#f4ede3', ring: 0.5 },
  { type: 'flowerStand', name: 'Flower ball stand', category: 'Florals', color: '#d4af6a', ring: 0.5 },
  { type: 'urn', name: 'Floral urn', category: 'Florals', color: '#c9a35e', ring: 0.55 },
  { type: 'candleStand', name: 'Candle trio', category: 'Lighting', color: '#d4af6a', ring: 0.45 },
  { type: 'guestTable', name: 'Round guest table', category: 'Tables', color: '#f8f2e8', ring: 1.6 },
]

export const CATEGORIES = [...new Set(LIBRARY.map((item) => item.category))]

export function findLibraryItem(type) {
  return LIBRARY.find((item) => item.type === type)
}
