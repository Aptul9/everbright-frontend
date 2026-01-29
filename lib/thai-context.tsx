'use client'

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { servicesData, projectsData } from './data'
import { thaiServicesData, thaiProjectsData } from './thai-data'

interface Track {
  id: number
  name: string
  file: string
}

interface ThaiContextType {
  isThai: boolean
  setIsThai: (v: boolean) => void
  services: typeof servicesData
  projects: typeof projectsData
  labels: {
    services: string
    projects: string
    contact: string
    details: string
    send: string
  }
  audio: {
    isPlaying: boolean
    currentSong: string
    playlist: Track[]
    setPlaylist: (playlist: Track[]) => void
    play: () => void
    pause: () => void
    toggle: () => void
    next: () => void
    prev: () => void
    seek: (time: number) => void
    playTrack: (index: number) => void
    currentTime: number
    duration: number
    analyser: AnalyserNode | null
    pitch: number
    setPitch: (v: number) => void
    eq: { bass: number; mid: number; treble: number }
    setEQ: (type: 'bass' | 'mid' | 'treble', value: number) => void
    volume: number
    setVolume: (v: number) => void
    isShuffle: boolean
    toggleShuffle: () => void
    repeatMode: 'none' | 'one' | 'all'
    toggleRepeat: () => void
    // Advanced DJ FX
    filters: { lowPass: number; highPass: number; reverb: number }
    setFilter: (type: 'lowPass' | 'highPass' | 'reverb', value: number) => void
    bpm: number
    setBPM: (v: number) => void
    cues: (number | null)[]
    setCue: (index: number) => void
  }
}

const ThaiContext = createContext<ThaiContextType | undefined>(undefined)

export function ThaiProvider({ children }: { children: React.ReactNode }) {
  const [isThai, setIsThai] = useState(false)
  const [, setInput] = useState('')
  const lastToggleRef = useRef(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const [playlist, setPlaylist] = useState<Track[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [progress, setProgress] = useState({ current: 0, duration: 0 })
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)

  // Mixer & Advanced State
  const [pitch, setPitchState] = useState(1.0)
  const [eq, setEqState] = useState({ bass: 0, mid: 0, treble: 0 })
  const [volume, setVolumeState] = useState(0.8)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('all')

  // Advanced DJ State
  const [filters, setFiltersState] = useState({ lowPass: 20000, highPass: 0, reverb: 0 })
  const [bpm, setBpm] = useState(128)
  const [cues, setCues] = useState<(number | null)[]>([null, null, null, null])

  // Mixer Nodes
  const nodesRef = useRef<{
    low: BiquadFilterNode, mid: BiquadFilterNode, high: BiquadFilterNode,
    lp: BiquadFilterNode, hp: BiquadFilterNode,
    reverb: DelayNode, reverbGain: GainNode
  } | null>(null)

  const next = useCallback(() => {
    if (playlist.length === 0) return
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length)
      setCurrentSongIndex(randomIndex)
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
    }
  }, [playlist.length, isShuffle])

  const prev = useCallback(() => {
    if (playlist.length === 0) return
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }, [playlist.length])

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
  }, [])

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'none') return 'one'
      if (prev === 'one') return 'all'
      return 'none'
    })
  }, [])

  // Initialize persistent audio and analyser
  useEffect(() => {
    const audio = new Audio()
    audio.loop = false // Manual loop via 'ended'
    audio.crossOrigin = "anonymous"
    audio.volume = volume
    audioRef.current = audio

    const updateProgress = () => {
      setProgress({
        current: audio.currentTime,
        duration: audio.duration || 0,
      })
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play().catch(console.error)
      } else if (repeatMode === 'all' || playlist.length > 1) {
        next()
      } else {
        setIsPlaying(false)
      }
    }
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [playlist.length, next, repeatMode, volume])

  // Setup Web Audio API
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextClass()

      // EQ Nodes
      const low = context.createBiquadFilter()
      low.type = 'lowshelf'
      low.frequency.value = 200

      const mid = context.createBiquadFilter()
      mid.type = 'peaking'
      mid.frequency.value = 1000
      mid.Q.value = 1

      const high = context.createBiquadFilter()
      high.type = 'highshelf'
      high.frequency.value = 3000

      // LP/HP Filters
      const lp = context.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = filters.lowPass

      const hp = context.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = filters.highPass

      // Simple Reverb (Delay based)
      const reverb = context.createDelay(1.0)
      reverb.delayTime.value = 0.3
      const reverbGain = context.createGain()
      reverbGain.gain.value = filters.reverb

      reverb.connect(reverbGain)
      reverbGain.connect(reverb) // Feedback

      const analyserNode = context.createAnalyser()
      analyserNode.fftSize = 256

      const source = context.createMediaElementSource(audioRef.current)

      // Chain: Source -> EQ -> LP -> HP -> Reverb (Parallel) -> Analyser -> Destination
      source.connect(low)
      low.connect(mid)
      mid.connect(high)
      high.connect(lp)
      lp.connect(hp)

      // Reverb connection
      hp.connect(reverb)
      reverbGain.connect(analyserNode)

      hp.connect(analyserNode)
      analyserNode.connect(context.destination)

      audioContextRef.current = context
      analyserRef.current = analyserNode
      sourceRef.current = source
      nodesRef.current = { low, mid, high, lp, hp, reverb, reverbGain }
      setAnalyser(analyserNode)
    }

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }, [])

  const setPitch = useCallback((v: number) => {
    setPitchState(v)
    if (audioRef.current) {
      audioRef.current.playbackRate = v
    }
  }, [])

  const setEQ = useCallback((type: 'bass' | 'mid' | 'treble', value: number) => {
    setEqState(prev => ({ ...prev, [type]: value }))
    if (nodesRef.current) {
      const node = type === 'bass' ? nodesRef.current.low : type === 'mid' ? nodesRef.current.mid : nodesRef.current.high
      node.gain.value = value
    }
  }, [])

  const setFilter = useCallback((type: 'lowPass' | 'highPass' | 'reverb', value: number) => {
    setFiltersState(prev => ({ ...prev, [type]: value }))
    if (nodesRef.current) {
      if (type === 'lowPass') nodesRef.current.lp.frequency.value = value
      if (type === 'highPass') nodesRef.current.hp.frequency.value = value
      if (type === 'reverb') nodesRef.current.reverbGain.gain.value = value
    }
  }, [])

  const setCue = useCallback((index: number) => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime
      setCues(prev => {
        const next = [...prev]
        if (next[index] === null) {
          next[index] = currentTime
        } else {
          audioRef.current!.currentTime = next[index]!
        }
        return next
      })
    }
  }, [])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) {
      audioRef.current.volume = v
    }
  }, [])

  const play = useCallback(() => {
    if (audioRef.current) {
      initAudioContext()
      audioRef.current.play().catch((e) => console.error('Audio play failed:', e))
      setIsPlaying(true)
    }
  }, [initAudioContext])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress((prev) => ({ ...prev, current: time }))
    }
  }, [])

  const playTrack = useCallback((index: number) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
  }, [])

  // Fetch playlist on mount
  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlaylist(data)
        }
      })
      .catch(err => console.error('Failed to fetch playlist:', err))
  }, [])

  const isPlayingRef = useRef(isPlaying)
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Handle Track Changes
  useEffect(() => {
    if (playlist.length === 0 || !audioRef.current) return

    const track = playlist[currentSongIndex]
    if (!track) return

    // Normalizziamo il percorso corrente dell'audio per il confronto
    // Usiamo decodeURIComponent per gestire correttamente spazi (%20) e caratteri speciali
    const currentSrc = decodeURIComponent(new URL(audioRef.current.src, window.location.origin).pathname)

    if (currentSrc !== track.file) {
      audioRef.current.src = track.file
      if (isPlayingRef.current) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [currentSongIndex, playlist])

  // Handle Play/Pause sync
  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(console.error)
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const hasAutoPlayedRef = useRef(false)

  useEffect(() => {
    if (isThai) {
      document.body.classList.add('thai-mode')
      if (!hasAutoPlayedRef.current && playlist.length > 0) {
        hasAutoPlayedRef.current = true
        // Use a microtask/timeout to avoid "cascading renders" lint error
        const timer = setTimeout(() => play(), 0)
        return () => clearTimeout(timer)
      }
    } else {
      document.body.classList.remove('thai-mode')
      hasAutoPlayedRef.current = false
      setTimeout(() => pause(), 0)
    }
  }, [isThai, playlist.length, play, pause])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (!/^[a-z]$/.test(key)) return

      setInput((prev) => {
        const current = prev + key
        const lastFour = current.slice(-4)

        if (lastFour === 'thai') {
          const now = Date.now()
          if (now - lastToggleRef.current > 500) {
            lastToggleRef.current = now
            setIsThai((v) => !v)
          }
          return ''
        }
        return current.slice(-20)
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const value = {
    isThai,
    setIsThai,
    services: isThai ? thaiServicesData : servicesData,
    projects: isThai ? thaiProjectsData : projectsData,
    labels: isThai
      ? {
        services: 'บริการของเรา',
        projects: 'โครงการของเรา',
        contact: 'ติดต่อเรา',
        details: 'รายละเอียด',
        send: 'ส่งข้อความ',
      }
      : {
        services: 'SERVIZI',
        projects: 'PROGETTI',
        contact: 'CONTATTACI',
        details: 'DETTAGLI',
        send: 'INVIA MESSAGGIO',
      },
    audio: {
      isPlaying,
      currentSong: playlist[currentSongIndex]?.name || 'Loading...',
      playlist,
      setPlaylist: (newPlaylist: Track[]) => {
        const currentSong = playlist[currentSongIndex]
        setPlaylist(newPlaylist)
        if (currentSong) {
          const newIndex = newPlaylist.findIndex(t => t.id === currentSong.id)
          if (newIndex !== -1) setCurrentSongIndex(newIndex)
        }
      },
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      playTrack,
      currentTime: progress.current,
      duration: progress.duration,
      analyser: analyser,
      pitch,
      setPitch,
      eq,
      setEQ,
      volume,
      setVolume,
      isShuffle,
      toggleShuffle,
      repeatMode,
      toggleRepeat,
      filters,
      setFilter,
      bpm,
      setBPM: setBpm,
      cues,
      setCue
    },
  }

  return <ThaiContext.Provider value={value}>{children}</ThaiContext.Provider>
}

export function useThaiData() {
  const context = useContext(ThaiContext)
  if (context === undefined) {
    throw new Error('useThaiData must be used within a ThaiProvider')
  }
  return context
}
