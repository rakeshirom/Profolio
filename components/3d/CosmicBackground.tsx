'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'

// Particle system component
function SwirlingParticles() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Create swirling particles
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = Math.random() * 80 + 20

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius
      positions[i * 3 + 1] = Math.cos(phi) * radius
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius

      // Dark blue (#001a4d) and orange (#ff6b35) color mixing
      if (Math.random() > 0.5) {
        colors[i * 3] = 0.0 // R - dark blue
        colors[i * 3 + 1] = 0.1 // G
        colors[i * 3 + 2] = 0.8 // B
      } else {
        colors[i * 3] = 1.0 // R - orange
        colors[i * 3 + 1] = 0.42 // G
        colors[i * 3 + 2] = 0.21 // B
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    })

    const points = new THREE.Points(geometry, material)
    if (groupRef.current) {
      groupRef.current.add(points)
      particlesRef.current = points
    }

    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useFrame(() => {
    if (groupRef.current && particlesRef.current) {
      // Swirl animation
      groupRef.current.rotation.y += 0.0003
      groupRef.current.rotation.x += 0.00015

      // Mouse interaction - gentle movement
      groupRef.current.rotation.x += mouseRef.current.y * 0.0001
      groupRef.current.rotation.y += mouseRef.current.x * 0.0001
    }
  })

  return <group ref={groupRef}>{particlesRef.current ? null : null}</group>
}

// Geometric shapes with light beams
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0002
      groupRef.current.rotation.y += 0.0004
      groupRef.current.rotation.z += 0.0001
    }
  })

  useEffect(() => {
    if (!groupRef.current) return

    // Create rotating cube
    const cubeGeom = new THREE.BoxGeometry(20, 20, 20)
    const cubeMat = new THREE.MeshPhongMaterial({
      color: 0x004e89,
      emissive: 0x0066cc,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const cube = new THREE.Mesh(cubeGeom, cubeMat)
    cube.position.set(-40, 0, 0)
    groupRef.current.add(cube)

    // Create rotating octahedron
    const octaGeom = new THREE.OctahedronGeometry(15)
    const octaMat = new THREE.MeshPhongMaterial({
      color: 0xff6b35,
      emissive: 0xff8855,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const octahedron = new THREE.Mesh(octaGeom, octaMat)
    octahedron.position.set(40, 0, 0)
    groupRef.current.add(octahedron)

    // Create tetrahedron
    const tetaGeom = new THREE.TetrahedronGeometry(15)
    const tetaMat = new THREE.MeshPhongMaterial({
      color: 0x004e89,
      emissive: 0x0066cc,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const tetrahedron = new THREE.Mesh(tetaGeom, tetaMat)
    tetrahedron.position.set(0, 40, 0)
    groupRef.current.add(tetrahedron)

    return () => {
      cubeGeom.dispose()
      cubeMat.dispose()
      octaGeom.dispose()
      octaMat.dispose()
      tetaGeom.dispose()
      tetaMat.dispose()
    }
  }, [])

  return <group ref={groupRef} />
}

// Flowing waves simulation
function FlowingWaves() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!meshRef.current) return

    const geometry = new THREE.PlaneGeometry(200, 200, 100, 100)
    const material = new THREE.MeshPhongMaterial({
      color: 0x001a4d,
      emissive: 0x003d82,
      wireframe: false,
      transparent: true,
      opacity: 0.2,
    })

    meshRef.current.geometry.dispose()
    meshRef.current.material.dispose()
    meshRef.current.geometry = geometry
    meshRef.current.material = material

    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    const originalPositions = meshRef.current.userData.original

    if (!originalPositions) {
      meshRef.current.userData.original = new Float32Array(positions)
      return
    }

    // Wave animation
    const time = state.clock.elapsedTime
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i]
      const y = originalPositions[i + 1]
      const z = originalPositions[i + 2]

      positions[i] = x + Math.sin(x * 0.01 + time * 0.5) * 2
      positions[i + 1] = y + Math.cos(y * 0.01 + time * 0.5) * 2
      positions[i + 2] = z + Math.sin((x + y) * 0.01 + time * 0.5) * 3
    }

    geometry.attributes.position.needsUpdate = true

    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.3
    meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.3

    // Mouse influence
    meshRef.current.rotation.x += mouseRef.current.y * 0.1
    meshRef.current.rotation.y += mouseRef.current.x * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -50]}>
      <planeGeometry args={[200, 200, 100, 100]} />
      <meshPhongMaterial color={0x001a4d} emissive={0x003d82} transparent opacity={0.2} />
    </mesh>
  )
}

// Light beams
function LightBeams() {
  useEffect(() => {
    // Light beams are created through the lighting setup
  }, [])

  return (
    <>
      <pointLight position={[50, 50, 50]} intensity={1} color={0x0066cc} />
      <pointLight position={[-50, -50, -50]} intensity={0.8} color={0xff6b35} />
      <ambientLight intensity={0.4} color={0x001a4d} />
    </>
  )
}

// Main scene
function CosmicScene() {
  const { camera } = useThree()
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    // Scroll-based camera movement
    camera.position.z = 100 + scrollRef.current * 50
  })

  return (
    <>
      <color attach="background" args={[0x000000]} />
      <fog attach="fog" args={[0x000000, 100, 400]} />
      <SwirlingParticles />
      <GeometricShapes />
      <FlowingWaves />
      <LightBeams />
    </>
  )
}

export function CosmicBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CosmicScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
