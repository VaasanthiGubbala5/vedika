import * as THREE from 'three'
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { seededRandom } from './random.js'

// Flower and plant SHAPES. Each one is built once and reused for every
// flower of that kind in the scene (that is what keeps phones fast).
// Sizes are real: a rose is about 15 cm across, a marigold about 8 cm.

// ---------- Rose: three rings of curved petals around a bud ----------
function makePetal(width, height, cup, curl) {
  const g = new THREE.PlaneGeometry(width, height, 4, 4)
  g.translate(0, height / 2, 0)
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i)
    const t = p.getY(i) / height
    const across = x / (width / 2)
    p.setX(i, x * (0.35 + 0.65 * Math.sin(Math.min(t, 0.98) * Math.PI * 0.85 + 0.15)))
    p.setZ(i, cup * (1 - across * across) + curl * t * t)
  }
  g.computeVertexNormals()
  return g
}

export function makeRoseGeometry() {
  const parts = []
  const bud = new THREE.SphereGeometry(0.022, 10, 8)
  bud.scale(1, 1.4, 1)
  bud.translate(0, 0.03, 0)
  parts.push(bud)
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

// ---------- Marigold: a ruffled pom-pom ----------
export function makeMarigoldGeometry() {
  const r = seededRandom(11)
  let g = new THREE.IcosahedronGeometry(0.045, 3)
  g.deleteAttribute('normal')
  g.deleteAttribute('uv')
  g = mergeVertices(g)
  const p = g.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i)
    v.multiplyScalar(1 + r() * 0.28) // ruffles
    v.y *= 0.8 // a little flatter than a ball
    p.setXYZ(i, v.x, v.y, v.z)
  }
  g.computeVertexNormals()
  return g
}

// ---------- Hydrangea: a dome of tiny four-petal florets ----------
export function makeHydrangeaGeometry() {
  const r = seededRandom(5)
  const parts = []
  const up = new THREE.Vector3(0, 1, 0)
  for (let i = 0; i < 26; i++) {
    const dir = new THREE.Vector3(r() - 0.5, r() * 0.9 + 0.1, r() - 0.5).normalize()
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir)
    for (let k = 0; k < 4; k++) {
      const petal = new THREE.PlaneGeometry(0.014, 0.014)
      petal.rotateX(-Math.PI / 2 + 0.25)
      petal.translate(0, 0, 0.008)
      petal.rotateY((k / 4) * Math.PI * 2 + i)
      petal.applyQuaternion(q)
      petal.translate(dir.x * 0.075, dir.y * 0.065, dir.z * 0.075)
      parts.push(petal)
    }
  }
  return mergeGeometries(parts)
}

// ---------- Jasmine (mogra) bud ----------
export function makeJasmineGeometry() {
  const g = new THREE.SphereGeometry(0.011, 8, 6)
  g.scale(1, 1.7, 1)
  return g
}

// ---------- Baby's breath: tiny filler dots ----------
export function makeBabyBreathGeometry() {
  return new THREE.SphereGeometry(0.009, 6, 4)
}

// ---------- Pampas grass plume: a soft feathery spindle ----------
export function makePampasGeometry() {
  const r = seededRandom(9)
  const profile = []
  for (let i = 0; i <= 12; i++) {
    const t = i / 12
    profile.push(new THREE.Vector2(0.065 * Math.sin(Math.PI * Math.pow(t, 0.8)) + 0.002, t * 0.7))
  }
  let g = new THREE.LatheGeometry(profile, 14)
  g.deleteAttribute('normal')
  g.deleteAttribute('uv')
  g = mergeVertices(g)
  const p = g.attributes.position
  for (let i = 0; i < p.count; i++) {
    p.setX(i, p.getX(i) * (0.8 + r() * 0.5))
    p.setZ(i, p.getZ(i) * (0.8 + r() * 0.5))
  }
  g.computeVertexNormals()
  return g
}

// ---------- Leaf ----------
export function makeLeafGeometry() {
  const g = new THREE.SphereGeometry(0.06, 8, 6)
  g.scale(1.7, 0.25, 0.8)
  return g
}
