"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

interface MaximizeButtonProps {
  isMaximized: boolean
  onClick: () => void
  className?: string
  showControls?: boolean
}

export const MaximizeButton = ({ 
  isMaximized, 
  onClick, 
  className,
  showControls = true 
}: MaximizeButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute top-8 right-8 text-white hover:bg-white/20",
        "transition-opacity duration-500",
        showControls ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={onClick}
    >
      {isMaximized ? (
        <Minimize2 className="h-6 w-6" />
      ) : (
        <Maximize2 className="h-6 w-6" />
      )}
    </Button>
  )
} 