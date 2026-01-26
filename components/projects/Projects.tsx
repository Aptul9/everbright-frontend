'use client'

import { useState, useEffect, useRef } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { useThaiData } from '@/lib/thai-context'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { projectsData } from '@/lib/data'

export function Projects() {
  const { projects, isThai } = useThaiData()
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  )
  const [hoveredProjects, setHoveredProjects] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  )
  const [touchedHeader, setTouchedHeader] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const timeoutsRef = useRef<(NodeJS.Timeout | null)[]>([])
  const lastTouchTime = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-project-index') || '0')

          if (entry.isIntersecting) {
            if (timeoutsRef.current[index]) {
              clearTimeout(timeoutsRef.current[index]!)
            }
            timeoutsRef.current[index] = setTimeout(() => {
              setVisibleProjects((prev) => {
                const next = [...prev]
                if (next[index]) return prev
                next[index] = true
                return next
              })
            }, 100)
          } else {
            if (timeoutsRef.current[index]) {
              clearTimeout(timeoutsRef.current[index]!)
              timeoutsRef.current[index] = null
            }
            setVisibleProjects((prev) => {
              const next = [...prev]
              if (!next[index]) return prev
              next[index] = false
              return next
            })
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '-2% 0px -2% 0px',
      }
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    const currentTimeouts = timeoutsRef.current
    return () => {
      observer.disconnect()
      currentTimeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout)
      })
    }
  }, [projects.length, isThai])

  const handleHoverChange = (index: number, isHovered: boolean) => {
    if (isHovered && Date.now() - lastTouchTime.current < 1000) return
    if (isHovered) lastTouchTime.current = Date.now()

    setHoveredProjects((prev) => {
      const next = [...prev]
      next[index] = isHovered
      return next
    })
  }

  const openProject = (project: (typeof projectsData)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleContactFromProject = () => {
    setIsModalOpen(false)
    setIsContactOpen(true)
  }

  return (
    <>
      <section
        id="progetti"
        className="relative z-10 w-full text-white pt-12 pb-24 lg:pt-12 lg:pb-24 overflow-hidden min-h-screen flex flex-col justify-center"
      >
        <div className="container mx-auto px-4 lg:px-24 xl:px-32 max-w-[1400px] relative z-10 flex flex-col space-y-20 lg:space-y-24">
          <div
            onTouchStart={() => setTouchedHeader(true)}
            onTouchEnd={() => setTouchedHeader(false)}
            className={`text-center space-y-4 mb-4 transition-transform duration-500 ease-out hover:scale-105 cursor-default ${touchedHeader ? 'scale-105' : ''}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              {isThai ? 'โครงการของเรา' : 'I NOSTRI PROGETTI'}
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              {isThai
                ? 'โซลูชันที่เป็นรูปธรรมสำหรับความท้าทายที่ซับซ้อน'
                : 'Soluzioni concrete per sfide complesse.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-32 gap-y-24 lg:gap-y-16 items-start">
            {projects.map((project, index) => (
              <ProjectCard
                key={`${isThai ? 'th' : 'it'}-${index}`}
                ref={(el) => {
                  projectRefs.current[index] = el
                }}
                project={project}
                index={index}
                isVisible={visibleProjects[index]}
                isHovered={hoveredProjects[index]}
                onHoverChange={handleHoverChange}
                onContactOpen={() => openProject(project)}
              />
            ))}
          </div>
        </div>
      </section>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        onContact={handleContactFromProject}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
