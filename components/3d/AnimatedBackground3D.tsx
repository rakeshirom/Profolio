'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    let animationId: number
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.003
        meshRef.current.rotation.y += 0.005
        meshRef.current.position.y = Math.sin(Date.now() * 0.0003) * 2
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhongMaterial color="#00D9FF" wireframe emissive="#00D9FF" emissiveIntensity={0.3} />
    </mesh>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    let animationId: number
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.002
        meshRef.current.rotation.z += 0.003
        meshRef.current.position.x = Math.sin(Date.now() * 0.0002) * 3
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <mesh ref={meshRef} position={[-3, 1, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshPhongMaterial color="#9D4EDD" wireframe emissive="#9D4EDD" emissiveIntensity={0.2} />
    </mesh>
  )
}

function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    let animationId: number
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001
        meshRef.current.rotation.y += 0.002
        meshRef.current.position.z = Math.sin(Date.now() * 0.0003) * 2
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <mesh ref={meshRef} position={[0, -1, -2]}>
      <torusGeometry args={[2, 0.8, 16, 32]} />
      <meshPhongMaterial color="#ff006e" wireframe emissive="#ff006e" emissiveIntensity={0.2} />
    </mesh>
  )
}

function AnimatedParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (!pointsRef.current) return

    const geometry = new THREE.BufferGeometry()
    const count = 100
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    let animationId: number
    const animate = () => {
      if (pointsRef.current && pointsRef.current.rotation) {
        pointsRef.current.rotation.x += 0.0001
        pointsRef.current.rotation.y += 0.0002
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#00D9FF" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

function BackgroundScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />

      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00D9FF" />
      <pointLight position={[-10, -10, 10]} intensity={0.6} color="#9D4EDD" />
      <pointLight position={[0, 0, -10]} intensity={0.4} color="#ff006e" />

      <fog attach="fog" args={['#0a0e27', 15, 50]} />

      <FloatingCube />
      <FloatingSphere />
      <RotatingTorus />
      <AnimatedParticles />
    </>
  )
}

export function AnimatedBackground3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={<div className="w-full h-full bg-background" />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'radial-gradient(125% 125% at 50% 10%, rgba(0, 217, 255, 0.1) 40%, rgba(157, 78, 221, 0.3) 100%)' }}
        >
          <BackgroundScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
