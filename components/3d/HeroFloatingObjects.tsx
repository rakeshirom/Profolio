'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function HeroFloatingObjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const objectsRef = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00d9ff, 1)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x9d4edd, 0.8)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Create floating objects
    const objects: THREE.Mesh[] = []

    // Floating cubes
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
      const material = new THREE.MeshPhongMaterial({
        color: i === 0 ? 0x00d9ff : i === 1 ? 0x9d4edd : 0xff006e,
        emissive: i === 0 ? 0x00d9ff : i === 1 ? 0x9d4edd : 0xff006e,
        emissiveIntensity: 0.3,
      })
      const cube = new THREE.Mesh(geometry, material)
      cube.position.x = -2 + i * 2
      cube.position.y = Math.random() * 2 - 1
      cube.position.z = -2
      scene.add(cube)
      objects.push(cube)
    }

    // Floating spheres
    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: i === 0 ? 0x00d9ff : 0xff006e,
        emissive: i === 0 ? 0x00d9ff : 0xff006e,
        emissiveIntensity: 0.4,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.x = -1.5 + i * 3
      sphere.position.y = Math.random() * 3
      sphere.position.z = -1
      scene.add(sphere)
      objects.push(sphere)
    }

    objectsRef.current = objects

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      objects.forEach((obj, index) => {
        obj.rotation.x += 0.003
        obj.rotation.y += 0.005
        obj.position.y += Math.sin(Date.now() * 0.0003 + index) * 0.001
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
