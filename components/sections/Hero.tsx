'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const roles = ['AI Engineer', 'Founder', 'Software Developer', 'Tech Entrepreneur', 'Future Builder']

export function Hero() {
  const router = useRouter()
  const roleIndexRef = useRef(0)
  const roleElementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      roleIndexRef.current = (roleIndexRef.current + 1) % roles.length
      if (roleElementRef.current) {
        gsap.to(roleElementRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            if (roleElementRef.current) {
              roleElementRef.current.textContent = roles[roleIndexRef.current]
              gsap.to(roleElementRef.current, {
                opacity: 1,
                duration: 0.3,
              })
            }
          },
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founder Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jun%201%2C%202026%20at%2008_59_06%20AM-1N5gO5CmMpaP6eBVpgtr6QjPrdAifv.png"
                alt="Rakesh Irom - Founder of Kanglei Artificial Intelligence"
                className="w-full max-w-md rounded-lg shadow-2xl border-2 border-cyan-400/50 glow-cyan"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-2 rounded-full font-semibold whitespace-nowrap">
                From Manipur, India
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Rakesh Irom
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Founder & CEO of Kanglei Artificial Intelligence
          </p>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-lg md:text-xl font-mono">
            <span className="text-cyan-400">&gt; </span>
            <span ref={roleElementRef} className="text-purple-400">
              {roles[0]}
            </span>
            <span className="text-cyan-400 animate-pulse">_</span>
          </div>
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => router.push('/founder')}
            className="glass-effect px-8 py-3 rounded-full font-semibold text-cyan-400 border border-cyan-400 hover:border-cyan-300 hover:text-cyan-300 transition-all duration-300 hover:shadow-lg hover:glow-cyan"
          >
            Explore Portfolio
          </button>
          <button 
            onClick={() => router.push('/projects')}
            className="glass-effect px-8 py-3 rounded-full font-semibold text-purple-400 border border-purple-400 hover:border-purple-300 hover:text-purple-300 transition-all duration-300 hover:shadow-lg hover:glow-purple"
          >
            View Projects
          </button>
          <button 
            onClick={() => window.location.href = 'mailto:support@rakeshirom.in'}
            className="glass-effect px-8 py-3 rounded-full font-semibold text-pink-400 border border-pink-400 hover:border-pink-300 hover:text-pink-300 transition-all duration-300 hover:shadow-lg hover:glow-pink"
          >
            Contact Me
          </button>
        </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-center justify-center"
          >
            <div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
