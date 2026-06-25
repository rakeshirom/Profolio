'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FlipCard3DProps {
  title: string
  description: string
  technologies: string[]
  color: string
  index: number
}

export function FlipCard3D({ title, description, technologies, color, index }: FlipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const frontVariants = {
    front: { rotateY: 0, opacity: 1 },
    back: { rotateY: 180, opacity: 0 },
  }

  const backVariants = {
    front: { rotateY: -180, opacity: 0 },
    back: { rotateY: 0, opacity: 1 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-72 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}
        animate={isFlipped ? 'back' : 'front'}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <motion.div
          variants={frontVariants}
          transition={{ duration: 0.6 }}
          style={{
            backfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 glass-effect p-6 rounded-lg border border-cyan-400/30 flex flex-col justify-between"
        >
          <div>
            <div
              className="w-12 h-12 rounded-lg mb-4"
              style={{
                background: `linear-gradient(135deg, ${color}, #00D9FF)`,
                boxShadow: `0 0 20px ${color}`,
              }}
            />
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
          </div>
          <motion.div
            className="text-xs text-cyan-400 font-semibold"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to flip
          </motion.div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          variants={backVariants}
          transition={{ duration: 0.6 }}
          style={{
            backfaceVisibility: 'hidden',
            rotateY: 180,
          }}
          className="absolute inset-0 glass-effect p-6 rounded-lg border border-purple-400/30 flex flex-col justify-between bg-gradient-to-br from-purple-500/10 to-pink-500/10"
        >
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-300/30 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            className="text-xs text-purple-400 font-semibold"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to flip back
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
