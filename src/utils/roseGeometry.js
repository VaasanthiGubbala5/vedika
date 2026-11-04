import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

// Builds ONE rose shape out of curved petals, made once and reused for
// every flower in the scene. About 15 cm across.

function makePetal(width, height, cup, curl) {
  const g = new THREE.PlaneGeometry(width, height, 4, 4)
  g.translate(0, height / 2, 0) // petal grows up from its base
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i)
    const y = p.getY(i)
    const t = y / height // 0 at the base, 1 at the tip
    const across = x / (width / 2) // -1 to 1 across the petal
    // round the outline: narrow at the base, widest near the middle
    p.setX(i, x * (0.35 + 0.65 * Math.sin(Math.min(t, 0.98) * Math.PI * 0.85 + 0.15)))
    // cup the petal and curl its tip outwards
    p.setZ(i, cup * (1 - across * across) + curl * t * t)
  }
  g.computeVertexNormals()
  return g
}

export function makeRoseGeometry() {
  const parts = []

  // tight bud in the middle
  const bud = new THREE.SphereGeometry(0.022, 10, 8)
  bud.scale(1, 1.4, 1)
  bud.translate(0, 0.03, 0)
  parts.push(bud)

  // three rings of petals, opening wider towards the outside
  const layers = [
    { count: 4, r: 0.008, tilt: 0.25, w: 0.045, h: 0.05, cup: 0.012, curl: 0.004 },
    { count: 5, r: 0.016, tilt: 0.6, w: 0.06, h: 0.058, cup: 0.014, curl: 0.012 },
    { count: 6, r: 0.026, tilt: 1.0, w: 0.075, h: 0.062, cup: 0.014, curl: 0.02 },
  ]
  layers.forEach((L, li) => {
    for (let i = 0; i < L.count; i++) {
      const petal = makePetal(L.w, L.h, L.cup, L.curl)
      petal.rotateX(L.tilt)
      petal.translate(0, 0, L.r)
      petal.rotateY((i / L.count) * Math.PI * 2 + li * 0.6)
      parts.push(petal)
    }
  })

  return mergeGeometries(parts.map((g) => g.toNonIndexed()))
}
