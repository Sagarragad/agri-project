'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

// Generate image paths - 32 pages (0001 to 0032, skipping 0015 if missing)
const generateImagePaths = () => {
  const images = []
  for (let i = 1; i <= 32; i++) {
    const pageNum = String(i).padStart(4, '0')
    images.push(`/ilovepdf_pages-to-jpg/RAGAD SIR_page-${pageNum}.jpg`)
  }
  return images
}

const IMAGES = generateImagePaths()
const SLIDE_INTERVAL = 5000 // 5 seconds

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev: number) => (prev + 1) % IMAGES.length)
    setProgress(0)
  }, [])

  // Previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev: number) => (prev - 1 + IMAGES.length) % IMAGES.length)
    setProgress(0)
  }, [])

  // Start auto-slide
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (progressRef.current) {
      clearInterval(progressRef.current)
    }

    intervalRef.current = setInterval(() => {
      nextSlide()
    }, SLIDE_INTERVAL)

    // Progress bar animation
    let elapsed = 0
    progressRef.current = setInterval(() => {
      elapsed += 50
      const newProgress = (elapsed / SLIDE_INTERVAL) * 100
      setProgress(Math.min(newProgress, 100))
    }, 50)
  }, [nextSlide])

  // Stop auto-slide
  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (progressRef.current) {
      clearInterval(progressRef.current)
      progressRef.current = null
    }
  }, [])

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying((prev: boolean) => {
      const newState = !prev
      if (newState) {
        startAutoSlide()
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch((error) => {
            console.log('Audio play failed:', error)
          })
        }
      } else {
        stopAutoSlide()
        if (audioRef.current) {
          audioRef.current.pause()
        }
      }
      return newState
    })
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted((prev: boolean) => {
      const newState = !prev
      if (audioRef.current) {
        audioRef.current.muted = newState
        if (!newState && isPlaying) {
          // Unmute and play if slideshow is playing
          audioRef.current.play().catch((error) => {
            console.log('Audio play failed:', error)
          })
        }
      }
      return newState
    })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
        if (isPlaying) {
          stopAutoSlide()
          startAutoSlide()
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
        if (isPlaying) {
          stopAutoSlide()
          startAutoSlide()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, isPlaying, startAutoSlide, stopAutoSlide])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      if (isPlaying) {
        stopAutoSlide()
        startAutoSlide()
      }
    }
  }

  // Initialize auto-slide and audio
  useEffect(() => {
    if (isPlaying) {
      startAutoSlide()
    }
    return () => {
      stopAutoSlide()
    }
  }, [isPlaying, startAutoSlide, stopAutoSlide])

  // Initialize audio on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && isPlaying && !isMuted) {
        audioRef.current.play().catch((error) => {
          console.log('Audio play failed:', error)
        })
      }
    }

    // Try to play on any user interaction
    window.addEventListener('click', handleUserInteraction, { once: true })
    window.addEventListener('touchstart', handleUserInteraction, { once: true })
    window.addEventListener('keydown', handleUserInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
    }
  }, [isPlaying, isMuted])

  // Handle image load
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev: Set<number>) => {
      const newSet = new Set(prev)
      newSet.add(index)
      return newSet
    })
  }

  // Preload next image
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nextIndex = (currentIndex + 1) % IMAGES.length
      const img = new window.Image()
      img.src = IMAGES[nextIndex]
    }
  }, [currentIndex])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Agricultural Knowledge Hub</h1>
        <div className={styles.controls}>
          <button
            onClick={togglePlayPause}
            className={styles.controlBtn}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <span className={styles.icon}>⏸</span>
            ) : (
              <span className={styles.icon}>▶</span>
            )}
          </button>
          <button
            onClick={toggleMute}
            className={styles.controlBtn}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <span className={styles.icon}>🔇</span>
            ) : (
              <span className={styles.icon}>🔊</span>
            )}
          </button>
        </div>
      </header>

      <div
        className={styles.slideshowContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.imageWrapper}>
          {!imagesLoaded.has(currentIndex) && (
            <div className={styles.loading}>Loading...</div>
          )}
          <Image
            src={IMAGES[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className={`${styles.slideImage} ${imagesLoaded.has(currentIndex) ? 'fade-in' : ''}`}
            priority={currentIndex === 0}
            quality={85}
            onLoad={() => handleImageLoad(currentIndex)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
          />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className={`${styles.navButton} ${styles.navButtonRight}`}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Page indicator */}
        <div className={styles.pageInfo}>
          <span>{currentIndex + 1}</span> / <span>{IMAGES.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Background music */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        preload="auto"
        className={styles.audio}
      >
        <source src="/ilovepdf_pages-to-jpg/agricultural-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

