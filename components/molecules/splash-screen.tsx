"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Confetti } from "@/components/magicui/confetti"
import { motion, AnimatePresence } from "framer-motion"

interface SplashScreenProps {
  countdown: number
  showConfetti: boolean
}

export const SplashScreen = ({ countdown, showConfetti }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false)
  
  // When countdown reaches 0, start the exit animation
  useEffect(() => {
    if (countdown === 0) {
      // Slight delay before starting exit animation
      const timer = setTimeout(() => {
        setIsExiting(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut" 
        }}
      >
        {showConfetti && (
          <Confetti
            className="fixed inset-0 w-full h-full z-40"
            options={{
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            }}
          />
        )}
        <div className="text-center relative z-50">
          <motion.h1 
            className="text-6xl font-extrabold mb-16 tracking-widest uppercase font-sans"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Indie Hacker Brasil
            </span>
          </motion.h1>
          
          <div className="relative">
            {countdown > 0 ? (
              <motion.div 
                key={countdown}
                className="text-[10rem] font-mono font-bold text-white"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                }}
              >
                {countdown}
              </motion.div>
            ) : (
              <motion.div 
                className="text-[10rem] font-mono font-bold text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 1], 
                  opacity: 1,
                  color: ["#FFFFFF", "#FF5E5E", "#FFFFFF"]
                }}
                transition={{ 
                  duration: 0.6, 
                  times: [0, 0.5, 1],
                  ease: "easeOut" 
                }}
              >
                GO!
              </motion.div>
            )}
            
            {countdown === 0 && (
              <>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 0] }}
                  transition={{ 
                    duration: 1, 
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                  }}
                >
                  <div className="h-32 w-32 rounded-full bg-white opacity-30"></div>
                </motion.div>
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 2, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeOut",
                    delay: 0.1,
                    times: [0, 0.6, 1]
                  }}
                >
                  <div className="h-32 w-32 rounded-full bg-white opacity-20"></div>
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 2.5, 0] }}
                  transition={{ 
                    duration: 2, 
                    ease: "easeOut",
                    delay: 0.2,
                    times: [0, 0.6, 1]
                  }}
                >
                  <div className="h-32 w-32 rounded-full bg-white opacity-10"></div>
                </motion.div>
              </>
            )}
          </div>
        </div>
        
        {/* Radial gradient overlay that pulses with the countdown */}
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            "bg-gradient-radial from-transparent to-black/80",
            countdown > 0 ? "animate-pulse-slow" : "animate-none"
          )}
        ></div>
      </motion.div>
    </AnimatePresence>
  )
} 