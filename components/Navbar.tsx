'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { ContactModal } from '@/components/contact/ContactModal'
import { StarField } from '@/components/StarField'
import Image from 'next/image'

export function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [touchedItem, setTouchedItem] = useState<string | null>(null)
  const [shouldPulse, setShouldPulse] = useState(false)

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShouldPulse(true)
      setTimeout(() => setShouldPulse(false), 2000)
    }, 3000)

    const interval = setInterval(() => {
      setShouldPulse(true)
      setTimeout(() => setShouldPulse(false), 2000)
    }, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href === '#contatti') {
      if (window.scrollY < 50) {
        setIsContactOpen(true)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
          setIsContactOpen(true)
        }, 700)
      }
      return
    }

    const targetId = href.replace('#', '')
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div
          onTouchStart={() => setTouchedItem('navbar')}
          onTouchEnd={() => setTouchedItem(null)}
          className={`max-w-7xl mx-auto h-16 pointer-events-auto flex items-center px-4 md:px-8 bg-[#121212]/98 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-cyan-400/30 hover:scale-[1.02] group/nav relative overflow-hidden ${touchedItem === 'navbar' ? 'scale-[1.02] border-cyan-400/30' : ''}`}
        >
          <div className="absolute inset-0 -translate-x-full group-hover/nav:translate-x-full duration-[1.5s] ease-in-out bg-linear-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none" />

          <div className="flex-1 flex justify-start items-center min-w-0 transition-all duration-300">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }, 300)
              }}
              onTouchStart={() => setTouchedItem('logo')}
              onTouchEnd={() => setTouchedItem(null)}
              className={`relative z-10 flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:scale-105 ${touchedItem === 'logo' ? 'scale-105' : ''}`}
            >
              <div className="relative w-14 h-14 md:w-16 lg:w-20 md:h-16 lg:h-20 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo-icon.png"
                  alt="Everbright"
                  fill
                  className="object-contain mix-blend-screen brightness-125 scale-[2.4] md:scale-[2] lg:scale-[2.2] drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                />
              </div>
              <div className="flex flex-col -space-y-1 md:-space-y-1.5 font-inter pt-1 whitespace-nowrap">
                <div className="text-lg md:text-xl lg:text-[1.85rem] font-black tracking-tighter md:tracking-tight uppercase text-transparent bg-clip-text bg-linear-to-b from-white via-white to-cyan-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  EVERBRIGHT
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="h-px w-3 md:w-4 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <span className="text-[8px] md:text-[8px] lg:text-[9px] font-bold tracking-[0.3em] md:tracking-[0.45em] lg:tracking-[0.55em] text-cyan-300/80 uppercase">
                    IT SERVICES
                  </span>
                  <div className="h-px w-3 md:w-4 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
                </div>
              </div>
            </Link>
          </div>

          <nav className="relative z-10 hidden md:flex items-center justify-center px-4">
            <div className="flex items-center gap-12 lg:gap-16 xl:gap-24">
              {[
                { name: 'SERVIZI', id: '#servizi' },
                { name: 'AZIENDA', id: '#azienda' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.id}
                  onClick={(e) => handleScroll(e, link.id)}
                  className="relative text-sm font-bold tracking-[0.2em] text-gray-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex-1 flex justify-end items-center transition-all duration-300">
            <div className="hidden md:block">
              <Button
                className={`relative overflow-hidden font-bold rounded-full px-6 lg:px-10 h-10 lg:h-11 text-sm tracking-[0.2em] uppercase active:scale-95 transition-all duration-300
                                    ${
                                      shouldPulse
                                        ? 'bg-white text-black animate-pulse shadow-[0_0_80px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.6)] scale-110'
                                        : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105'
                                    }`}
                onClick={() => setIsContactOpen(true)}
              >
                <span className="relative z-10">Contattaci</span>
                <div
                  className={`absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none ${shouldPulse ? 'animate-shine' : 'group-hover/nav:translate-x-full transition-transform duration-1000'}`}
                />
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-6 h-4 flex flex-col justify-between cursor-pointer group/mobile focus:outline-none"
              >
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'group-hover/mobile:bg-cyan-400'}`}
                />
                <span
                  className={`w-2/3 h-0.5 bg-white rounded-full self-end transition-all duration-300 ${isMobileMenuOpen ? 'w-full -rotate-45 -translate-y-2 bg-cyan-400' : 'group-hover/mobile:bg-cyan-400 group-hover/mobile:w-full'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden bg-black transition-all duration-500 flex flex-col justify-center items-center gap-8 cursor-pointer ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>

        <div
          className="relative z-10 flex flex-col items-center gap-8 cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {[
            { name: 'SERVIZI', id: '#servizi' },
            { name: 'AZIENDA', id: '#azienda' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.id}
              onClick={(e) => {
                e.preventDefault()
                setTimeout(() => {
                  handleScroll(e, link.id)
                  setIsMobileMenuOpen(false)
                }, 300)
              }}
              onTouchStart={() => setTouchedItem(link.name)}
              onTouchEnd={() => setTouchedItem(null)}
              className={`text-2xl font-bold tracking-[0.2em] text-gray-300 hover:text-cyan-400 transition-all duration-300 ${touchedItem === link.name ? 'text-cyan-400 scale-110' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <Button
            className={`relative overflow-hidden font-bold rounded-full px-12 h-14 text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]
                            ${
                              touchedItem === 'contact'
                                ? 'bg-cyan-400 text-black scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)]'
                                : 'bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105'
                            }`}
            onClick={() => {
              setTimeout(() => {
                setIsContactOpen(true)
                setIsMobileMenuOpen(false)
              }, 300)
            }}
            onTouchStart={() => setTouchedItem('contact')}
            onTouchEnd={() => setTouchedItem(null)}
          >
            <span className="relative z-10">Contattaci</span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none animate-shine" />
          </Button>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
