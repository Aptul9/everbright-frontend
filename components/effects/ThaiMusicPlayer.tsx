'use client'

import { useThaiData } from '@/lib/thai-context'
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThaiMusicPlayer() {
    const { isThai, audio } = useThaiData()

    if (!isThai) return null

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="group/player relative transition-all duration-500 hover:scale-105">
                {/* Glow Background (Site's common effect) */}
                <div className="absolute inset-0 bg-cyan-500/0 rounded-2xl blur-2xl transition-all duration-500 group-hover/player:bg-cyan-500/20" />

                <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-6 min-w-[300px] relative z-10 hover:border-white/20 transition-colors">
                    {/* Album Art / Icon */}
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center relative overflow-hidden group/icon">
                        <div className="absolute inset-0 bg-cyan-500/20 animate-pulse" />
                        <Music className="w-6 h-6 text-cyan-400 relative z-10 group-hover/icon:scale-110 transition-transform" />
                    </div>

                    {/* Info & Controls */}
                    <div className="flex-1 space-y-2">
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase opacity-70">
                                Now Playing
                            </p>
                            <div className="relative">
                                <p className="text-white text-sm font-bold truncate pr-4">
                                    {audio.currentSong}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={audio.prev}
                                className="text-white/40 hover:text-white transition-colors active:scale-90"
                                aria-label="Previous song"
                            >
                                <SkipBack className="w-4 h-4" />
                            </button>

                            <button
                                onClick={audio.toggle}
                                className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                                aria-label={audio.isPlaying ? 'Pause' : 'Play'}
                            >
                                {audio.isPlaying ? (
                                    <Pause className="w-4 h-4 fill-current" />
                                ) : (
                                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                                )}
                            </button>

                            <button
                                onClick={audio.next}
                                className="text-white/40 hover:text-white transition-colors active:scale-90"
                                aria-label="Next song"
                            >
                                <SkipForward className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 cursor-pointer group/progress transition-all hover:h-3"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const percentage = Math.max(0, Math.min(1, x / rect.width));
                            audio.seek(percentage * audio.duration);
                        }}
                    >
                        {/* Progress Background track */}
                        <div className="absolute inset-0 bg-white/10 group-hover/progress:bg-white/20 transition-colors" />

                        <div
                            className="h-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] transition-all duration-300 relative z-10"
                            style={{ width: `${(audio.currentTime / audio.duration) * 100 || 0}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-[0_0_15px_white] z-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
