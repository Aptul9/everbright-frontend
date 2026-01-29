'use client'

import { useThaiData, type ThaiContextType } from '@/lib/thai-context'
import { Play, Pause, SkipBack, SkipForward, Music, List, Search, GripVertical, RotateCcw, Volume2, Shuffle, Repeat, Zap, Disc, Waves } from 'lucide-react'
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

function DiscoMixer({ audio }: { audio: ThaiContextType['audio'] }) {
    return (
        <div className="absolute bottom-[calc(100%+16px)] right-0 bg-[#0a0a0a]/98 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] animate-in fade-in slide-in-from-bottom-3 duration-300 max-h-[70vh] overflow-y-auto w-[650px]">
            {/* Horizontal Layout Container */}

            <div className="flex gap-6 mt-2">
                {/* Left Column: Header + Volume + Modes */}
                <div className="flex flex-col gap-4 w-48">
                    {/* Pro Header */}

                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            <div>
                                <p className="text-[9px] font-black tracking-[0.2em] text-white uppercase">X-MIXER PRO</p>
                                <p className="text-[6px] font-medium text-cyan-400/50 tracking-widest">ANALOG DECK v2.0</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                audio.setPitch(1.0); audio.setEQ('bass', 0); audio.setEQ('mid', 0); audio.setEQ('treble', 0);
                                audio.setVolume(0.8); audio.setFilter('lowPass', 20000); audio.setFilter('highPass', 0); audio.setFilter('reverb', 0);
                            }}
                            className="p-1.5 hover:bg-white/5 rounded-full transition-all group/reset"
                        >
                            <RotateCcw className="w-3 h-3 text-white/40 group-hover/reset:text-cyan-400 group-hover/reset:rotate-[-90deg] transition-all" />
                        </button>
                    </div>

                    {/* Master Volume */}
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="flex justify-between items-center text-[7px] uppercase font-black text-white/40 tracking-widest mb-2">
                            <div className="flex items-center gap-1.5">
                                <Volume2 className="w-3 h-3 text-cyan-400" />
                                <span>Volume</span>
                            </div>
                            <span className="text-white text-[9px] font-mono">{(audio.volume * 100).toFixed(0)}%</span>
                        </div>
                        <input type="range" min="0" max="1" step="0.01" value={audio.volume} onChange={(e) => audio.setVolume(parseFloat(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400" />
                    </div>

                    {/* Playback Modes */}
                    <div className="flex gap-2">
                        <button
                            onClick={audio.toggleShuffle}
                            className={cn(
                                "flex-1 py-2 rounded-lg border text-[8px] font-black uppercase transition-all flex items-center justify-center gap-1",
                                audio.isShuffle ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-white/30 hover:bg-white/10"
                            )}
                        >
                            <Shuffle className="w-3 h-3" />
                            Shfl
                        </button>
                        <button
                            onClick={audio.toggleRepeat}
                            className={cn(
                                "flex-1 py-2 rounded-lg border text-[8px] font-black uppercase transition-all flex items-center justify-center gap-1",
                                audio.repeatMode !== 'none' ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-white/30 hover:bg-white/10"
                            )}
                        >
                            <Repeat className="w-3 h-3" />
                            {audio.repeatMode === 'one' ? '1' : audio.repeatMode === 'all' ? 'All' : 'Rpt'}
                        </button>
                    </div>

                    {/* Master BPM */}
                    <div className="bg-cyan-500/5 rounded-xl p-3 border border-cyan-500/10 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <Disc className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                        </div>
                        <div>
                            <p className="text-[6px] uppercase font-black text-cyan-400/50">Master</p>
                            <div className="flex items-center gap-2">
                                <p className="text-[11px] font-mono font-bold text-white tracking-widest">{audio.bpm} BPM</p>
                                <div className="px-1 py-0.5 rounded-[3px] bg-cyan-500/20 text-[6px] font-black text-cyan-300">SYNC</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Column: EQ + Pitch */}
                <div className="flex flex-col gap-3 border-l border-white/5 pl-6">
                    <p className="text-[7px] font-black tracking-[0.2em] text-white/30 uppercase">Equalizer</p>
                    <div className="flex gap-5">
                        {/* Pitch Fader */}
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[6px] uppercase font-black text-white/30">Pitch</span>
                            <div className="relative w-6 h-28 bg-white/5 rounded-full border border-white/5 flex flex-col items-center py-2 group/pitch">
                                <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none flex flex-col justify-between items-center py-2 opacity-20">
                                    {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className="w-2 h-[1px] bg-white" />)}
                                </div>
                                <input
                                    type="range" min="0.5" max="1.5" step="0.01"
                                    value={audio.pitch}
                                    onChange={(e) => audio.setPitch(parseFloat(e.target.value))}
                                    className="appearance-none w-full h-full bg-transparent cursor-pointer accent-cyan-400 [writing-mode:vertical-lr] [direction:rtl]"
                                />
                            </div>
                            <span className="text-[8px] font-mono text-cyan-400">{(audio.pitch * 100).toFixed(0)}%</span>
                        </div>

                        {/* EQ Knobs */}
                        <div className="flex flex-col gap-2">
                            {[
                                { id: 'treble', label: 'Hi', value: audio.eq.treble, color: 'rgb(34, 211, 238)' },
                                { id: 'mid', label: 'Md', value: audio.eq.mid, color: 'rgb(168, 85, 247)' },
                                { id: 'bass', label: 'Lo', value: audio.eq.bass, color: 'rgb(239, 68, 68)' }
                            ].map((knob) => (
                                <div key={knob.id} className="flex items-center gap-2">
                                    <div className="relative group/knob">
                                        <input
                                            type="range" min="-24" max="24" step="1"
                                            value={knob.value}
                                            onChange={(e) => audio.setEQ(knob.id as 'bass' | 'mid' | 'treble', parseFloat(e.target.value))}
                                            className="w-8 h-8 absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center transition-all group-hover/knob:border-cyan-400/50">
                                            <div
                                                className="w-0.5 h-2 bg-cyan-400 rounded-full origin-bottom transition-transform duration-100"
                                                style={{
                                                    transform: `rotate(${(knob.value / 24) * 120}deg)`,
                                                    backgroundColor: knob.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[6px] uppercase font-black text-white/30">{knob.label}</span>
                                        <span className="text-[8px] font-mono text-white/60">{knob.value > 0 ? `+${knob.value}` : knob.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Filters + Hot Cues */}
                <div className="flex flex-col gap-3 border-l border-white/5 pl-6 w-[180px]">
                    <p className="text-[7px] font-black tracking-[0.2em] text-white/30 uppercase">FX Filters</p>

                    <div className="space-y-2">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[6px] uppercase font-black text-white/40">
                                <span>LowPass</span>
                                <span className="text-cyan-400">{(audio.filters.lowPass / 1000).toFixed(1)}k</span>
                            </div>
                            <input type="range" min="100" max="20000" step="100" value={audio.filters.lowPass} onChange={(e) => audio.setFilter('lowPass', parseFloat(e.target.value))} className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-400" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[6px] uppercase font-black text-white/40">
                                <span>HiPass</span>
                                <span className="text-cyan-400">{audio.filters.highPass}Hz</span>
                            </div>
                            <input type="range" min="0" max="5000" step="50" value={audio.filters.highPass} onChange={(e) => audio.setFilter('highPass', parseFloat(e.target.value))} className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-400" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[6px] uppercase font-black text-white/40">
                                <span>Reverb</span>
                                <Waves className="w-2 h-2 text-purple-400" />
                            </div>
                            <input type="range" min="0" max="0.8" step="0.01" value={audio.filters.reverb} onChange={(e) => audio.setFilter('reverb', parseFloat(e.target.value))} className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-400" />
                        </div>
                    </div>

                    {/* Hot Cues */}
                    <div className="mt-auto pt-2 border-t border-white/5">
                        <div className="flex justify-between items-center text-[6px] uppercase font-black text-white/40 mb-2">
                            <span>Hot Cues</span>
                            <Zap className="w-2 h-2 text-yellow-400" />
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                            {audio.cues.map((cue: number | null, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => audio.setCue(i)}
                                    className={cn(
                                        "aspect-square rounded border text-[8px] font-black transition-all active:scale-95 flex items-center justify-center",
                                        cue !== null
                                            ? "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                                            : "bg-white/5 border-white/10 text-white/20 hover:bg-white/10 hover:border-white/30"
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function ThaiMusicPlayer() {
    const { isThai, audio } = useThaiData()
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [showMixer, setShowMixer] = useState(false)
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

                {/* Mixer Extension (Opens above) */}
                {showMixer && <DiscoMixer audio={audio} />}



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

                {/* Mixer Protruding Triangle Trigger - Opens LEFT */}
                <button
                    onClick={() => {
                        setShowMixer(!showMixer)
                        if (showPlaylist) setShowPlaylist(false)
                    }}
                    className={cn(
                        "absolute left-0 top-1/2 -translate-x-[12px] -translate-y-1/2 w-4 h-12 transition-all duration-500 z-[5]",
                        "hover:-translate-x-[16px] active:scale-95 group/triangle"
                    )}
                >
                    <div className={cn(
                        "w-full h-full bg-white/20 backdrop-blur-xl border-l border-y border-white/30 transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                        "group-hover/triangle:bg-cyan-500 group-hover/triangle:border-cyan-400 group-hover/triangle:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
                        showMixer && "bg-red-500 border-red-400 -translate-x-1 shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                    )}
                        style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                    {/* Internal Glow Dot */}
                    <div className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300",
                        showMixer ? "bg-white" : "bg-cyan-400 group-hover/triangle:scale-150"
                    )} />
                </button>



                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center gap-6 min-w-[340px] relative z-10 hover:border-white/40 transition-all duration-500 overflow-hidden">
                    {/* Background Visualizer */}
                    <SoundVisualizer analyser={audio.analyser} isPlaying={audio.isPlaying} />

                    {/* Playlist Toggle Icon */}
                    <button
                        onClick={() => {
                            setShowPlaylist(!showPlaylist)
                            if (showMixer) setShowMixer(false)
                        }}
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
                    <div className="flex-1 space-y-3 z-10 min-w-0">
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
