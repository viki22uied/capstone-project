"use client"

import { Home, Users, Car, Bot, User } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "./theme-provider"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { themeColors } = useTheme()

  const tabs = [
    { id: "explore", label: "Explore", icon: Home },
    { id: "community", label: "Community", icon: Users },
    { id: "ride", label: "Ride", icon: Car },
    { id: "ai", label: "AI Plan", icon: Bot },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <motion.button
            key={tab.id}
            className={`flex flex-col items-center justify-center w-full h-full relative ${
              isActive ? `${themeColors.text}` : "text-gray-500"
            }`}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            {isActive && (
              <motion.div
                className={`absolute bottom-0 w-12 h-1 rounded-t-full bg-gradient-to-r ${themeColors.gradient}`}
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <motion.div
              animate={
                isActive
                  ? {
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.3 },
                    }
                  : {}
              }
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-current" : ""}`} />
            </motion.div>

            <span className={`text-xs mt-1 ${isActive ? "font-medium" : ""}`}>{tab.label}</span>

            {isActive && (
              <motion.div
                className="absolute inset-0 bg-current rounded-full opacity-0"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
