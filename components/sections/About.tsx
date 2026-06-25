'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const milestones = [
  {
    year: '2015',
    title: 'Journey Begins',
    description: 'Started exploring AI and machine learning from Manipur',
    icon: '🚀',
  },
  {
    year: '2018',
    title: 'First AI Project',
    description: 'Developed initial AI models and web applications',
    icon: '🤖',
  },
  {
    year: '2021',
    title: 'Kanglei AI Founded',
    description: 'Launched Kanglei Artificial Intelligence',
    icon: '✨',
  },
  {
    year: '2024',
    title: 'Global Recognition',
    description: 'Recognition in AI innovation and entrepreneurship',
    icon: '🌟',
  },
]

export function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

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
              Journey & Milestones
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            From Manipur to the global AI stage
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="md:w-1/2">
                  <div className="glass-effect p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400/60 transition-all">
                    <div className="text-sm text-cyan-400 font-mono mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Icon circle */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg glow-cyan relative z-10"
                  >
                    {milestone.icon}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
