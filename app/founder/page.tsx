'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Background } from '@/components/3d/Background'

export default function FounderPage() {
  const router = useRouter()

  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-hidden">
      <Background />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.back()}
            className="mb-12 px-6 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
          >
            ← Back
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
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

            {/* Founder Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Rakesh Irom
                  </span>
                </h1>
                <h2 className="text-2xl text-gray-300 font-semibold">
                  Founder & CEO of Kanglei Artificial Intelligence
                </h2>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Rakesh Irom is a visionary entrepreneur and AI innovator based in Manipur, India. With a passion for 
                  transforming technology and leveraging artificial intelligence to solve real-world problems, he founded 
                  Kanglei Artificial Intelligence with the mission to make cutting-edge AI accessible to businesses of all sizes.
                </p>

                <p>
                  As a software developer and AI specialist, Rakesh brings over a decade of experience in building scalable 
                  solutions, machine learning models, and enterprise automation systems. His expertise spans across web development, 
                  mobile applications, and advanced AI implementations including natural language processing and computer vision.
                </p>

                <p>
                  Kanglei AI has successfully integrated multiple AI platforms including ChatGPT, Google Gemini, Claude, Perplexity, 
                  and Meta AI, creating a comprehensive ecosystem for intelligent business solutions. The platform has served over 
                  5,600 active users and deployed 56+ AI-powered applications.
                </p>

                <p>
                  Beyond technology, Rakesh is committed to fostering innovation in the tech ecosystem of Northeast India and 
                  empowering the next generation of developers and entrepreneurs. He believes in the potential of artificial 
                  intelligence to drive positive change and economic growth in emerging markets.
                </p>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">28+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">16+</div>
                  <div className="text-sm text-gray-400">AI Models</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">5.6K+</div>
                  <div className="text-sm text-gray-400">Users</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
