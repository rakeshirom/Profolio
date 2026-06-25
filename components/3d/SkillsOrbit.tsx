'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Text } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

const skills = [
  { name: 'AI/ML', color: '#00D9FF', angle: 0 },
  { name: 'Python', color: '#9D4EDD', angle: Math.PI / 3 },
  { name: 'React', color: '#ff006e', angle: (Math.PI * 2) / 3 },
  { name: 'Node.js', color: '#00D9FF', angle: Math.PI },
  { name: 'Cloud', color: '#9D4EDD', angle: (Math.PI * 4) / 3 },
  { name: 'Web Dev', color: '#ff006e', angle: (Math.PI * 5) / 3 },
]

function SkillSphere({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let animationId: number
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.003
        meshRef.current.rotation.y += 0.005
        meshRef.current.scale.lerp(new THREE.Vector3(hovered ? 1.3 : 1, hovered ? 1.3 : 1, hovered ? 1.3 : 1), 0.1)
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [hovered])

  const orbitRadius = 4
  const x = Math.cos(skill.angle) * orbitRadius
  const z = Math.sin(skill.angle) * orbitRadius

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => console.log(`Selected: ${skill.name}`)}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhongMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          wireframe={false}
        />
      </mesh>
      <Text position={[0, -1.2, 0]} fontSize={0.4} color={skill.color} anchorX="center">
        {skill.name}
      </Text>
    </group>
  )
}

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    let animationId: number
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.002
        meshRef.current.rotation.y += 0.003
        meshRef.current.rotation.z += 0.001
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[0.8, 2]} />
      <meshPhongMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  )
}

function OrbitLines() {
  useEffect(() => {
    // This component just creates the visual orbit lines
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={64}
          array={new Float32Array(
            Array.from({ length: 64 }, (_, i) => {
              const angle = (i / 64) * Math.PI * 2
              return [Math.cos(angle) * 4, 0, Math.sin(angle) * 4]
            }).flat()
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00D9FF" transparent opacity={0.2} />
    </lineSegments>
  )
}

function SkillsOrbitScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 6, 8]} fov={60} />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} enablePan={false} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#9D4EDD" />

      <fog attach="fog" args={['#0a0e27', 10, 40]} />

      <CentralCore />
      <OrbitLines />
      {skills.map((skill, index) => (
        <SkillSphere key={skill.name} skill={skill} index={index} />
      ))}
    </>
  )
}

export function SkillsOrbit() {
  return (
    <div className="w-full h-96">
      <Canvas camera={{ position: [0, 6, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <SkillsOrbitScene />
      </Canvas>
    </div>
  )
}
