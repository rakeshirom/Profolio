'use client'

import { Background } from '@/components/3d/Background'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { SkillsGalaxy } from '@/components/sections/SkillsGalaxy'
import { ProjectsUniverse } from '@/components/sections/ProjectsUniverse'
import { KangleiAI } from '@/components/sections/KangleiAI'
import { Statistics } from '@/components/sections/Statistics'
import { Connect } from '@/components/sections/Connect'

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-hidden">
      {/* 3D Background */}
      <Background />

      {/* Content sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <SkillsGalaxy />
        <ProjectsUniverse />
        <KangleiAI />
        <Statistics />
        <Connect />

        {/* Footer */}
        <footer className="border-t border-cyan-400/20 py-8 px-4 md:px-8 text-center text-gray-400">
          <p>
            © 2024 Rakesh Irom. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Built with Next.js, React Three Fiber, and Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  )
}
