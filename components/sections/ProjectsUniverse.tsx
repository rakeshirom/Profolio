'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    title: 'Kanglei Artificial Intelligence',
    description: 'AI platform integrating ChatGPT, Gemini, Claude, Perplexity, and Meta AI',
    technologies: ['Python', 'React', 'TensorFlow', 'API Integration'],
    color: '#00D9FF',
  },
  {
    title: 'ITACHI AI',
    description: 'Advanced AI chatbot with multi-model integration and real-time learning',
    technologies: ['Node.js', 'Machine Learning', 'WebSocket', 'Cloud'],
    color: '#9D4EDD',
  },
  {
    title: 'AI Web Applications',
    description: 'Suite of AI-powered web apps for productivity and automation',
    technologies: ['Next.js', 'React', 'AI SDK', 'Tailwind CSS'],
    color: '#ff006e',
  },
  {
    title: 'Android AI Suite',
    description: 'Mobile applications with integrated AI capabilities',
    technologies: ['Kotlin', 'Android SDK', 'ML Kit', 'Firebase'],
    color: '#00D9FF',
  },
  {
    title: 'AI Automation Systems',
    description: 'Enterprise automation using advanced AI models',
    technologies: ['Python', 'FastAPI', 'Docker', 'Kubernetes'],
    color: '#9D4EDD',
  },
  {
    title: 'Data Intelligence Dashboard',
    description: 'Real-time analytics and visualization platform',
    technologies: ['React', 'D3.js', 'PostgreSQL', 'Node.js'],
    color: '#ff006e',
  },
]

export function ProjectsUniverse() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

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
              Projects Universe
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Featured projects and innovations
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setExpandedProject(index)}
              onMouseLeave={() => setExpandedProject(null)}
              className="group cursor-pointer h-full"
            >
              <motion.div
                className="glass-effect p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400/60 transition-all h-full flex flex-col"
                style={{
                  borderColor: expandedProject === index ? project.color : 'rgba(0, 217, 255, 0.3)',
                }}
                animate={{
                  boxShadow: expandedProject === index
                    ? `0 0 30px ${project.color}`
                    : '0 0 0px transparent',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{ backgroundColor: project.color }}
                />
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                  {project.description}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={expandedProject === index ? { opacity: 1 } : { opacity: 0.6 }}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-300/30 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
