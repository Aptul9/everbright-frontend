'use client'

import { useState, useEffect, useRef } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { servicesData } from '@/lib/data'
import { ServiceCard } from './ServiceCard'
import { ServiceModal } from './ServiceModal'

export function Services() {
  const [selectedService, setSelectedService] = useState<(typeof servicesData)[0] | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
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
                if (prev[index]) return prev
                const next = [...prev]
                next[index] = true
                return next
              })
            }, 100)
          } else {
            if (timeoutsRef.current[index]) {
              clearTimeout(timeoutsRef.current[index]!)
              timeoutsRef.current[index] = null
            }
            setVisibleServices((prev) => {
              if (!prev[index]) return prev
              const next = [...prev]
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

  const openService = (service: (typeof servicesData)[0]) => {
    setSelectedService(service)
    setIsServiceModalOpen(true)
  }

  const handleContactFromService = () => {
    setIsServiceModalOpen(false)
    setIsContactOpen(true)
  }

  return (
    <>
      <section id="servizi" className="relative w-full bg-black text-white py-24 lg:py-24 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 lg:px-24 xl:px-32 max-w-[1400px] relative z-10 flex flex-col space-y-12 lg:space-y-16">
          <div
            onTouchStart={() => setTouchedHeader(true)}
            onTouchEnd={() => setTouchedHeader(false)}
            className={`text-center space-y-4 mb-4 transition-transform duration-500 ease-out hover:scale-105 cursor-default ${touchedHeader ? 'scale-105' : ''}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              I NOSTRI SERVIZI
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Eccellenza tecnologica al servizio della tua impresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-32 gap-y-12 lg:gap-y-16 items-start">
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
                onContactOpen={() => openService(service)}
              />
            ))}
          </div>
        </div>
      </section>
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
        onContact={handleContactFromService}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
