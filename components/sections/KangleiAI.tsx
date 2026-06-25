'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const aiModels = [
  { name: 'ChatGPT', color: '#00D9FF', logo: '🤖' },
  { name: 'Gemini', color: '#9D4EDD', logo: '✨' },
  { name: 'Claude', color: '#ff006e', logo: '🧠' },
  { name: 'Perplexity', color: '#00D9FF', logo: '🔍' },
  { name: 'Meta AI', color: '#9D4EDD', logo: '👁️' },
]

const features = [
  'Multi-model AI Integration',
  'Real-time Processing',
  'Advanced Analytics',
  'Custom Workflows',
  'Enterprise Security',
  'Scalable Infrastructure',
]

export function KangleiAI() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [activeModel, setActiveModel] = useState<string | null>(null)

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
              Kanglei AI Platform
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Unified AI experience center with multi-model integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Models */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Integrated Models</h3>
            {aiModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveModel(model.name)}
                onMouseLeave={() => setActiveModel(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="glass-effect p-4 rounded-lg border border-gray-600 hover:border-cyan-400/60 transition-all"
                  animate={{
                    borderColor: activeModel === model.name ? model.color : 'rgb(75, 85, 99)',
                    boxShadow: activeModel === model.name
                      ? `0 0 20px ${model.color}`
                      : '0 0 0px transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{model.logo}</span>
                    <span className="text-white font-semibold">{model.name}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect p-8 rounded-lg border border-cyan-400/30 col-span-1 lg:col-span-2 lg:row-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Platform Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full glass-effect px-6 py-3 rounded-lg font-semibold text-cyan-400 border border-cyan-400 hover:border-cyan-300 hover:text-cyan-300 transition-all duration-300 hover:shadow-lg hover:glow-cyan"
            >
              Explore Platform
            </motion.button>
          </motion.div>
        </div>

        {/* Stats comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 glass-effect p-8 rounded-lg border border-purple-400/30"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Response Time', value: '< 500ms', icon: '⚡' },
              { label: 'Accuracy Rate', value: '99.5%', icon: '🎯' },
              { label: 'Uptime', value: '99.9%', icon: '🔒' },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center p-4 rounded-lg border border-gray-600"
              >
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
