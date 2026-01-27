'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { servicesData, projectsData } from './data'
import { thaiServicesData, thaiProjectsData } from './thai-data'

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
    play: () => void
    pause: () => void
    toggle: () => void
    next: () => void
    prev: () => void
    seek: (time: number) => void
    currentTime: number
    duration: number
  }
}

const ThaiContext = createContext<ThaiContextType | undefined>(undefined)

const PLAYLIST = [
  { name: 'Forfettaria Superstar', file: '/Forfettaria Superstar.mp3' },
  // Add more here if needed
]

export function ThaiProvider({ children }: { children: React.ReactNode }) {
  const [isThai, setIsThai] = useState(false)
  const [, setInput] = useState('')
  const lastToggleRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [progress, setProgress] = useState({ current: 0, duration: 0 })

  useEffect(() => {
    audioRef.current = new Audio(PLAYLIST[currentSongIndex].file)
    audioRef.current.loop = true

    const updateProgress = () => {
      if (audioRef.current) {
        setProgress({
          current: audioRef.current.currentTime,
          duration: audioRef.current.duration || 0,
        })
      }
    }

    audioRef.current.addEventListener('timeupdate', updateProgress)
    audioRef.current.addEventListener('loadedmetadata', updateProgress)
    audioRef.current.addEventListener('ended', () => {
      if (PLAYLIST.length > 1) {
        next()
      } else {
        setIsPlaying(false)
      }
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress)
        audioRef.current.removeEventListener('loadedmetadata', updateProgress)
        audioRef.current.pause()
      }
    }
  }, [currentSongIndex])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.error('Audio play failed:', e))
      setIsPlaying(true)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggle = () => (isPlaying ? pause() : play())

  const next = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length)
    if (isPlaying) setTimeout(play, 100)
  }

  const prev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)
    if (isPlaying) setTimeout(play, 100)
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress((prev) => ({ ...prev, current: time }))
    }
  }

  useEffect(() => {
    if (isThai) {
      document.body.classList.add('thai-mode')
      // Resume if it was playing, or start if first time
      if (!isPlaying) {
        play()
      }
    } else {
      document.body.classList.remove('thai-mode')
      // Pause when exiting Thai mode
      pause()
      // Note: We don't reset currentTime here, so it resumes from same spot next time
    }
  }, [isThai])

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
      currentSong: PLAYLIST[currentSongIndex].name,
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      currentTime: progress.current,
      duration: progress.duration,
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
