'use client'

import { useEffect, useState } from 'react'
import { X, FlaskConical, Target, Rocket, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useThaiData } from '@/lib/thai-context'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onContact: () => void
  project: {
    title: string
    description: string
    image: string
    category: string
    details: {
      situation: string
      action: string
      result: string
      techStack: string[]
    }
  } | null
}

export function ProjectModal({ isOpen, onClose, onContact, project }: ProjectModalProps) {
  const { isThai, labels } = useThaiData()
  const [isVisible, setIsVisible] = useState(false)
  const [touchedElement, setTouchedElement] = useState<string | null>(null)
  const [triggerShine, setTriggerShine] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10)
      const shineTimer = setTimeout(() => setTriggerShine(true), 800)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(timer)
        clearTimeout(shineTimer)
      }
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      setTriggerShine(false)
      document.body.style.overflow = 'unset'
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isVisible) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-500',
        isOpen ? 'bg-black/80 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-0 opacity-0'
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full max-w-5xl md:min-h-[600px] max-h-[90vh] flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 rounded-[30px] shadow-2xl transition-all duration-500 shadow-cyan-900/20 overflow-hidden',
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-black/20 hover:bg-white/10 rounded-full backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full md:w-[40%] h-64 md:h-auto md:self-stretch shrink-0 overflow-hidden">
          <Image
            src={project?.image || ''}
            alt={project?.title || ''}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start space-y-4">
            <div
              className={cn(
                'group/title cursor-default space-y-4 transition-transform duration-300 origin-bottom-left',
                (touchedElement === 'title' || touchedElement === 'image') && 'scale-105',
                'md:hover:scale-105'
              )}
              onTouchStart={() => setTouchedElement('title')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              <span
                className={cn(
                  'px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-cyan-500 text-black rounded-full transition-all duration-300',
                  touchedElement === 'title' && 'bg-white',
                  'group-hover/title:bg-white'
                )}
              >
                {project?.category}
              </span>
              <h2
                className={cn(
                  'text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-tight transition-colors duration-300',
                  touchedElement === 'title' && 'text-cyan-400',
                  'group-hover/title:text-cyan-400'
                )}
              >
                {project?.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white/[0.02] backdrop-blur-3xl overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="space-y-6 md:space-y-8">
            <div
              className="space-y-2 group/item cursor-default"
              onTouchStart={() => setTouchedElement('situation')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              <div
                className={cn(
                  'flex items-center gap-2 text-cyan-400 transition-all duration-300 origin-left',
                  touchedElement === 'situation' && 'text-cyan-300 scale-110',
                  'group-hover/item:text-cyan-300 group-hover/item:scale-110'
                )}
              >
                <Target className="w-4 h-4" />
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">
                  {isThai ? 'สถานการณ์' : 'Situation'}
                </h3>
              </div>
              <p
                className={cn(
                  'text-gray-200 text-sm md:text-base leading-relaxed font-normal transition-all duration-500 origin-left',
                  touchedElement === 'situation' && 'text-white scale-[1.02]',
                  'group-hover/item:text-white group-hover/item:scale-[1.02]'
                )}
              >
                {project?.details.situation}
              </p>
            </div>

            <div
              className="space-y-2 group/item cursor-default"
              onTouchStart={() => setTouchedElement('solution')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              <div
                className={cn(
                  'flex items-center gap-2 text-purple-400 transition-all duration-300 origin-left',
                  touchedElement === 'solution' && 'text-purple-300 scale-110',
                  'group-hover/item:text-purple-300 group-hover/item:scale-110'
                )}
              >
                <FlaskConical className="w-4 h-4" />
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">
                  {isThai ? 'ทางแก้และผลลัพธ์' : 'Solution & Result'}
                </h3>
              </div>
              <p
                className={cn(
                  'text-gray-200 text-sm md:text-base leading-relaxed font-normal transition-all duration-500 origin-left',
                  touchedElement === 'solution' && 'text-white scale-[1.02]',
                  'group-hover/item:text-white group-hover/item:scale-[1.02]'
                )}
              >
                {project?.details.action} {project?.details.result}
              </p>
            </div>

            <div
              className="space-y-4 pt-4 border-t border-white/5 group/stack cursor-default"
              onTouchStart={() => setTouchedElement('stack')}
              onTouchEnd={() => setTouchedElement(null)}
            >
              <div
                className={cn(
                  'flex items-center gap-2 text-white transition-all duration-300 origin-left',
                  touchedElement === 'stack' && 'text-cyan-400 scale-110',
                  'group-hover/stack:text-cyan-400 group-hover/stack:scale-110'
                )}
              >
                <Rocket className="w-4 h-4 text-cyan-400" />
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">
                  {isThai ? 'เทคโนโลยีที่ใช้' : 'Tech Stack'}
                </h3>
              </div>
              <div
                className={cn(
                  'flex flex-wrap gap-2 transition-transform duration-300 origin-left',
                  touchedElement === 'stack' && 'scale-[1.02]',
                  'group-hover/stack:scale-[1.02]'
                )}
              >
                {project?.details.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-md text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 hover:scale-110 active:bg-cyan-500 active:text-black active:scale-110"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onContact}
            onTouchStart={() => setTouchedElement('contact-btn')}
            onTouchEnd={() => setTouchedElement(null)}
            className={cn(
              'w-full mt-6 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold tracking-wider uppercase transition-all duration-300 group/btn shrink-0',
              'hover:bg-cyan-400 hover:scale-105',
              'active:scale-90 active:bg-cyan-500 active:shadow-[0_0_40px_rgba(34,211,238,0.8)]',
              touchedElement === 'contact-btn' && 'bg-cyan-400 scale-105 shadow-[0_0_30px_rgba(34,211,238,0.5)]',
              triggerShine && 'animate-button-glow'
            )}
          >
            <span>{labels.contact}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
