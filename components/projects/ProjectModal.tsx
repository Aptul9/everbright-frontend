'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle2, FlaskConical, Target, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ProjectModalProps {
    isOpen: boolean
    onClose: () => void
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

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null

    return (
        <div
            className={cn(
                'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-all duration-500',
                isOpen ? 'bg-black/80 backdrop-blur-md opacity-100' : 'bg-black/0 backdrop-blur-0 opacity-0'
            )}
            onClick={onClose}
        >
            <div
                className={cn(
                    'relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-black/90 border border-white/20 rounded-[40px] shadow-2xl transition-all duration-500 flex flex-col group/modal',
                    isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Shine effect overlay */}
                <div className="absolute inset-0 -translate-x-full group-hover/modal:translate-x-full duration-[2s] ease-in-out bg-linear-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 z-50 p-2 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar relative z-0">
                    {/* Header Image */}
                    <div className="relative w-full h-48 md:h-64 overflow-hidden group/header">
                        <Image
                            src={project?.image || ''}
                            alt={project?.title || ''}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-8 md:left-12">
                            <div className="flex flex-col items-start transition-all duration-300 group-hover/header:scale-105 origin-left cursor-default">
                                <span className="px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-cyan-500 text-black rounded-full mb-3 inline-block">
                                    {project?.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase">
                                    {project?.title}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 md:px-12 py-8 space-y-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Details */}
                            <div className="lg:col-span-8 space-y-10">
                                {/* Situation */}
                                <section className="space-y-3 group/item cursor-default">
                                    <div className="flex items-center gap-3 text-cyan-400 transition-all duration-300 group-hover/item:scale-110 origin-left">
                                        <Target className="w-4 h-4" />
                                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Situation & Task</h3>
                                    </div>
                                    <p className="text-lg text-gray-300 leading-relaxed font-light transition-all duration-500 group-hover/item:text-white group-hover/item:scale-105 origin-left">
                                        {project?.details.situation}
                                    </p>
                                </section>

                                {/* Action */}
                                <section className="space-y-3 group/item cursor-default">
                                    <div className="flex items-center gap-3 text-purple-400 transition-all duration-300 group-hover/item:scale-110 origin-left">
                                        <FlaskConical className="w-4 h-4" />
                                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Action</h3>
                                    </div>
                                    <p className="text-lg text-gray-300 leading-relaxed font-light transition-all duration-500 group-hover/item:text-white group-hover/item:scale-105 origin-left">
                                        {project?.details.action}
                                    </p>
                                </section>

                                {/* Result */}
                                <section className="space-y-3 group/item cursor-default">
                                    <div className="flex items-center gap-3 text-green-400 transition-all duration-300 group-hover/item:scale-110 origin-left">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Result</h3>
                                    </div>
                                    <p className="text-lg text-gray-300 leading-relaxed font-light transition-all duration-500 group-hover/item:text-white group-hover/item:scale-105 origin-left">
                                        {project?.details.result}
                                    </p>
                                </section>
                            </div>

                            {/* Right Column: Tech Stack */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-sm sticky top-4 transition-all duration-500 hover:bg-white/10 hover:border-white/20 group/stack">
                                    <div className="flex items-center gap-3 text-white mb-4 transition-transform duration-300 group-hover/stack:translate-x-1">
                                        <Rocket className="w-4 h-4 text-cyan-400" />
                                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Tech Stack</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project?.details.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-white/10 border border-white/10 rounded-md text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:scale-110 hover:-translate-y-1 cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
