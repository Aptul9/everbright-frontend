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

  const next = useCallback(() => {
    if (playlist.length === 0) return
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
  }, [playlist.length])

  const prev = useCallback(() => {
    if (playlist.length === 0) return
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }, [playlist.length])

  // Initialize persistent audio and analyser
  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.crossOrigin = "anonymous"
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
      if (playlist.length > 1) {
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
  }, [playlist.length, next])

  // Setup Web Audio API
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextClass()
      const analyserNode = context.createAnalyser()
      analyserNode.fftSize = 256

      const source = context.createMediaElementSource(audioRef.current)
      source.connect(analyserNode)
      analyserNode.connect(context.destination)

      audioContextRef.current = context
      analyserRef.current = analyserNode
      sourceRef.current = source
      setAnalyser(analyserNode)
    }

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume()
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

  // Handle Track Changes
  useEffect(() => {
    if (playlist.length === 0 || !audioRef.current) return

    const track = playlist[currentSongIndex]
    if (!track) return

    // Only update if source changed
    const currentSrc = new URL(audioRef.current.src, window.location.origin).pathname
    if (currentSrc !== track.file) {
      const wasPlaying = isPlaying
      audioRef.current.src = track.file
      if (wasPlaying) {
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
        play()
      }
    } else {
      document.body.classList.remove('thai-mode')
      hasAutoPlayedRef.current = false
      pause()
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
        services: 'I NOSTRI SERVIZI',
        projects: 'I NOSTRI PROGETTI',
        contact: 'CONTATTACI',
        details: 'DETTAGLI',
        send: 'INVIA MESSAGGIO',
      },
    audio: {
      isPlaying,
      currentSong: playlist[currentSongIndex]?.name || 'Loading...',
      playlist,
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      playTrack,
      currentTime: progress.current,
      duration: progress.duration,
      analyser: analyser
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
