'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave based on time and position
    float wave = sin(pos.x * 2.0 + uTime * 0.5) * 0.3;
    wave += sin(pos.y * 2.0 + uTime * 0.3) * 0.3;
    
    // Mouse influence
    float dist = distance(uv, uMouse);
    wave += sin(dist * 10.0 - uTime * 2.0) * (1.0 - dist) * 0.5;
    
    pos.z = wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec3 color = vec3(0.0, 217.0 / 255.0, 1.0);
    
    // Add some glow
    float glow = sin(uTime + vUv.x * 5.0) * 0.5 + 0.5;
    color += vec3(157.0 / 255.0, 78.0 / 255.0, 221.0 / 255.0) * glow * 0.3;
    
    gl_FragColor = vec4(color, 0.3);
  }
`

export function WaveSurface() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  const timeRef = useRef(0)
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  })

  useEffect(() => {
    if (!meshRef.current) return

    const geometry = new THREE.PlaneGeometry(20, 20, 64, 64)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      wireframe: false,
    })

    meshRef.current.geometry = geometry
    meshRef.current.material = material

    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return

    timeRef.current += 0.016
    uniformsRef.current.uTime.value = timeRef.current
    uniformsRef.current.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5)

    meshRef.current.rotation.x = -Math.PI / 3
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, -5, 0]}
      scale={[1, 1, 1]}
    >
      <planeGeometry args={[20, 20, 64, 64]} />
      <meshBasicMaterial color={0x00d9ff} transparent opacity={0.2} />
    </mesh>
  )
}
