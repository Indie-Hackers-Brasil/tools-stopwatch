"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

export default function Component() {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart1 = () => {
    if (isRunning1) {
      setIsRunning1(false)
    } else {
      setPendingTimer(1)
      setShowSplash(true)
      setCountdown(3)
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
    } else {
      setPendingTimer(2)
      setShowSplash(true)
      setCountdown(3)
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

    // If only timer 1 is finished (red)
    if (isFinished1) {
      return {
        background: "rgb(239, 68, 68)",
      }
    }

    // If only timer 2 is finished (blue)
    if (isFinished2) {
      return {
        background: "rgb(59, 130, 246)",
      }
    }

    // Calculate RGB values for gradual transition
    const redValue = Math.floor(redIntensity * 239) // Max red: 239
    const blueValue = Math.floor(blueIntensity * 246) // Max blue: 246

    // Create a gradient that combines both colors
    if (redIntensity > 0 && blueIntensity > 0) {
      return {
        background: `linear-gradient(45deg, 
          rgb(${redValue}, ${Math.floor(redIntensity * 68)}, ${Math.floor(redIntensity * 68)}), 
          rgb(${Math.floor(blueIntensity * 59)}, ${Math.floor(blueIntensity * 130)}, ${blueValue}))`,
      }
    } else if (redIntensity > 0) {
      return {
        background: `rgb(${redValue}, ${Math.floor(redIntensity * 68)}, ${Math.floor(redIntensity * 68)})`,
      }
    } else if (blueIntensity > 0) {
      return {
        background: `rgb(${Math.floor(blueIntensity * 59)}, ${Math.floor(blueIntensity * 130)}, ${blueValue})`,
      }
    }

    // Default black background
    return {
      background: "rgb(0, 0, 0)",
    }
  }

  const getTextColor = () => {
    return "text-white"
  }

  // Splash Screen Component
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-16 tracking-wider">INDIE HACKER BRASIL</h1>
          <div className="text-[8rem] font-mono font-bold text-white animate-pulse">
            {countdown > 0 ? countdown : "GO!"}
          </div>
        </div>
      </div>
    )
  }

  if (maximized === 1) {
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-all duration-1000 relative"
        style={getBackgroundStyle()}
      >
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-8 right-8 ${getTextColor()} hover:bg-white/20 transition-opacity duration-500 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMaximized(null)}
          >
            <Minimize2 className="h-6 w-6" />
          </Button>
          <div className={`text-[12rem] font-mono font-bold ${getTextColor()} mb-8`}>{formatTime(time1)}</div>

          <div className={`transition-opacity duration-500 ${showControls ? "opacity-100" : "opacity-0"}`}>
            {!isRunning1 && (
              <div className="flex gap-6 justify-center">
                <Button
                  onClick={handleStart1}
                  size="lg"
                  className="text-2xl px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold"
                >
                  START
                </Button>
                <Button
                  onClick={handleReset1}
                  size="lg"
                  variant="outline"
                  className={`text-2xl px-8 py-4 ${getTextColor()} border-white bg-transparent hover:bg-white/20 font-bold`}
                >
                  RESET
                </Button>
              </div>
            )}

            {isRunning1 && (
              <Button
                onClick={handleStart1}
                size="lg"
                className="text-2xl px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold"
              >
                PAUSE
              </Button>
            )}
          </div>

          <div className={`text-xl mt-4 ${getTextColor()} opacity-70`}>5 MINUTES</div>
        </div>
      </div>
    )
  }

  if (maximized === 2) {
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-all duration-1000 relative"
        style={getBackgroundStyle()}
      >
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-8 right-8 ${getTextColor()} hover:bg-white/20 transition-opacity duration-500 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMaximized(null)}
          >
            <Minimize2 className="h-6 w-6" />
          </Button>
          <div className={`text-[12rem] font-mono font-bold ${getTextColor()} mb-8`}>{formatTime(time2)}</div>

          <div className={`transition-opacity duration-500 ${showControls ? "opacity-100" : "opacity-0"}`}>
            {!isRunning2 && (
              <div className="flex gap-6 justify-center">
                <Button
                  onClick={handleStart2}
                  size="lg"
                  className="text-2xl px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold"
                >
                  START
                </Button>
                <Button
                  onClick={handleReset2}
                  size="lg"
                  variant="outline"
                  className={`text-2xl px-8 py-4 ${getTextColor()} border-white bg-transparent hover:bg-white/20 font-bold`}
                >
                  RESET
                </Button>
              </div>
            )}

            {isRunning2 && (
              <Button
                onClick={handleStart2}
                size="lg"
                className="text-2xl px-8 py-4 bg-white text-black hover:bg-gray-200 font-bold"
              >
                PAUSE
              </Button>
            )}
          </div>

          <div className={`text-xl mt-4 ${getTextColor()} opacity-70`}>3 MINUTES</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-all duration-1000 relative" style={getBackgroundStyle()}>
      <div className="grid grid-cols-2 h-screen">
        {/* Timer 1 - 5 minutes (left) */}
        <div className="flex items-center justify-center relative border-r border-white/20">
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-8 right-8 ${getTextColor()} hover:bg-white/20 transition-opacity duration-500 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMaximized(1)}
          >
            <Maximize2 className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <div className={`text-8xl font-mono font-bold ${getTextColor()} mb-6`}>{formatTime(time1)}</div>
            <div
              className={`flex gap-4 justify-center mb-4 transition-opacity duration-500 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                onClick={handleStart1}
                className="text-lg px-6 py-3 bg-white text-black hover:bg-gray-200 font-bold"
              >
                {isRunning1 ? "PAUSE" : "START"}
              </Button>
              <Button
                onClick={handleReset1}
                variant="outline"
                className={`text-lg px-6 py-3 ${getTextColor()} border-white bg-transparent hover:bg-white/20 font-bold`}
              >
                RESET
              </Button>
            </div>
            <div className={`text-sm ${getTextColor()} opacity-70`}>5 MINUTES</div>
          </div>
        </div>

        {/* Timer 2 - 3 minutes (right) */}
        <div className="flex items-center justify-center relative">
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-8 right-8 ${getTextColor()} hover:bg-white/20 transition-opacity duration-500 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMaximized(2)}
          >
            <Maximize2 className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <div className={`text-8xl font-mono font-bold ${getTextColor()} mb-6`}>{formatTime(time2)}</div>
            <div
              className={`flex gap-4 justify-center mb-4 transition-opacity duration-500 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                onClick={handleStart2}
                className="text-lg px-6 py-3 bg-white text-black hover:bg-gray-200 font-bold"
              >
                {isRunning2 ? "PAUSE" : "START"}
              </Button>
              <Button
                onClick={handleReset2}
                variant="outline"
                className={`text-lg px-6 py-3 ${getTextColor()} border-white bg-transparent hover:bg-white/20 font-bold`}
              >
                RESET
              </Button>
            </div>
            <div className={`text-sm ${getTextColor()} opacity-70`}>3 MINUTES</div>
          </div>
        </div>
      </div>
    </div>
  )
}
