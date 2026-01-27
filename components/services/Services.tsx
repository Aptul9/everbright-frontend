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
  const [isHoveringCard, setIsHoveringCard] = useState(false)

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
        className="relative z-10 w-full text-white pt-8 pb-4 md:pt-0 md:pb-4 overflow-hidden"
      >
        <div className="container mx-auto px-4 lg:px-24 xl:px-32 max-w-[1400px] relative z-10 flex flex-col space-y-8 md:space-y-12 mb-4 md:mb-8">
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
          className="relative w-full overflow-hidden py-12 md:pt-4 md:pb-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={handlePrev}
            className={cn(
              "absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-all duration-500 hidden md:flex items-center justify-center",
              "border backdrop-blur-md",
              isHoveringCard
                ? "bg-white/10 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-black/50 border-white/10 text-white/50",
              "hover:bg-cyan-400 hover:border-cyan-400 hover:text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={handleNext}
            className={cn(
              "absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-all duration-500 hidden md:flex items-center justify-center",
              "border backdrop-blur-md",
              isHoveringCard
                ? "bg-white/10 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-black/50 border-white/10 text-white/50",
              "hover:bg-cyan-400 hover:border-cyan-400 hover:text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]"
            )}
            aria-label="Next slide"
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
                    onMouseEnter={() => setIsHoveringCard(true)}
                    onMouseLeave={() => setIsHoveringCard(false)}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex justify-center items-center gap-10 mt-16 md:hidden">
            <button
              onClick={handlePrev}
              className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white transition-all duration-300 active:scale-75 active:bg-cyan-400/20 active:text-cyan-400 active:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:border-cyan-400/40"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleCardClick(i + services.length)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-500',
                    currentIndex % services.length === i
                      ? 'bg-cyan-400 w-10 shadow-[0_0_15px_rgba(34,211,238,0.6)]'
                      : 'bg-white/20 w-2.5'
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white transition-all duration-300 active:scale-75 active:bg-cyan-400/20 active:text-cyan-400 active:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:border-cyan-400/40"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Pagination Dots Only */}
          <div className="hidden md:flex justify-center items-center mt-12">
            <div className="flex items-center gap-5 p-4 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleCardClick(i + services.length)}
                  className={cn(
                    'h-3 rounded-full transition-all duration-500 cursor-pointer',
                    currentIndex % services.length === i
                      ? 'bg-cyan-400 w-16 shadow-[0_0_25px_rgba(34,211,238,0.8)]'
                      : 'bg-white/20 w-3 hover:bg-white/40 border border-white/10'
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <style jsx>{`
            div {
              --card-width: 75vw;
              --card-half-width: 37.5vw;
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
