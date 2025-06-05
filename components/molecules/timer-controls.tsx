"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TimerControlsProps {
  onStart: () => void
  onReset: () => void
  isRunning: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export const TimerControls = ({ 
  onStart, 
  onReset, 
  isRunning, 
  className,
  size = "md" 
}: TimerControlsProps) => {
  const sizeConfig = {
    sm: {
      container: "gap-4",
      button: "text-lg px-6 py-4 h-auto rounded-lg",
    },
    md: {
      container: "gap-5",
      button: "text-xl px-7 py-5 h-auto rounded-xl",
    },
    lg: {
      container: "gap-6",
      button: "text-2xl px-8 py-6 h-auto rounded-xl",
    },
  }

  return (
    <div className={cn("flex justify-center", sizeConfig[size].container, className)}>
      <Button
        onClick={onStart}
        className={cn(
          "bg-white text-black hover:bg-gray-200 font-bold shadow-md",
          sizeConfig[size].button
        )}
      >
        {isRunning ? "PAUSE" : "START"}
      </Button>
      
      <Button
        onClick={onReset}
        variant="outline"
        className={cn(
          "border-white bg-transparent hover:bg-white/20 text-white font-bold",
          sizeConfig[size].button
        )}
      >
        RESET
      </Button>
    </div>
  )
} 