'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Node {
  position: THREE.Vector3
  velocity: THREE.Vector3
}

export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<Node[]>([])
  const linesRef = useRef<THREE.LineSegments | null>(null)

  useEffect(() => {
    if (!groupRef.current) return

    const nodeCount = 40
    const nodes: Node[] = []

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      })
    }

    nodesRef.current = nodes

    // Create node spheres
    const geometry = new THREE.SphereGeometry(0.3, 8, 8)
    const material = new THREE.MeshBasicMaterial({ color: 0x00d9ff })

    nodes.forEach(node => {
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.copy(node.position)
      groupRef.current?.add(sphere)
    })

    // Create connections lines
    const lineGeometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const connectionDistance = 8

    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i < j) {
          const distance = node.position.distanceTo(otherNode.position)
          if (distance < connectionDistance) {
            positions.push(
              node.position.x,
              node.position.y,
              node.position.z,
              otherNode.position.x,
              otherNode.position.y,
              otherNode.position.z
            )
          }
        }
      })
    })

    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    )

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.3,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    groupRef.current?.add(lines)
    linesRef.current = lines

    return () => {
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    const meshes = groupRef.current.children.filter(c => c instanceof THREE.Mesh)
    const nodes = nodesRef.current

    nodes.forEach((node, i) => {
      // Update position
      node.position.add(node.velocity)

      // Bounce off boundaries
      const boundary = 10
      if (node.position.x > boundary || node.position.x < -boundary) {
        node.velocity.x *= -1
      }
      if (node.position.y > boundary || node.position.y < -boundary) {
        node.velocity.y *= -1
      }
      if (node.position.z > boundary || node.position.z < -boundary) {
        node.velocity.z *= -1
      }

      // Update mesh position
      if (meshes[i]) {
        meshes[i].position.copy(node.position)
        meshes[i].rotation.x += 0.01
        meshes[i].rotation.y += 0.01
      }
    })

    // Update lines
    if (linesRef.current) {
      const positions: number[] = []
      const connectionDistance = 8

      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i < j) {
            const distance = node.position.distanceTo(otherNode.position)
            if (distance < connectionDistance) {
              positions.push(
                node.position.x,
                node.position.y,
                node.position.z,
                otherNode.position.x,
                otherNode.position.y,
                otherNode.position.z
              )
            }
          }
        })
      })

      const geometry = linesRef.current.geometry as THREE.BufferGeometry
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      )
    }

    // Rotate entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0001
      groupRef.current.rotation.y += 0.0002
    }
  })

  return <group ref={groupRef} />
}
