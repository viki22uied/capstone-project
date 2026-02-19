"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="relative w-32 h-32 mb-8" variants={iconVariants} initial="hidden" animate="visible">
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">✈️</span>
        </div>
      </motion.div>

      <motion.h1
        className="text-4xl font-bold text-white mb-8"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        WAYFARE
      </motion.h1>

      <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          variants={progressVariants}
          initial="hidden"
          animate="visible"
        />
      </div>

      <motion.p
        className="text-white/80 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Preparing your journey...
      </motion.p>
    </motion.div>
  )
}
