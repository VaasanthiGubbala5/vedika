import { useMemo, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { STAGE } from '../data/stage.js'
import { GoldMaterial } from '../models/common.jsx'

// The fixed parts of the venue: floor, stage platform, drapes,
// fairy lights and the aisle runner. Decor items are placed on top.
export default function Stage({ palette, evening }) {
  const z = STAGE.front - STAGE.depth / 2

  // Folded fabric: a flat plane pushed in and out like a curtain.
  const drapeGeometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(10, 4.8, 140, 1)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin((p.getX(i) / 10) * Math.PI * 26) * 0.12)
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group>
      {/* polished floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={evening ? '#2a2228' : '#b9ada6'} roughness={0.55} metalness={0.05} envMapIntensity={0.35} />
      </mesh>

      {/* stage platform, front step and gold edge */}
      <mesh position={[0, STAGE.height / 2, z]} castShadow receiveShadow>
        <boxGeometry args={[STAGE.width, STAGE.height, STAGE.depth]} />
        <meshStandardMaterial color="#f1e9df" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.15, STAGE.front + 0.3]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.3, 0.6]} />
        <meshStandardMaterial color="#f1e9df" roughness={0.55} />
      </mesh>
      <mesh position={[0, STAGE.height, STAGE.front]}>
        <boxGeometry args={[STAGE.width + 0.04, 0.05, 0.05]} />
        <GoldMaterial />
      </mesh>

      {/* aisle runner */}
      <mesh position={[0, 0.01, 5.6]} receiveShadow>
        <boxGeometry args={[2.2, 0.02, 10]} />
        <meshStandardMaterial color={palette.runner} roughness={0.95} />
      </mesh>

      {/* drapes behind everything */}
      <mesh geometry={drapeGeometry} position={[0, 3, -STAGE.depth + 0.05]} receiveShadow>
        <meshPhysicalMaterial
          color={palette.drape}
          roughness={0.75}
          sheen={1}
          sheenColor="#ffe8e0"
          side={THREE.DoubleSide}
        />
      </mesh>

      <FairyLights evening={evening} />
    </group>
  )
}

// 22 hanging strands of tiny warm bulbs in front of the drapes.
function FairyLights({ evening }) {
  const ref = useRef()
  const STRANDS = 22
  const BULBS = 30

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D()
    let i = 0
    for (let s = 0; s < STRANDS; s++) {
      const x = -4.6 + s * 0.44
      for (let k = 0; k < BULBS; k++) {
        dummy.position.set(x + Math.sin(k * 0.7 + s) * 0.03, 0.75 + k * 0.14, -STAGE.depth + 0.18)
        dummy.updateMatrix()
        ref.current.setMatrixAt(i++, dummy.matrix)
      }
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, STRANDS * BULBS]}>
      <sphereGeometry args={[0.022, 8, 6]} />
      <meshBasicMaterial color={evening ? '#ffcf86' : '#fff2dc'} toneMapped={false} />
    </instancedMesh>
  )
}
