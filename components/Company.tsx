'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { ContactModal } from '@/components/ContactModal'

export function Company() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [touchedElement, setTouchedElement] = useState<string | null>(null)
  const [shouldPulse, setShouldPulse] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShouldPulse(true)
      setTimeout(() => setShouldPulse(false), 2000)
    }, 3000)

    const pulseInterval = setInterval(() => {
      setShouldPulse(true)
      setTimeout(() => setShouldPulse(false), 2000)
    }, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(pulseInterval)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true)
          }, 400)
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
          setIsVisible(false)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const currentTimeout = timeoutRef.current
    return () => {
      observer.disconnect()
      if (currentTimeout) clearTimeout(currentTimeout)
    }
  }, [])

  return (
    <>
      <section id="azienda" className="relative w-full py-24 md:py-32 overflow-hidden text-white">
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm border-t border-white/10 z-0" />

        <div className="container mx-auto px-8 md:px-4 relative z-20">
          <div
            ref={sectionRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 group transition-all duration-700 ${
              isVisible || isHovered ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-20'
            }`}
          >
            <div
              className="w-full md:w-1/2 relative transition-transform duration-[1.5s]"
              onTouchStart={() => setTouchedElement('image')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              <div
                className={`absolute inset-0 -z-10 pointer-events-none transition-[filter] duration-500 group-hover:delay-[1500ms] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] ${touchedElement === 'image' ? 'delay-[1500ms] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]' : ''}`}
              >
                <div
                  className={`relative h-125 w-full rounded-[32px] bg-black transition-transform duration-[1.5s] group-hover:scale-105 ${touchedElement === 'image' ? 'scale-105' : ''}`}
                />
              </div>

              <div
                className={`relative h-125 w-full rounded-[32px] overflow-hidden transition-transform duration-[1.5s] group-hover:scale-105 ${touchedElement === 'image' ? 'scale-105' : ''}`}
              >
                <Image
                  src="/company.png"
                  alt="Everbright Headquarters"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
            </div>

            <div
              className={`w-full md:w-1/2 space-y-8 transition-transform duration-[1.5s] group-hover:scale-105 ${touchedElement === 'text' ? 'scale-105' : ''}`}
              onTouchStart={() => setTouchedElement('text')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                IL FUTURO È <span className="text-cyan-400">ORA.</span>
              </h2>

              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Siamo{' '}
                  <span className="everbright-highlight group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">
                    Everbright
                  </span>
                  . Non siamo solo consulenti, siamo architetti del cambiamento digitale. Nati dalla
                  passione per la tecnologia e guidati dall&apos;innovazione, aiutiamo le aziende a
                  superare i confini del possibile.
                </p>
                <p>
                  In{' '}
                  <span className="everbright-highlight group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000">
                    Everbright
                  </span>
                  , il nostro team di esperti lavora ogni giorno per trasformare sfide complesse in
                  soluzioni eleganti e scalabili. Crediamo che la tecnologia debba essere un
                  acceleratore, non un ostacolo.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  style={
                    shouldPulse
                      ? {
                          boxShadow:
                            '0 0 80px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6)',
                          transform: 'scale(1.1)',
                        }
                      : {}
                  }
                  className={`font-bold px-10 h-14 rounded-full text-sm tracking-[0.2em] uppercase active:scale-95 relative z-50
                                        ${shouldPulse ? 'animate-pulse' : ''}
                                        ${
                                          touchedElement === 'contact'
                                            ? 'bg-cyan-400 text-black scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)]'
                                            : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105'
                                        } ${!shouldPulse && !touchedElement ? 'transition-all duration-300' : ''}`}
                  onClick={() => {
                    setTimeout(() => setIsContactOpen(true), 300)
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation()
                    setTouchedElement('contact')
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation()
                    setTouchedElement(null)
                  }}
                >
                  Contattaci
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
