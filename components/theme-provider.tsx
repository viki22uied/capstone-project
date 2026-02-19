"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type ThemeType = "beach" | "nature" | "city"

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  themeColors: {
    primary: string
    secondary: string
    accent: string
    background: string
    cardBg: string
    text: string
    gradient: string
  }
  themeAssets: {
    backgroundVideo: string
    backgroundImage: string
    icon: string
    particleType: string
    soundEffect?: string
  }
  timeOfDay: "morning" | "afternoon" | "evening" | "night"
}

const themeData = {
  beach: {
    colors: {
      primary: "from-blue-400 to-cyan-300",
      secondary: "bg-blue-500",
      accent: "bg-yellow-400",
      background: "bg-gradient-to-b from-blue-50 to-cyan-50",
      cardBg: "bg-white/80",
      text: "text-blue-900",
      gradient: "from-blue-500 via-cyan-400 to-teal-300",
    },
    assets: {
      backgroundVideo: "/beach-video.mp4",
      backgroundImage: "/beach-background.jpg",
      icon: "waves",
      particleType: "bubbles",
    },
  },
  nature: {
    colors: {
      primary: "from-green-400 to-emerald-300",
      secondary: "bg-green-600",
      accent: "bg-amber-400",
      background: "bg-gradient-to-b from-green-50 to-emerald-50",
      cardBg: "bg-white/80",
      text: "text-green-900",
      gradient: "from-green-500 via-emerald-400 to-teal-300",
    },
    assets: {
      backgroundVideo: "/nature-video.mp4",
      backgroundImage: "/nature-background.jpg",
      icon: "mountain-snow",
      particleType: "leaves",
      soundEffect: "/nature-sounds.mp3",
    },
  },
  city: {
    colors: {
      primary: "from-purple-400 to-indigo-300",
      secondary: "bg-indigo-600",
      accent: "bg-pink-400",
      background: "bg-gradient-to-b from-slate-50 to-indigo-50",
      cardBg: "bg-white/80",
      text: "text-indigo-900",
      gradient: "from-purple-500 via-indigo-400 to-blue-300",
    },
    assets: {
      backgroundVideo: "/city-video.mp4",
      backgroundImage: "/city-background.jpg",
      icon: "building-2",
      particleType: "lights",
      soundEffect: "/city-sounds.mp3",
    },
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  initialTheme = "beach",
}: {
  children: React.ReactNode
  initialTheme?: ThemeType
}) {
  const [theme, setTheme] = useState<ThemeType>(initialTheme)
  const [themeColors, setThemeColors] = useState(themeData[initialTheme].colors)
  const [themeAssets, setThemeAssets] = useState(themeData[initialTheme].assets)
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning")

  useEffect(() => {
    // Determine time of day based on current hour
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setTimeOfDay("morning")
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay("afternoon")
    } else if (hour >= 17 && hour < 21) {
      setTimeOfDay("evening")
    } else {
      setTimeOfDay("night")
    }

    // Update theme assets and colors
    setThemeColors(themeData[theme].colors)
    setThemeAssets(themeData[theme].assets)

    // Optional: Play theme sound effect
    if (themeData[theme].assets.soundEffect) {
      const audio = new Audio(themeData[theme].assets.soundEffect)
      audio.volume = 0.1 // Keep volume low
      audio.play().catch((e) => console.log("Audio autoplay prevented:", e))
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors, themeAssets, timeOfDay }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
