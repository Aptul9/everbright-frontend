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
                    'relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-black/90 border border-white/20 rounded-[40px] shadow-2xl transition-all duration-500 flex flex-col',
                    isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 z-50 p-2 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Header Image */}
                    <div className="relative w-full h-64 md:h-96">
                        <Image
                            src={project?.image || ''}
                            alt={project?.title || ''}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-10 left-10 md:left-16">
                            <span className="px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase bg-cyan-500 text-black rounded-full mb-4 inline-block">
                                {project?.category}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                                {project?.title}
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 md:px-16 py-12 space-y-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Column: Details */}
                            <div className="lg:col-span-8 space-y-12">
                                {/* Situation */}
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 text-cyan-400">
                                        <Target className="w-5 h-5" />
                                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">Situation & Task</h3>
                                    </div>
                                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                                        {project?.details.situation}
                                    </p>
                                </section>

                                {/* Action */}
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 text-purple-400">
                                        <FlaskConical className="w-5 h-5" />
                                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">Action</h3>
                                    </div>
                                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                                        {project?.details.action}
                                    </p>
                                </section>

                                {/* Result */}
                                <section className="space-y-4">
                                    <div className="flex items-center gap-3 text-green-400">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">Result</h3>
                                    </div>
                                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                                        {project?.details.result}
                                    </p>
                                </section>
                            </div>

                            {/* Right Column: Tech Stack */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm sticky top-8">
                                    <div className="flex items-center gap-3 text-white mb-6">
                                        <Rocket className="w-5 h-5" />
                                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">Tech Stack</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project?.details.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/10 rounded-md text-gray-400"
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
