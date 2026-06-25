'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
  { name: 'Artificial Intelligence', proficiency: 95, color: '#00D9FF' },
  { name: 'Machine Learning', proficiency: 90, color: '#9D4EDD' },
  { name: 'Deep Learning', proficiency: 88, color: '#ff006e' },
  { name: 'Cloud Computing', proficiency: 85, color: '#00D9FF' },
  { name: 'Android Development', proficiency: 82, color: '#9D4EDD' },
  { name: 'Web Development', proficiency: 92, color: '#ff006e' },
  { name: 'UI/UX Design', proficiency: 80, color: '#00D9FF' },
  { name: 'Python', proficiency: 95, color: '#9D4EDD' },
  { name: 'JavaScript', proficiency: 90, color: '#ff006e' },
  { name: 'React', proficiency: 88, color: '#00D9FF' },
  { name: 'Node.js', proficiency: 87, color: '#9D4EDD' },
  { name: 'API Integration', proficiency: 89, color: '#ff006e' },
]

export function SkillsGalaxy() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

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
              Skills Galaxy
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Core competencies in AI and software development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onMouseEnter={() => setExpandedSkill(skill.name)}
              onMouseLeave={() => setExpandedSkill(null)}
              className="group cursor-pointer"
            >
              <motion.div
                className="glass-effect p-6 rounded-lg border transition-all h-full flex flex-col"
                style={{
                  borderColor: expandedSkill === skill.name ? skill.color : 'rgba(0, 217, 255, 0.3)',
                }}
                animate={{
                  boxShadow: expandedSkill === skill.name
                    ? `0 0 20px ${skill.color}`
                    : '0 0 0px transparent',
                }}
              >
                {/* Skill name */}
                <h3 className="text-lg font-bold text-white mb-3">
                  {skill.name}
                </h3>

                {/* Proficiency bar */}
                <div className="mb-4 flex-1">
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, #00D9FF)`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.05 + 0.3 }}
                    />
                  </div>
                </div>

                {/* Proficiency percentage */}
                <div className="text-right">
                  <span
                    className="text-sm font-mono"
                    style={{ color: skill.color }}
                  >
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Hover effect - additional info */}
                {expandedSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-300"
                  >
                    Expert level proficiency
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
