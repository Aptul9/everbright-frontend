'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  const [visible, setVisible] = useState(false)
  const [triggerShine, setTriggerShine] = useState(false)
  const [touchedButton, setTouchedButton] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setVisible(true)
        setTriggerShine(true)
      }, 10)

      document.body.style.overflow = 'hidden'

      const shineResetTimer = setTimeout(() => setTriggerShine(false), 2500)

      return () => {
        clearTimeout(timer)
        clearTimeout(shineResetTimer)
      }
    } else {
      const timer = setTimeout(() => {
        setVisible(false)
        setTriggerShine(false)
      }, 500)

      document.body.style.overflow = 'unset'

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!visible && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-100 flex justify-center items-start md:items-center p-4 sm:p-6 overflow-y-auto transition-all duration-500 ${
        isOpen
          ? 'bg-black/40 backdrop-blur-md opacity-100'
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl my-auto bg-zinc-900/95 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-[0_0_60px_rgba(34,211,238,0.15)] p-6 sm:p-8 md:p-12 overflow-hidden transition-all duration-500 transform group/modal flex flex-col max-h-[95vh] md:max-h-[85vh] ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
        } hover:shadow-[0_0_120px_rgba(34,211,238,0.3)] hover:border-cyan-400/30`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`absolute inset-0 -translate-x-full duration-[1.5s] ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none ${triggerShine ? 'translate-x-full' : 'group-hover/modal:translate-x-full'}`}
        />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="mb-6 text-center space-y-2 relative z-10 shrink-0">
          <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">{title}</h2>
          <div className="h-0.5 w-20 bg-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto pr-4 custom-scrollbar">
          <div className="text-gray-300 text-sm md:text-base space-y-4 leading-relaxed font-light">
            {content}
          </div>
        </div>

        <div className="relative z-10 pt-8 shrink-0">
          <button
            onClick={onClose}
            onPointerDown={() => setTouchedButton(true)}
            onPointerUp={() => setTouchedButton(false)}
            className={`w-full font-bold rounded-full py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300
                            ${
                              touchedButton
                                ? 'bg-cyan-400 text-black scale-105 shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                                : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                            }`}
          >
            Chiudi
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
