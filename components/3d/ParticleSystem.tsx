'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleSystem() {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return

    const particleCount = 500
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40
      positions[i + 1] = (Math.random() - 0.5) * 40
      positions[i + 2] = (Math.random() - 0.5) * 40

      velocities[i] = (Math.random() - 0.5) * 0.01
      velocities[i + 1] = (Math.random() - 0.5) * 0.01
      velocities[i + 2] = (Math.random() - 0.5) * 0.01
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0x9d4edd,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(geometry, material)
    groupRef.current.add(particles)

    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    const particles = groupRef.current.children[0] as THREE.Points
    if (!particles) return

    const positions = particles.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.05
      positions[i + 1] += (Math.random() - 0.5) * 0.05
      positions[i + 2] += (Math.random() - 0.5) * 0.05

      // Wrap around
      if (positions[i] > 20) positions[i] = -20
      if (positions[i] < -20) positions[i] = 20
      if (positions[i + 1] > 20) positions[i + 1] = -20
      if (positions[i + 1] < -20) positions[i + 1] = 20
      if (positions[i + 2] > 20) positions[i + 2] = -20
      if (positions[i + 2] < -20) positions[i + 2] = 20
    }

    particles.geometry.attributes.position.needsUpdate = true

    groupRef.current.rotation.x += 0.0001
    groupRef.current.rotation.y += 0.0001
  })

  return <group ref={groupRef} />
}
