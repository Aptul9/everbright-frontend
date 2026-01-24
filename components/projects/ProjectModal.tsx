'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle2, FlaskConical, Target, Rocket, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsVisible(true), 10)
            document.body.style.overflow = 'hidden'
            return () => clearTimeout(timer)
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
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
                    'relative w-full max-w-5xl h-auto md:h-[600px] overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[30px] shadow-2xl transition-all duration-500 flex flex-col md:flex-row shadow-cyan-900/20',
                    isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 bg-black/20 hover:bg-white/10 rounded-full backdrop-blur-md"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Visual & Title */}
                <div className="relative w-full md:w-[40%] h-48 md:h-full">
                    <Image
                        src={project?.image || ''}
                        alt={project?.title || ''}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent opacity-90" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start space-y-4">
                        <div className="group/title cursor-default space-y-4 transition-transform duration-300 hover:scale-105 origin-bottom-left">
                            <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-cyan-500 text-black rounded-full transition-all duration-300 group-hover/title:bg-white">
                                {project?.category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-tight transition-colors duration-300 group-hover/title:text-cyan-400">
                                {project?.title}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-black/40 backdrop-blur-sm overflow-hidden">
                    <div className="space-y-6 md:space-y-8">
                        {/* Situation */}
                        <div className="space-y-2 group/item cursor-default">
                            <div className="flex items-center gap-2 text-cyan-400 transition-all duration-300 group-hover/item:text-cyan-300 group-hover/item:scale-110 origin-left">
                                <Target className="w-4 h-4" />
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Situation</h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed font-light transition-all duration-500 group-hover/item:text-white group-hover/item:scale-[1.02] origin-left line-clamp-3">
                                {project?.details.situation}
                            </p>
                        </div>

                        {/* Action & Result */}
                        <div className="space-y-2 group/item cursor-default">
                            <div className="flex items-center gap-2 text-purple-400 transition-all duration-300 group-hover/item:text-purple-300 group-hover/item:scale-110 origin-left">
                                <FlaskConical className="w-4 h-4" />
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Solution & Result</h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed font-light transition-all duration-500 group-hover/item:text-white group-hover/item:scale-[1.02] origin-left line-clamp-4">
                                {project?.details.action} {project?.details.result}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4 pt-4 border-t border-white/5 group/stack cursor-default">
                            <div className="flex items-center gap-2 text-white transition-all duration-300 group-hover/stack:text-cyan-400 group-hover/stack:scale-110 origin-left">
                                <Rocket className="w-4 h-4 text-cyan-400" />
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Tech Stack</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 transition-transform duration-300 group-hover/stack:scale-[1.02] origin-left">
                                {project?.details.techStack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-md text-gray-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 hover:scale-110"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Button */}
                    <button
                        onClick={onContact}
                        className="w-full mt-6 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold tracking-wider uppercase hover:bg-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 group/btn shrink-0"
                    >
                        <span>CONTATTACI</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}
