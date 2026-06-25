'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const socialLinks = [
  { name: 'Email', icon: '📧', href: 'mailto:contact@kangleiAI.com', color: '#00D9FF' },
  { name: 'Support', icon: '🆘', href: 'mailto:support@rakeshirom.in', color: '#ff006e' },
  { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/1234567890', color: '#9D4EDD' },
  { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com', color: '#ff006e' },
  { name: 'GitHub', icon: '💻', href: 'https://github.com', color: '#00D9FF' },
  { name: 'Website', icon: '🌐', href: 'https://kangleiAI.com', color: '#9D4EDD' },
]

export function Connect() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Send the message via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.mailtoLink) {
        // Open the mailto link which pre-fills the support email
        window.location.href = data.mailtoLink
        setSubmitted(true)
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' })
          setSubmitted(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

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
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Get in touch for collaboration and opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name input */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-effect px-4 py-3 rounded-lg border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-gray-500 focus:outline-none transition-all bg-transparent"
                  required
                />
              </div>

              {/* Email input */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass-effect px-4 py-3 rounded-lg border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-gray-500 focus:outline-none transition-all bg-transparent"
                  required
                />
              </div>

              {/* Message input */}
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full glass-effect px-4 py-3 rounded-lg border border-cyan-400/30 focus:border-cyan-400 text-white placeholder-gray-500 focus:outline-none transition-all bg-transparent"
                  required
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full glass-effect px-6 py-3 rounded-lg font-semibold text-cyan-400 border border-cyan-400 hover:border-cyan-300 hover:text-cyan-300 transition-all duration-300 hover:shadow-lg hover:glow-cyan"
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="glass-effect p-4 rounded-lg border border-gray-600 hover:border-cyan-400/60 transition-all flex items-center gap-4 group"
                >
                  <span className="text-3xl">{link.icon}</span>
                  <div>
                    <div className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                      {link.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {link.name === 'Email' && 'contact@kangleiAI.com'}
                      {link.name === 'Support' && 'support@rakeshirom.in'}
                      {link.name === 'WhatsApp' && '+1 234 567 8900'}
                      {link.name === 'LinkedIn' && 'Rakesh Irom'}
                      {link.name === 'GitHub' && '@rakeshirom'}
                      {link.name === 'Website' && 'kangleiAI.com'}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
