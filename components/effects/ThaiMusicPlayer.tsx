'use client'

import { useThaiData } from '@/lib/thai-context'
import { Play, Pause, SkipBack, SkipForward, Music, List, Search, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useMemo, useEffect, useRef } from 'react'

function SoundVisualizer({ analyser, isPlaying }: { analyser: AnalyserNode | null, isPlaying: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const requestRef = useRef<number>(0)

    useEffect(() => {
        if (!analyser || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set higher resolution for the canvas
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const draw = () => {
            requestRef.current = requestAnimationFrame(draw)
            analyser.getByteFrequencyData(dataArray)

            ctx.clearRect(0, 0, rect.width, rect.height)

            const totalBars = 64 // Use a fixed number of bars for better distribution
            const barWidth = (rect.width / totalBars) * 0.8
            const gap = (rect.width / totalBars) * 0.2

            let x = 0

            for (let i = 0; i < totalBars; i++) {
                // Map the frequency data to our restricted bar count
                const dataIndex = Math.floor((i / totalBars) * (bufferLength / 2))
                const value = dataArray[dataIndex]
                const barHeight = (value / 255) * rect.height * 0.8

                // Vibrant cyan gradient for bars
                const gradient = ctx.createLinearGradient(0, rect.height, 0, 0)
                gradient.addColorStop(0, '#22d3ee11')
                gradient.addColorStop(0.5, '#22d3ee66')
                gradient.addColorStop(1, '#22d3eeaa')

                ctx.fillStyle = gradient

                // Add glow to bars
                ctx.shadowBlur = 10
                ctx.shadowColor = '#22d3ee66'

                // Draw rounded rect (simplified for canvas)
                ctx.beginPath()
                ctx.roundRect(x, rect.height - barHeight, barWidth, barHeight, [2, 2, 0, 0])
                ctx.fill()

                // Reset shadow for next bar performance
                ctx.shadowBlur = 0

                x += barWidth + gap
            }
        }

        if (isPlaying) {
            draw()
        } else {
            ctx.clearRect(0, 0, rect.width, rect.height)
        }

        return () => cancelAnimationFrame(requestRef.current)
    }, [analyser, isPlaying])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0 rounded-2xl"
        />
    )
}

export function ThaiMusicPlayer() {
    const { isThai, audio } = useThaiData()
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null)

    const filteredPlaylist = useMemo(() => {
        return audio.playlist
            .map((track, index) => ({ ...track, originalIndex: index }))
            .filter(track => track.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [audio.playlist, searchQuery])

    const handleDragStart = (e: React.DragEvent, index: number) => {
        if (searchQuery) return // Disable reordering during search to avoid confusion
        setDraggedItemIndex(index)
        e.dataTransfer.effectAllowed = 'move'
        // Add a ghost image or effect if desired
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (draggedItemIndex === null || draggedItemIndex === index) return

        // Reorder playlist on the fly for visual feedback
        const newPlaylist = [...audio.playlist]
        const item = newPlaylist.splice(draggedItemIndex, 1)[0]
        newPlaylist.splice(index, 0, item)

        audio.setPlaylist(newPlaylist)
        setDraggedItemIndex(index)
    }

    const handleDragEnd = () => {
        setDraggedItemIndex(null)
    }

    if (!isThai) return null

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="group/player relative transition-all duration-500 hover:scale-[1.02]">
                {/* Playlist Dropdown */}
                {showPlaylist && (
                    <div className="absolute bottom-[calc(100%+12px)] left-0 w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between gap-4">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase shrink-0 transition-all duration-300 hover:tracking-[0.4em] hover:text-white cursor-default">
                                Playlist
                            </p>
                            <div className="relative flex-1 group/search-box">
                                <div className={cn(
                                    "relative w-full overflow-hidden rounded-lg border transition-all duration-300 bg-white/5 border-white/10 scale-100",
                                    "group-hover/search-box:scale-[1.02] group-hover/search-box:bg-white/10 group-hover/search-box:border-cyan-400/30 group-hover/search-box:shadow-[0_0_15px_rgba(34,211,238,0.2)]",
                                    "focus-within:scale-[1.02] focus-within:bg-white/10 focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                )}>
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover/search-box:translate-x-full focus-within:translate-x-full duration-[0.8s] ease-in-out bg-linear-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none" />

                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 group-hover/search-box:text-cyan-400 group-focus-within/search-box:text-cyan-400 transition-colors z-10" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Cerca canzone..."
                                        className="w-full bg-transparent py-1.5 pl-7 pr-2 text-[11px] text-white placeholder:text-white/20 focus:outline-none transition-all font-medium relative z-10"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {filteredPlaylist.length > 0 ? (
                                filteredPlaylist.map((track, index) => (
                                    <div
                                        key={track.id}
                                        draggable={!searchQuery}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragEnd={handleDragEnd}
                                        className={cn(
                                            "flex items-center group/item transition-colors",
                                            draggedItemIndex === index ? "opacity-30" : "opacity-100",
                                            audio.currentSong === track.name ? "bg-cyan-400/10" : "hover:bg-white/5"
                                        )}
                                    >
                                        {!searchQuery && (
                                            <div className="pl-3 py-3 cursor-grab active:cursor-grabbing text-white/20 group-hover/item:text-white/40">
                                                <GripVertical className="w-4 h-4" />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => {
                                                audio.playTrack(track.originalIndex)
                                                setShowPlaylist(false)
                                            }}
                                            className={cn(
                                                "flex-1 px-3 py-3 text-left text-sm transition-all flex items-center justify-between group/track",
                                                audio.currentSong === track.name
                                                    ? "text-cyan-400"
                                                    : "text-white/70 hover:text-white"
                                            )}
                                        >
                                            <span className={cn(
                                                "font-medium truncate mr-2 transition-all duration-300",
                                                "group-hover/track:text-cyan-400 group-hover/track:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover/track:translate-x-1"
                                            )}>
                                                {track.name}
                                            </span>
                                            {audio.currentSong === track.name && (
                                                <div className="flex gap-0.5 items-center shrink-0">
                                                    <div className="w-1 h-3 bg-cyan-400 animate-[pulse_0.8s_infinite]" />
                                                    <div className="w-1 h-2 bg-cyan-400 animate-[pulse_1s_infinite]" />
                                                    <div className="w-1 h-3 bg-cyan-400 animate-[pulse_1.2s_infinite]" />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center bg-white/5">
                                    <p className="text-white/30 text-xs font-medium italic">Nessun brano trovato</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Glow Background (Stronger and Always slightly visible) */}
                <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-3xl transition-all duration-500 group-hover/player:bg-cyan-500/30" />

                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center gap-6 min-w-[340px] relative z-10 hover:border-white/40 transition-all duration-500 overflow-hidden">
                    {/* Background Visualizer */}
                    <SoundVisualizer analyser={audio.analyser} isPlaying={audio.isPlaying} />

                    {/* Album Art / Playlist Toggle */}
                    <button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 active:scale-95 group/icon z-10",
                            showPlaylist ? "bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]" : "bg-white/10 hover:bg-white/20"
                        )}
                    >
                        {showPlaylist ? (
                            <List className="w-6 h-6 text-black relative z-10" />
                        ) : (
                            <Music className="w-6 h-6 text-cyan-400 relative z-10 group-hover/icon:scale-110 transition-transform" />
                        )}
                        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent" />
                    </button>

                    {/* Info & Controls */}
                    <div className="flex-1 space-y-3">
                        <div className="group/info cursor-default">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase opacity-80 mb-1 transition-all duration-500 group-hover/info:tracking-[0.4em] group-hover/info:text-white">
                                Now Playing
                            </p>
                            <div className="relative">
                                <p className="text-white text-base font-bold truncate tracking-tight transition-all duration-500 group-hover/info:scale-105 group-hover/info:text-cyan-400 group-hover/info:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] origin-left">
                                    {audio.currentSong}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={audio.prev}
                                className="text-white/50 hover:text-white transition-all transform hover:scale-120 active:scale-90"
                            >
                                <SkipBack className="w-5 h-5 fill-current" />
                            </button>

                            <button
                                onClick={audio.toggle}
                                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]"
                            >
                                {audio.isPlaying ? (
                                    <Pause className="w-5 h-5 fill-current" />
                                ) : (
                                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                                )}
                            </button>

                            <button
                                onClick={audio.next}
                                className="text-white/50 hover:text-white transition-all transform hover:scale-120 active:scale-90"
                            >
                                <SkipForward className="w-5 h-5 fill-current" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 cursor-pointer group/progress transition-all hover:h-2.5 overflow-hidden rounded-b-2xl"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const percentage = Math.max(0, Math.min(1, x / rect.width));
                            audio.seek(percentage * audio.duration);
                        }}
                    >
                        <div className="absolute inset-0 bg-white/5 group-hover/progress:bg-white/20 transition-colors" />
                        <div
                            className="h-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] transition-all duration-300 relative z-10"
                            style={{ width: `${(audio.currentTime / audio.duration) * 100 || 0}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white/40 blur-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
