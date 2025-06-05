"use client"

import { cn } from "@/lib/utils"

interface TimerDisplayProps {
  time: number
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export const TimerDisplay = ({ time, className, size = "md" }: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const sizeClasses = {
    sm: "text-6xl",
    md: "text-8xl",
    lg: "text-[10rem]",
    xl: "text-[12rem]",
  }

  return (
    <div className={cn("font-mono font-bold text-white", sizeClasses[size], className)}>
      {formatTime(time)}
    </div>
  )
} 