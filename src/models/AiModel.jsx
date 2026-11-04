import { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { loadModelFile } from '../utils/modelStore.js'

// A 3D model made by the AI from a photo.
// It is resized so its tallest side is 1.2 m and set to stand on the floor;
// use the Size slider to make it the real size.
const TARGET = 1.2

function Loaded({ url }) {
  const { scene } = useGLTF(url)
  const object = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    const box = new THREE.Box3().setFromObject(c)
    const size = box.getSize(new THREE.Vector3())
    const k = TARGET / Math.max(size.x, size.y, size.z, 0.001)
    const centre = box.getCenter(new THREE.Vector3())
    const holder = new THREE.Group()
    c.position.set(-centre.x, -box.min.y, -centre.z)
    holder.add(c)
    holder.scale.setScalar(k)
    return holder
  }, [scene])
  return <primitive object={object} />
}

export default function AiModel({ modelKey }) {
  const [url, setUrl] = useState(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    let objectUrl
    loadModelFile(modelKey).then((blob) => {
      if (!blob) return setMissing(true)
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    })
    return () => objectUrl && URL.revokeObjectURL(objectUrl)
  }, [modelKey])

  if (missing) {
    // the file was made on another device or browser
    return (
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#888" wireframe />
      </mesh>
    )
  }
  if (!url) return null
  return (
    <Suspense fallback={null}>
      <Loaded url={url} />
    </Suspense>
  )
}
