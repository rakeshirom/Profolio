'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Background } from '@/components/3d/Background'

const projectsData = [
  {
    id: 1,
    title: 'Kanglei Artificial Intelligence',
    description: 'AI platform integrating ChatGPT, Gemini, Claude, Perplexity, and Meta AI with real-time processing and advanced analytics.',
    longDescription: 'A comprehensive AI platform that brings together multiple leading AI models under one unified interface. Features include multi-model AI integration, real-time processing, advanced analytics, custom workflows, enterprise security, and scalable infrastructure.',
    technologies: ['Python', 'React', 'TensorFlow', 'API Integration', 'Cloud Computing'],
    color: '#00D9FF',
    users: '5600+',
    status: 'Active'
  },
  {
    id: 2,
    title: 'ITACHI AI',
    description: 'Advanced AI chatbot with multi-model integration and real-time learning capabilities.',
    longDescription: 'A sophisticated AI chatbot system leveraging multiple language models for context-aware conversations. ITACHI AI continuously learns from interactions and improves response quality over time, with support for multiple languages and specialized domains.',
    technologies: ['Node.js', 'Machine Learning', 'WebSocket', 'Cloud', 'TypeScript'],
    color: '#9D4EDD',
    users: '2400+',
    status: 'Active'
  },
  {
    id: 3,
    title: 'AI Web Applications',
    description: 'Suite of AI-powered web apps for productivity, automation, and business intelligence.',
    longDescription: 'A collection of modular web applications powered by AI, designed for various business scenarios including document analysis, data processing, content generation, and predictive analytics. Each application is optimized for performance and user experience.',
    technologies: ['Next.js', 'React', 'AI SDK', 'Tailwind CSS', 'FastAPI'],
    color: '#ff006e',
    users: '1800+',
    status: 'Active'
  },
  {
    id: 4,
    title: 'Android AI Suite',
    description: 'Mobile applications with integrated AI capabilities for iOS and Android platforms.',
    longDescription: 'Native mobile applications that bring AI capabilities to smartphones and tablets. The suite includes on-device AI processing, cloud integration, and offline functionality, providing users with intelligent tools on the go.',
    technologies: ['Kotlin', 'Android SDK', 'ML Kit', 'Firebase', 'Java'],
    color: '#00D9FF',
    users: '980+',
    status: 'Active'
  },
  {
    id: 5,
    title: 'AI Automation Systems',
    description: 'Enterprise automation using advanced AI models for workflow optimization.',
    longDescription: 'Enterprise-grade automation platform that uses AI to optimize business processes, reduce manual work, and increase efficiency. Supports RPA, intelligent document processing, and workflow automation across various business domains.',
    technologies: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL'],
    color: '#9D4EDD',
    users: '450+',
    status: 'Active'
  },
  {
    id: 6,
    title: 'Data Intelligence Dashboard',
    description: 'Real-time analytics and visualization platform with AI-powered insights.',
    longDescription: 'Advanced analytics platform that processes large datasets and provides real-time insights through interactive visualizations. Features AI-powered anomaly detection, predictive analytics, and custom report generation.',
    technologies: ['React', 'D3.js', 'PostgreSQL', 'Node.js', 'Socket.io'],
    color: '#ff006e',
    users: '220+',
    status: 'Active'
  },
]

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-hidden">
      <Background />

      <div className="relative z-10 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.back()}
            className="mb-12 px-6 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
          >
            ← Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Projects Universe
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Innovative AI solutions transforming industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <motion.div
                  className="glass-effect p-6 rounded-lg border border-cyan-400/30 hover:border-cyan-400/60 transition-all h-full flex flex-col cursor-pointer"
                  whileHover={{ y: -5 }}
                  style={{
                    borderColor: `${project.color}33`,
                  }}
                  onHoverStart={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = project.color
                    el.style.boxShadow = `0 0 30px ${project.color}80`
                  }}
                  onHoverEnd={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = `${project.color}33`
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color
                    }}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="mb-4 p-3 rounded bg-white/5 border border-white/10">
                    <p className="text-xs text-gray-300">
                      {project.longDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs font-semibold bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-300/30 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between text-xs text-gray-400">
                    <span>{project.users} Active Users</span>
                    <span>{project.status}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
