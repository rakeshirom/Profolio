'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'AI Models Built', value: 30, suffix: '+' },
  { label: 'Applications Developed', value: 100, suffix: '+' },
  { label: 'Active Users', value: 10000, suffix: '+' },
]

export function Statistics() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!inView) return

    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.value / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setCounts(prev => {
          const newCounts = [...prev]
          newCounts[index] = Math.floor(current)
          return newCounts
        })
      }, 20)
    })
  }, [inView])

  return (
    <section ref={ref} className="relative z-10 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              By The Numbers
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect p-8 rounded-lg border border-cyan-400/30 text-center hover:border-cyan-400/60 transition-all group hover:shadow-lg hover:glow-cyan"
            >
              {/* Animated counter */}
              <div className="text-5xl md:text-6xl font-bold mb-4">
                <span
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                >
                  {counts[index]}
                </span>
                <span className="text-cyan-400 text-4xl md:text-5xl">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-gray-400 text-lg">
                {stat.label}
              </p>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.1), transparent)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
