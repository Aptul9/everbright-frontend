'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { useThaiData } from '@/lib/thai-context'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { isThai } = useThaiData()
  const [visible, setVisible] = useState(false)
  const [triggerShine, setTriggerShine] = useState(false)
  const [touchedElement, setTouchedElement] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setVisible(true)
        setTriggerShine(true)
      }, 10)
      document.body.style.overflow = 'hidden'
      const shineResetTimer = setTimeout(() => setTriggerShine(false), 2500)

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        clearTimeout(timer)
        clearTimeout(shineResetTimer)
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
        setTriggerShine(false)
        setTouchedElement(null)
      }, 500)
      document.body.style.overflow = 'unset'
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!visible && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-100 flex justify-center items-start md:items-center p-4 sm:p-6 overflow-y-auto transition-all duration-500 ${isOpen
          ? 'bg-black/40 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
        }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl my-auto bg-zinc-900/90 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_0_60px_rgba(34,211,238,0.15)] p-6 sm:p-8 md:p-12 overflow-hidden transition-all duration-500 transform group/form ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
          } hover:shadow-[0_0_120px_rgba(34,211,238,0.3)] hover:border-cyan-400/30`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`absolute inset-0 -translate-x-full duration-[1.5s] ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none group-hover/form:translate-x-full ${triggerShine ? 'translate-x-full' : ''}`}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div
          onTouchStart={() => setTouchedElement('header')}
          onTouchEnd={() => setTouchedElement(null)}
          className={`mb-4 md:mb-8 text-center space-y-1 relative z-10 transition-transform duration-500 ease-out hover:scale-105 cursor-default ${touchedElement === 'header' ? 'scale-105' : ''}`}
        >
          <h2 className="text-xl md:text-3xl font-bold tracking-tighter text-white uppercase">
            {isThai ? (
              <>
                บอกเราเกี่ยวกับ <span className="text-cyan-400">คุณ</span>
              </>
            ) : (
              <>
                PARLAMI DI <span className="text-cyan-400">TE</span>.
              </>
            )}
          </h2>
          <p className="text-gray-400 text-[10px] md:text-sm">
            {isThai
              ? 'เราพร้อมรับฟังวิสัยทัศน์ของคุณ'
              : 'Siamo pronti ad ascoltare la tua visione.'}
          </p>
        </div>

        <ContactForm onSuccess={onClose} triggerAnimation={triggerShine} />
      </div>
    </div>
  )
}
