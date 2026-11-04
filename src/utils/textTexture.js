import * as THREE from 'three'

// Draws text onto a picture (canvas) so it can be shown on a 3D surface.
// Used for the neon sign and the welcome board.
export function makeTextTexture({ text, font, color, glow = 0, width = 1024, height = 512, background = null, lineHeight = 1.15 }) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (background) {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
  }
  const lines = String(text || '').split('\n')
  // start big, then shrink until the longest line fits
  let size = Math.floor(height / (lines.length * lineHeight + 0.4))
  ctx.font = font(size)
  while (size > 12 && Math.max(...lines.map((l) => ctx.measureText(l).width)) > width * 0.88) {
    size -= 4
    ctx.font = font(size)
  }
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  if (glow) {
    ctx.shadowColor = color
    ctx.shadowBlur = glow
  }
  const total = lines.length * size * lineHeight
  lines.forEach((line, i) => {
    const y = height / 2 - total / 2 + size * lineHeight * (i + 0.5)
    ctx.fillText(line, width / 2, y)
    if (glow) ctx.fillText(line, width / 2, y) // draw twice for a stronger glow
  })
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}
