"use client"

import { cn } from "@/lib/utils"

interface TimerLabelProps {
  label: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export const TimerLabel = ({ label, className, size = "md" }: TimerLabelProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className={cn("text-white opacity-70 font-semibold tracking-wider", sizeClasses[size], className)}>
      {label}
    </div>
  )
} 