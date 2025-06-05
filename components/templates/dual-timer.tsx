"use client"

import { useState, useEffect, useRef } from "react"
import { Confetti } from "@/components/magicui/confetti"
import { SplashScreen } from "@/components/molecules/splash-screen"
import { TimerPanel } from "@/components/organisms/timer-panel"

export default function DualTimer() {
  // Timer 1 (5 minutes - left)
  const [time1, setTime1] = useState(5 * 60) // 5 minutes in seconds
  const [isRunning1, setIsRunning1] = useState(false)
  const [isFinished1, setIsFinished1] = useState(false)
  const interval1 = useRef<NodeJS.Timeout | null>(null)

  // Timer 2 (3 minutes - right)
  const [time2, setTime2] = useState(3 * 60) // 3 minutes in seconds
  const [isRunning2, setIsRunning2] = useState(false)
  const [isFinished2, setIsFinished2] = useState(false)
  const interval2 = useRef<NodeJS.Timeout | null>(null)

  // Maximized state
  const [maximized, setMaximized] = useState<1 | 2 | null>(null)

  // Splash screen state
  const [showSplash, setShowSplash] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [pendingTimer, setPendingTimer] = useState<1 | 2 | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // UI visibility state
  const [showControls, setShowControls] = useState(true)
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null)

  // Mouse movement detection
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      // Clear existing timer
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }

      // Only hide controls if timers are running
      if (isRunning1 || isRunning2) {
        hideControlsTimer.current = setTimeout(() => {
          setShowControls(false)
        }, 3000) // Hide after 3 seconds of inactivity
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseMove)
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }
    }
  }, [isRunning1, isRunning2])

  // Show controls when timers stop
  useEffect(() => {
    if (!isRunning1 && !isRunning2) {
      setShowControls(true)
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }
    }
  }, [isRunning1, isRunning2])

  // Splash screen countdown effect
  useEffect(() => {
    if (showSplash && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (showSplash && countdown === 0) {
      // Trigger confetti when countdown reaches 0
      setShowConfetti(true)
      
      // Start the pending timer
      if (pendingTimer === 1) {
        setIsRunning1(true)
      } else if (pendingTimer === 2) {
        setIsRunning2(true)
      }

      // Hide splash screen
      setTimeout(() => {
        setShowSplash(false)
        setCountdown(3)
        setPendingTimer(null)
        
        // Hide confetti after a delay
        setTimeout(() => {
          setShowConfetti(false)
        }, 2000)
      }, 500)
    }
  }, [showSplash, countdown, pendingTimer])

  // Timer 1 logic (5 minutes)
  useEffect(() => {
    if (isRunning1 && time1 > 0) {
      interval1.current = setInterval(() => {
        setTime1((prev) => {
          if (prev <= 1) {
            setIsRunning1(false)
            setIsFinished1(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (interval1.current) clearInterval(interval1.current)
    }

    return () => {
      if (interval1.current) clearInterval(interval1.current)
    }
  }, [isRunning1, time1])

  // Timer 2 logic (3 minutes)
  useEffect(() => {
    if (isRunning2 && time2 > 0) {
      interval2.current = setInterval(() => {
        setTime2((prev) => {
          if (prev <= 1) {
            setIsRunning2(false)
            setIsFinished2(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (interval2.current) clearInterval(interval2.current)
    }

    return () => {
      if (interval2.current) clearInterval(interval2.current)
    }
  }, [isRunning2, time2])

  const handleStart1 = () => {
    if (isRunning1) {
      setIsRunning1(false)
    } else if (time1 === 5 * 60) {
      // Only show splash screen if timer is at initial state (not paused)
      setPendingTimer(1)
      setShowSplash(true)
      setCountdown(3)
    } else {
      // Resume without splash screen if timer was paused
      setIsRunning1(true)
    }
  }

  const handleReset1 = () => {
    setTime1(5 * 60)
    setIsRunning1(false)
    setIsFinished1(false)
  }

  const handleStart2 = () => {
    if (isRunning2) {
      setIsRunning2(false)
    } else if (time2 === 3 * 60) {
      // Only show splash screen if timer is at initial state (not paused)
      setPendingTimer(2)
      setShowSplash(true)
      setCountdown(3)
    } else {
      // Resume without splash screen if timer was paused
      setIsRunning2(true)
    }
  }

  const handleReset2 = () => {
    setTime2(3 * 60)
    setIsRunning2(false)
    setIsFinished2(false)
  }

  // Calculate color intensity based on remaining time
  const getColorIntensity = (currentTime: number, totalTime: number) => {
    const progress = 1 - currentTime / totalTime
    return Math.min(progress * 1.5, 1) // Multiply by 1.5 to make it more dramatic
  }

  const getBackgroundStyle = () => {
    const redIntensity = getColorIntensity(time1, 5 * 60) // 5 minutes timer
    const blueIntensity = getColorIntensity(time2, 3 * 60) // 3 minutes timer

    // If both timers are finished
    if (isFinished1 && isFinished2) {
      return {
        background: "linear-gradient(45deg, rgb(239, 68, 68), rgb(59, 130, 246))",
      }
    }

    // Calculate RGB values for gradual transition
    const redValue = Math.floor(redIntensity * 239) // Max red: 239
    const blueValue = Math.floor(blueIntensity * 246) // Max blue: 246

    // Create a gradient that combines both colors when in split view
    return {
      background: `linear-gradient(45deg, 
        rgb(${redValue}, ${Math.floor(redIntensity * 68)}, ${Math.floor(redIntensity * 68)}), 
        rgb(${Math.floor(blueIntensity * 59)}, ${Math.floor(blueIntensity * 130)}, ${blueValue}))`
    }
  }

  // Splash Screen Component
  if (showSplash) {
    return <SplashScreen countdown={countdown} showConfetti={showConfetti} />
  }

  // Maximized Timer 1 view
  if (maximized === 1) {
    return (
      <TimerPanel
        time={time1}
        isRunning={isRunning1}
        isFinished={isFinished1}
        label="5 MINUTES"
        duration={5 * 60}
        onStart={handleStart1}
        onReset={handleReset1}
        onMaximize={() => setMaximized(null)}
        isMaximized={true}
        showControls={showControls}
      />
    )
  }

  // Maximized Timer 2 view
  if (maximized === 2) {
    return (
      <TimerPanel
        time={time2}
        isRunning={isRunning2}
        isFinished={isFinished2}
        label="3 MINUTES"
        duration={3 * 60}
        onStart={handleStart2}
        onReset={handleReset2}
        onMaximize={() => setMaximized(null)}
        isMaximized={true}
        showControls={showControls}
      />
    )
  }

  // Split view
  return (
    <div className="min-h-screen transition-all duration-1000 relative" style={getBackgroundStyle()}>
      <div className="grid grid-cols-2 h-screen">
        {/* Timer 1 - 5 minutes (left) */}
        <TimerPanel
          time={time1}
          isRunning={isRunning1}
          isFinished={isFinished1}
          label="5 MINUTES"
          duration={5 * 60}
          onStart={handleStart1}
          onReset={handleReset1}
          onMaximize={() => setMaximized(1)}
          isMaximized={false}
          showControls={showControls}
          className="border-r border-white/20"
        />

        {/* Timer 2 - 3 minutes (right) */}
        <TimerPanel
          time={time2}
          isRunning={isRunning2}
          isFinished={isFinished2}
          label="3 MINUTES"
          duration={3 * 60}
          onStart={handleStart2}
          onReset={handleReset2}
          onMaximize={() => setMaximized(2)}
          isMaximized={false}
          showControls={showControls}
        />
      </div>

      {/* Global confetti for when timers finish */}
      {(isFinished1 || isFinished2) && (
        <Confetti
          className="fixed inset-0 w-full h-full z-40"
          options={{
            particleCount: 150,
            spread: 180,
          }}
        />
      )}
    </div>
  )
} 