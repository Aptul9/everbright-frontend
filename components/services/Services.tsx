'use client'

import { useState, useEffect, useRef } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { servicesData } from '@/lib/data'
import { ServiceCard } from './ServiceCard'

export function Services() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [visibleServices, setVisibleServices] = useState<boolean[]>(
    new Array(servicesData.length).fill(false)
  )
  const [hoveredServices, setHoveredServices] = useState<boolean[]>(
    new Array(servicesData.length).fill(false)
  )
  const [touchedHeader, setTouchedHeader] = useState(false)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const timeoutsRef = useRef<(NodeJS.Timeout | null)[]>([])
  const lastTouchTime = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-service-index') || '0')

          if (entry.isIntersecting) {
            if (timeoutsRef.current[index]) {
              clearTimeout(timeoutsRef.current[index]!)
            }
            timeoutsRef.current[index] = setTimeout(() => {
              setVisibleServices((prev) => {
                const next = [...prev]
                next[index] = true
                return next
              })
            }, 400)
          } else {
            if (timeoutsRef.current[index]) {
              clearTimeout(timeoutsRef.current[index]!)
              timeoutsRef.current[index] = null
            }
            setVisibleServices((prev) => {
              const next = [...prev]
              next[index] = false
              return next
            })
          }
        })
      },
      {
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px',
      }
    )

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    const currentTimeouts = timeoutsRef.current
    return () => {
      observer.disconnect()
      currentTimeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout)
      })
    }
  }, [])

  const handleHoverChange = (index: number, isHovered: boolean) => {
    if (isHovered && Date.now() - lastTouchTime.current < 1000) return
    if (isHovered) lastTouchTime.current = Date.now()

    setHoveredServices((prev) => {
      const next = [...prev]
      next[index] = isHovered
      return next
    })
  }

  return (
    <>
      <section id="servizi" className="relative w-full bg-black text-white py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col space-y-64">
          <div
            onTouchStart={() => setTouchedHeader(true)}
            onTouchEnd={() => setTouchedHeader(false)}
            className={`text-center space-y-6 mb-10 transition-transform duration-500 ease-out hover:scale-105 cursor-default ${touchedHeader ? 'scale-105' : ''}`}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              I NOSTRI SERVIZI
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Eccellenza tecnologica al servizio della tua impresa.
            </p>
          </div>

          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              ref={(el) => {
                serviceRefs.current[index] = el
              }}
              service={service}
              index={index}
              isVisible={visibleServices[index]}
              isHovered={hoveredServices[index]}
              onHoverChange={handleHoverChange}
              onContactOpen={() => setIsContactOpen(true)}
            />
          ))}
        </div>
      </section>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
