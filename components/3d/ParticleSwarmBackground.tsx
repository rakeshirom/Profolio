'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  scale: number
}

function ParticleSwarmScene() {
  const pointsRef = useRef<THREE.Points>(null)
  const particlesRef = useRef<Particle[]>([])
  const scrollProgressRef = useRef(0)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
  const materialRef = useRef<THREE.PointsMaterial | null>(null)
  const { camera } = useThree()

  useEffect(() => {
    const particleCount = 8000
    const particles: Particle[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      // Create spiral galaxy pattern
      const radius = Math.random() * 100 + 10
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
        color: Math.random() > 0.5 
          ? new THREE.Color(0xff6b35) // Orange
          : new THREE.Color(0x004e89), // Blue
        scale: Math.random() * 0.8 + 0.4,
      })
    }

    particlesRef.current = particles

    // Create BufferGeometry
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    particles.forEach((p, i) => {
      positions[i * 3] = p.position.x
      positions[i * 3 + 1] = p.position.y
      positions[i * 3 + 2] = p.position.z

      colors[i * 3] = p.color.r
      colors[i * 3 + 1] = p.color.g
      colors[i * 3 + 2] = p.color.b

      scales[i] = p.scale
    })

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      map: new THREE.CanvasTexture(createParticleTexture()),
    })

    geometryRef.current = geometry
    materialRef.current = material

    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [])

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      scrollProgressRef.current = Math.min(scrollProgress, 1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mouse movement for cursor steering
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.position.x += (x * 10 - camera.position.x) * 0.05
        camera.position.y += (y * 10 - camera.position.y) * 0.05
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [camera])

  useFrame(() => {
    if (!geometryRef.current || !particlesRef.current) return

    const positions = geometryRef.current.attributes.position.array as Float32Array
    const scrollProgress = scrollProgressRef.current

    particlesRef.current.forEach((particle, i) => {
      // Apply spiral transformation based on scroll
      const spiralAngle = scrollProgress * Math.PI * 4

      // Start from center point
      const targetPos = particle.position.clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), spiralAngle)
        .multiplyScalar(1 + scrollProgress)

      // Lerp between start and target
      particle.position.lerp(targetPos, 0.05)

      // Update velocity with slight turbulence
      particle.velocity.add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      )

      particle.velocity.multiplyScalar(0.98)

      // Apply damping and keep in bounds
      if (particle.position.length() > 300) {
        particle.position.normalize().multiplyScalar(300)
        particle.velocity.multiplyScalar(-0.5)
      }

      // Update positions
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
    })

    geometryRef.current.attributes.position.needsUpdate = true
  })

  return geometryRef.current && materialRef.current ? (
    <points ref={pointsRef} geometry={geometryRef.current} material={materialRef.current} />
  ) : null
}

function createParticleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64

  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Create radial gradient for soft particle
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  return canvas
}

export function ParticleSwarmBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 150],
          fov: 75,
          near: 0.1,
          far: 2000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[100, 100, 100]} intensity={1} color="#ffffff" />
        <pointLight position={[-100, -100, -100]} intensity={0.5} color="#ff6b35" />
        <pointLight position={[100, -100, 100]} intensity={0.5} color="#004e89" />

        <ParticleSwarmScene />
      </Canvas>
    </div>
  )
}
