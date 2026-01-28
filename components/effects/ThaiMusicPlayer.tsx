'use client'

import { useThaiData } from '@/lib/thai-context'
import { Play, Pause, SkipBack, SkipForward, Music, List, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useMemo } from 'react'

export function ThaiMusicPlayer() {
    const { isThai, audio } = useThaiData()
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredPlaylist = useMemo(() => {
        return audio.playlist
            .map((track, index) => ({ ...track, originalIndex: index }))
            .filter(track => track.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [audio.playlist, searchQuery])

    if (!isThai) return null

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="group/player relative transition-all duration-500 hover:scale-[1.02]">
                {/* Playlist Dropdown */}
                {showPlaylist && (
                    <div className="absolute bottom-[calc(100%+12px)] left-0 w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between gap-4">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase shrink-0">Playlist</p>
                            <div className="relative flex-1 group/search">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 group-focus-within/search:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cerca canzone..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-1 pl-7 pr-2 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {filteredPlaylist.length > 0 ? (
                                filteredPlaylist.map((track) => (
                                    <button
                                        key={track.id}
                                        onClick={() => {
                                            audio.playTrack(track.originalIndex)
                                            setShowPlaylist(false)
                                        }}
                                        className={cn(
                                            "w-full px-4 py-3 text-left text-sm transition-all flex items-center justify-between group/track",
                                            audio.currentSong === track.name
                                                ? "text-cyan-400 bg-cyan-400/20"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <span className="font-medium truncate mr-2">{track.name}</span>
                                        {audio.currentSong === track.name && (
                                            <div className="flex gap-0.5 items-center shrink-0">
                                                <div className="w-1 h-3 bg-cyan-400 animate-[pulse_0.8s_infinite]" />
                                                <div className="w-1 h-2 bg-cyan-400 animate-[pulse_1s_infinite]" />
                                                <div className="w-1 h-3 bg-cyan-400 animate-[pulse_1.2s_infinite]" />
                                            </div>
                                        )}
                                    </button>
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

                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] flex items-center gap-6 min-w-[340px] relative z-10 hover:border-white/40 transition-all duration-500">
                    {/* Album Art / Playlist Toggle */}
                    <button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 active:scale-95 group/icon",
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
