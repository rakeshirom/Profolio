'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  tunnelVertexShader,
  tunnelFragmentShader,
  motesVertexShader,
  motesFragmentShader,
  bloomPrefilterShader,
  bloomBlurShader,
  compositeShader,
} from './tunnelShaders'

export function TunnelBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x0a0e27, 1)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    // Tunnel geometry
    const geometry = new THREE.CylinderGeometry(2, 2, 100, 32, 100, true)
    const material = new THREE.ShaderMaterial({
      vertexShader: tunnelVertexShader,
      fragmentShader: tunnelFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
      },
      side: THREE.BackSide,
      transparent: true,
    })

    const tunnel = new THREE.Mesh(geometry, material)
    scene.add(tunnel)

    // Motes (floating particles)
    const motesGeometry = new THREE.BufferGeometry()
    const motesCount = 300
    const positions = new Float32Array(motesCount * 3)
    const colors = new Float32Array(motesCount * 3)

    for (let i = 0; i < motesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = Math.random() * 100

      const hue = Math.random()
      const color = new THREE.Color()
      if (hue < 0.4) {
        color.setHSL(0.5, 1, 0.5) // Cyan
      } else if (hue < 0.7) {
        color.setHSL(0.7, 1, 0.4) // Purple
      } else {
        color.setHSL(0.9, 1, 0.5) // Pink
      }
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    motesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    motesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const motesMaterial = new THREE.ShaderMaterial({
      vertexShader: motesVertexShader,
      fragmentShader: motesFragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    })

    const motes = new THREE.Points(motesGeometry, motesMaterial)
    scene.add(motes)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00d9ff, 1)
    pointLight1.position.set(5, 5, 0)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x9d4edd, 0.8)
    pointLight2.position.set(-5, -5, 0)
    scene.add(pointLight2)

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // Scroll tracking
    let scrollProgress = 0
    const onScroll = () => {
      scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', onScroll)

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onWindowResize)

    // Animation loop
    let frameId: number
    let time = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)

      time += 0.016

      // Update uniforms
      material.uniforms.uTime.value = time
      material.uniforms.uScroll.value = scrollProgress
      material.uniforms.uMouse.value.set(mouseX, mouseY)

      motesMaterial.uniforms.uTime.value = time

      // Camera follows mouse with smooth easing
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Tunnel moves forward based on scroll
      tunnel.position.z = scrollProgress * 50

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onWindowResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      motesGeometry.dispose()
      motesMaterial.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}
