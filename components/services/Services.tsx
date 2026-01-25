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
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [touchedHeader, setTouchedHeader] = useState(false)

  // Infinite Carousel Logic
  // We triple the items: [Pre-Buffer] [Main-Set] [Post-Buffer]
  const extendedServices = [...services, ...services, ...services]
  const [currentIndex, setCurrentIndex] = useState(services.length) // Start at the beginning of the Main Set
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Card dimensions for calculation
  // Mobile: 85vw + 16px gap
  // Desktop: 450px + 32px gap
  // We'll use CSS variables or JS calculation. JS is safer for centering logic.
  // Actually, simplest is to use percentage based translates for responsiveness or fixed rems.
  // Let's use a container query approach or simple media query hook? 
  // Simplify: Use dynamic style based on screen width is tricky in SSR. 
  // Better: Use styling that doesn't depend on JS for width, but translates by %?
  // No, to center perfectly with variable widths, we need to know the offset.
  // Let's stick to the visual refactoring: "Centered full screen".
  // Let's assume standard card size logic.

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

  // Reset index for infinite loop effect
  useEffect(() => {
    if (!isTransitioning) return

    const total = services.length
    // Transitions take 500ms (matches CSS)
    const timeout = setTimeout(() => {
      setIsTransitioning(false)
      if (currentIndex >= 2 * total) {
        // If we reached the end of the second buffer, jump back to the start of the main set
        setCurrentIndex(total)
      } else if (currentIndex < total) {
        // If we reached the start of the first buffer, jump forward to the end of the main set
        // Note: Logic depends on exact boundaries.
        // If currentIndex becomes 'total - 1', we are in Pre-Buffer. We want to be at '2*total - 1' (Main Set end used to be center?)
        // Wait.
        // Set 1: 0 .. n-1
        // Set 2: n .. 2n-1 (Main)
        // Set 3: 2n .. 3n-1
        // If we go to n-1 (from n), we want to jump to 2n-1.
        setCurrentIndex(currentIndex + total)
      } else if (currentIndex >= 2 * total) {
        setCurrentIndex(currentIndex - total)
      }
    }, 500)

    transitionTimeoutRef.current = timeout
    return () => clearTimeout(timeout)
  }, [currentIndex, isTransitioning, services.length])

  // Touch Handling
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  const openService = (service: typeof servicesData[0]) => {
    if (isDragging) return // Prevent click on drag
    setSelectedService(service)
    setIsServiceModalOpen(true)
  }

  const handleContactFromService = () => {
    setIsServiceModalOpen(false)
    setIsContactOpen(true)
  }

  return (
    <>
      <section id="servizi" className="relative w-full bg-black text-white py-12 md:py-20 overflow-hidden">
        {/* Header */}
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
              {isThai ? 'ความเป็นเลิศทางเทคโนโลยีที่ตอบโจทย์ธุรกิจของคุณ' : 'Eccellenza tecnologica al servizio della tua impresa.'}
            </p>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative w-full overflow-hidden py-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons (Desktop) */}
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

          {/* Track */}
          <div
            className="flex items-center"
            style={{
              // Centering Logic:
              // We want the 'currentIndex' item to be exactly in the center of the screen.
              // TranslateX = 50vw - (CardWidth / 2) - (currentIndex * (CardWidth + Gap))

              // Using CSS allows us to use calc() with mixed units (vw, px) easily.
              // We define CardWidth and Gap as CSS variables for cleanliness or inline.
              // Mobile: 85vw width, 4vw gap (approx 16px).
              // Desktop: 450px width, 32px gap.

              // Let's use a simpler transform approach:
              // shift the whole track so the 'currentIndex' element is at 0px (left edge), then add 50vw - half_card.
              transform: `translateX(calc(50vw - var(--card-half-width) - (${currentIndex} * (var(--card-width) + var(--card-gap)))))`,
              transition: isTransitioning ? 'transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
            } as React.CSSProperties}
          >
            {extendedServices.map((service, i) => {
              const isActive = i === currentIndex
              return (
                <div
                  key={`${service.title}-${i}`}
                  className="flex-shrink-0 px-[var(--half-gap)]"
                  style={{
                    width: 'var(--card-width)',
                    marginRight: 'var(--card-gap)'
                  } as React.CSSProperties}
                >
                  {/* Wrapper to handle margin/padding spacing cleanly */}
                  <ServiceCard
                    index={i}
                    service={service}
                    isActive={isActive}
                    onClick={() => openService(service)}
                  />
                </div>
              )
            })}
          </div>

          {/* CSS Variables for Responsive Calculation */}
          <style jsx>{`
                div {
                    --card-width: 85vw;
                    --card-half-width: 42.5vw;
                    --card-gap: 16px;
                    --half-gap: 8px;
                }
                @media (min-width: 768px) {
                    div {
                        --card-width: 65vw;
                        --card-half-width: 32.5vw;
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
