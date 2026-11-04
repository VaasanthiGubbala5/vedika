// Saves the design in the browser (localStorage) so it is still there
// after a refresh. Later we will move this to a real database (Supabase).
const KEY = 'vedika-design-v2' // v2: Stage 2 starter design with real models

export function loadDesign() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Returns true when saved, false when the browser refused (for example storage is full).
export function saveDesign(design) {
  try {
    localStorage.setItem(KEY, JSON.stringify(design))
    return true
  } catch {
    return false
  }
}

// The design every new user starts with.
export const STARTER_DESIGN = {
  palette: 'blush',
  light: 'evening',
  items: [
    { id: 'arch', type: 'archBackdrop', x: 0, z: -3.15, rotY: 0, scale: 1, color: '#f7efe6' },
    { id: 'sofa', type: 'sofa', x: 0, z: -2.0, rotY: 0, scale: 1.25, color: '#f2d6d8' },
    { id: 'hurr-l', type: 'hurricane', x: -1.7, z: -2.2, rotY: 0, scale: 1, color: '#ffffff' },
    { id: 'hurr-r', type: 'hurricane', x: 1.7, z: -2.2, rotY: 0, scale: 1, color: '#ffffff' },
    { id: 'urn-l', type: 'urn', x: -2.6, z: -2.4, rotY: 0, scale: 1, color: '#c9a35e' },
    { id: 'urn-r', type: 'urn', x: 2.6, z: -2.4, rotY: 0, scale: 1, color: '#c9a35e' },
    { id: 'pillar-l', type: 'pillar', x: -3.9, z: -2.6, rotY: 0, scale: 1, color: '#f4ede3' },
    { id: 'pillar-r', type: 'pillar', x: 3.9, z: -2.6, rotY: 0, scale: 1, color: '#f4ede3' },
    { id: 'candle-l', type: 'candleStand', x: -3.3, z: -0.4, rotY: 0, scale: 1, color: '#d4af6a' },
    { id: 'candle-r', type: 'candleStand', x: 3.3, z: -0.4, rotY: 0, scale: 1, color: '#d4af6a' },
    { id: 'stand-l', type: 'flowerStand', x: -2.4, z: 1.6, rotY: 0, scale: 1, color: '#d4af6a' },
    { id: 'stand-r', type: 'flowerStand', x: 2.4, z: 1.6, rotY: 0, scale: 1, color: '#d4af6a' },
    { id: 'table-l', type: 'guestTable', x: -4.2, z: 6, rotY: 0, scale: 1, color: '#f8f2e8' },
    { id: 'table-r', type: 'guestTable', x: 4.2, z: 6, rotY: 0.4, scale: 1, color: '#f8f2e8' },
  ],
}
