"use client"

import { cn } from "@/lib/utils"
import { TimerDisplay } from "@/components/atoms/timer-display"
import { TimerLabel } from "@/components/atoms/timer-label"
import { TimerControls } from "@/components/molecules/timer-controls"
import { MaximizeButton } from "@/components/atoms/maximize-button"

interface TimerPanelProps {
  time: number
  isRunning: boolean
  isFinished: boolean
  label: string
  duration: number
  onStart: () => void
  onReset: () => void
  onMaximize: () => void
  isMaximized: boolean
  showControls: boolean
  className?: string
}

export const TimerPanel = ({
  time,
  isRunning,
  isFinished,
  label,
  duration,
  onStart,
  onReset,
  onMaximize,
  isMaximized,
  showControls,
  className
}: TimerPanelProps) => {
  // Calculate color intensity based on remaining time
  const getColorIntensity = (currentTime: number, totalTime: number) => {
    const progress = 1 - currentTime / totalTime
    return Math.min(progress * 1.5, 1) // Multiply by 1.5 to make it more dramatic
  }

  const getBackgroundStyle = () => {
    // For finished timer
    if (isFinished) {
      return {
        background: label === "5 MINUTES" 
          ? "rgb(239, 68, 68)" // Red for 5 minutes timer
          : "rgb(59, 130, 246)" // Blue for 3 minutes timer
      }
    }

    // For running or paused timer
    const intensity = getColorIntensity(time, duration)
    if (label === "5 MINUTES") {
      // Red gradient for 5 minutes timer
      const redValue = Math.floor(intensity * 239)
      return {
        background: `rgb(${redValue}, ${Math.floor(intensity * 68)}, ${Math.floor(intensity * 68)})`
      }
    } else {
      // Blue gradient for 3 minutes timer
      const blueValue = Math.floor(intensity * 246)
      return {
        background: `rgb(${Math.floor(intensity * 59)}, ${Math.floor(intensity * 130)}, ${blueValue})`
      }
    }
  }

  const timerContent = (
    <div className="text-center">
      <TimerDisplay 
        time={time} 
        size={isMaximized ? "xl" : "md"} 
        className="mb-6" 
      />
      
      <TimerControls 
        onStart={onStart}
        onReset={onReset}
        isRunning={isRunning}
        size={isMaximized ? "lg" : "sm"}
        className={cn(
          "mb-4 transition-opacity duration-500", 
          showControls ? "opacity-100" : "opacity-0"
        )}
      />
      
      <TimerLabel 
        label={label} 
        size={isMaximized ? "lg" : "sm"} 
      />
    </div>
  )

  // For maximized view with warp background
  if (isMaximized) {
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-all duration-1000 relative"
        style={getBackgroundStyle()}
      >
        <MaximizeButton 
          isMaximized={true}
          onClick={onMaximize}
          showControls={showControls}
        />
          {timerContent}
      </div>
    )
  }

  // For split view
  return (
    <div className={cn("flex items-center justify-center relative", className)}>
      <MaximizeButton 
        isMaximized={false}
        onClick={onMaximize}
        showControls={showControls}
      />
      {timerContent}
    </div>
  )
} 