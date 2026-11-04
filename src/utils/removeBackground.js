// Turns an uploaded photo into a cut-out with a transparent background.
// It works for photos with a PLAIN background (white wall, studio photo):
// starting from the edges, it clears every pixel close to the edge colour.
// Busy backgrounds need an AI tool, which we will add in a later phase.

const MAX_SIZE = 512 // keep images small so they save quickly

export function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => reject(new Error('Could not read that image. Try saving it as JPG or PNG first.'))
    img.src = url
  })
}

export function makeCutout(img) {
  const k = Math.min(1, MAX_SIZE / Math.max(img.width, img.height))
  const w = Math.round(img.width * k)
  const h = Math.round(img.height * k)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h)
  const image = ctx.getImageData(0, 0, w, h)
  const d = image.data

  // A PNG that already has transparency needs no work.
  let hasAlpha = false
  for (let i = 3; i < d.length; i += 16) if (d[i] < 250) { hasAlpha = true; break }

  if (!hasAlpha) {
    // 1. Average colour of the corners and edge midpoints = background colour
    const points = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1], [w >> 1, 0], [w >> 1, h - 1]]
    let r = 0, g = 0, b = 0
    for (const [x, y] of points) {
      const p = (y * w + x) * 4
      r += d[p]; g += d[p + 1]; b += d[p + 2]
    }
    r /= points.length; g /= points.length; b /= points.length

    // 2. Flood fill from every edge pixel through similar colours
    const tolerance = 48 * 48 * 3
    const seen = new Uint8Array(w * h)
    const stack = []
    for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x)
    for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1)
    while (stack.length) {
      const i = stack.pop()
      if (seen[i]) continue
      seen[i] = 1
      const p = i * 4
      const dr = d[p] - r, dg = d[p + 1] - g, db = d[p + 2] - b
      if (dr * dr + dg * dg + db * db > tolerance) continue
      d[p + 3] = 0
      const x = i % w, y = (i / w) | 0
      if (x > 0) stack.push(i - 1)
      if (x < w - 1) stack.push(i + 1)
      if (y > 0) stack.push(i - w)
      if (y < h - 1) stack.push(i + w)
    }
    ctx.putImageData(image, 0, 0)
  }

  return { src: canvas.toDataURL('image/png'), aspect: w / h }
}

// For backdrop photos: keep the whole picture (no cut-out), just make it a
// sensible size and save it as JPG so it takes little storage.
export function makeBackdropImage(img) {
  const MAX = 1600
  const k = Math.min(1, MAX / Math.max(img.width, img.height))
  const w = Math.round(img.width * k)
  const h = Math.round(img.height * k)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d').drawImage(img, 0, 0, w, h)
  return { src: canvas.toDataURL('image/jpeg', 0.85), aspect: w / h }
}
