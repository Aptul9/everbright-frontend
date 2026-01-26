'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { useThaiData } from '@/lib/thai-context'
import { ServiceCard } from './ServiceCard'
import { ServiceModal } from './ServiceModal'
import { servicesData } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Services() {
  const { services, isThai } = useThaiData()
  const [selectedService, setSelectedService] = useState<(typeof servicesData)[0] | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [touchedHeader, setTouchedHeader] = useState(false)

  const extendedServices = [...services, ...services, ...services]
  const [currentIndex, setCurrentIndex] = useState(services.length)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [isTransitioning])

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }, [isTransitioning])

  useEffect(() => {
    if (!isTransitioning) return

    const total = services.length

    const timeout = setTimeout(() => {
      setIsTransitioning(false)
      if (currentIndex >= 2 * total) {
        setCurrentIndex(total)
      } else if (currentIndex < total) {
        setCurrentIndex(currentIndex + total)
      } else if (currentIndex >= 2 * total) {
        setCurrentIndex(currentIndex - total)
      }
    }, 500)

    transitionTimeoutRef.current = timeout
    return () => clearTimeout(timeout)
  }, [currentIndex, isTransitioning, services.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isSwipe = Math.abs(distance) > 50

    if (isSwipe) {
      if (distance > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  const handleCardClick = (index: number) => {
    if (isDragging || isTransitioning) return
    if (index !== currentIndex) {
      setIsTransitioning(true)
      setCurrentIndex(index)
    }
  }

  const openService = (service: (typeof servicesData)[0]) => {
    if (isDragging) return
    setSelectedService(service)
    setIsServiceModalOpen(true)
  }

  const handleContactFromService = () => {
    setIsServiceModalOpen(false)
    setIsContactOpen(true)
  }

  return (
    <>
      <section
        id="servizi"
        className="relative z-10 w-full text-white py-12 md:py-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-24 xl:px-32 max-w-[1400px] relative z-10 flex flex-col space-y-8 md:space-y-12 mb-8">
          <div
            onTouchStart={() => setTouchedHeader(true)}
            onTouchEnd={() => setTouchedHeader(false)}
            className={`text-center space-y-4 transition-transform duration-500 ease-out hover:scale-105 cursor-default ${touchedHeader ? 'scale-105' : ''}`}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">
              {isThai ? 'บริการของเรา' : 'I NOSTRI SERVIZI'}
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              {isThai
                ? 'ความเป็นเลิศทางเทคโนโลยีที่ตอบโจทย์ธุรกิจของคุณ'
                : 'Eccellenza tecnologica al servizio della tua impresa.'}
            </p>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden py-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 hidden md:flex"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 hidden md:flex"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="flex items-center"
            style={
              {
                transform: `translateX(calc(50vw - var(--card-half-width) - (${currentIndex} * (var(--card-width) + var(--card-gap)))))`,
                transition: isTransitioning
                  ? 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)'
                  : 'none',
              } as React.CSSProperties
            }
          >
            {extendedServices.map((service, i) => {
              const isActive = i === currentIndex
              return (
                <div
                  key={`${service.title}-${i}`}
                  className="flex-shrink-0 px-[var(--half-gap)]"
                  style={
                    {
                      width: 'var(--card-width)',
                      marginRight: 'var(--card-gap)',
                    } as React.CSSProperties
                  }
                >
                  <ServiceCard
                    index={i}
                    service={service}
                    isActive={isActive}
                    onCenter={() => handleCardClick(i)}
                    onOpen={() => openService(service)}
                  />
                </div>
              )
            })}
          </div>

          <style jsx>{`
            div {
              --card-width: 80vw;
              --card-half-width: 40vw;
              --card-gap: 16px;
              --half-gap: 8px;
            }
            @media (min-width: 768px) {
              div {
                --card-width: 55vw;
                --card-half-width: 27.5vw;
                --card-gap: 64px;
                --half-gap: 32px;
              }
            }
          `}</style>
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
