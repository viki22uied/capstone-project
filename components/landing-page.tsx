"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Search, Sparkles } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ParticleEffect from "./particle-effect"

interface LandingPageProps {
  onDestinationTypeChange: (type: "beach" | "nature" | "city") => void
}

export default function LandingPage({ onDestinationTypeChange }: LandingPageProps) {
  const { themeColors, themeAssets, timeOfDay } = useTheme()
  const [searchValue, setSearchValue] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll({
    container: containerRef,
  })

  const backgroundY = useTransform(scrollY, [0, 300], [0, 100])
  const contentOpacity = useTransform(scrollY, [0, 100], [1, 0.8])

  useEffect(() => {
    if (isSearchFocused && searchValue.length > 0) {
      setShowParticles(true)
    } else {
      setShowParticles(false)
    }
  }, [isSearchFocused, searchValue])

  const handleSearch = (value: string) => {
    setSearchValue(value)
    // Change theme based on search input
    if (value.toLowerCase().includes("beach") || value.toLowerCase().includes("ocean")) {
      onDestinationTypeChange("beach")
    } else if (
      value.toLowerCase().includes("forest") ||
      value.toLowerCase().includes("mountain") ||
      value.toLowerCase().includes("nature")
    ) {
      onDestinationTypeChange("nature")
    } else if (value.toLowerCase().includes("city") || value.toLowerCase().includes("urban")) {
      onDestinationTypeChange("city")
    }
  }

  const getTimeBasedOverlay = () => {
    switch (timeOfDay) {
      case "morning":
        return "bg-gradient-to-b from-yellow-500/20 to-blue-500/30"
      case "afternoon":
        return "bg-gradient-to-b from-blue-400/10 to-blue-600/20"
      case "evening":
        return "bg-gradient-to-b from-orange-500/30 to-purple-800/40"
      case "night":
        return "bg-gradient-to-b from-blue-900/50 to-black/60"
      default:
        return "bg-black/30"
    }
  }

  const destinations = [
    { name: "Bali, Indonesia", type: "beach", image: "/destinations/bali.jpg" },
    { name: "Swiss Alps, Switzerland", type: "nature", image: "/destinations/swiss-alps.jpg" },
    { name: "Tokyo, Japan", type: "city", image: "/destinations/tokyo.jpg" },
    { name: "Santorini, Greece", type: "beach", image: "/destinations/santorini.jpg" },
    { name: "Kyoto, Japan", type: "city", image: "/destinations/kyoto.jpg" },
  ]

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        {themeAssets.backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover h-full w-full"
            poster={themeAssets.backgroundImage}
          >
            <source src={themeAssets.backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={themeAssets.backgroundImage || "/placeholder.svg"}
            alt="Background"
            className="object-cover h-full w-full"
          />
        )}
        <div className={`absolute inset-0 ${getTimeBasedOverlay()}`}></div>
      </div>

      {/* Parallax Content */}
      <motion.div
        ref={containerRef}
        className="h-full overflow-y-auto relative z-10"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center p-6"
          style={{
            y: backgroundY,
            opacity: contentOpacity,
          }}
        >
          <motion.div
            className="w-full max-w-md space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl font-bold text-white mb-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                Wayfare
              </motion.h1>
              <motion.p
                className="text-white/90 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Discover your next adventure
              </motion.p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ width: "90%" }}
              animate={{ width: isSearchFocused ? "100%" : "90%" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div initial={{ scale: 1 }} whileTap={{ scale: 0.98 }}>
                <Input
                  className="pl-10 py-6 text-lg rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg"
                  placeholder="Where do you want to go?"
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </motion.div>
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />

              {/* Particle effect around search bar */}
              {showParticles && (
                <div className="absolute inset-0 -z-10">
                  <ParticleEffect type={themeAssets.particleType} />
                </div>
              )}
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                {
                  name: "Beaches",
                  desc: "Discover paradise",
                  type: "beach",
                  color: "from-blue-500 via-cyan-400 to-teal-300",
                  image: "/categories/beaches.jpg",
                },
                {
                  name: "Nature",
                  desc: "Explore wilderness",
                  type: "nature",
                  color: "from-green-500 via-emerald-400 to-teal-300",
                  image: "/categories/nature.jpg",
                },
                {
                  name: "Cities",
                  desc: "Urban adventures",
                  type: "city",
                  color: "from-purple-500 via-indigo-400 to-blue-300",
                  image: "/categories/cities.jpg",
                },
                {
                  name: "Popular",
                  desc: "Trending places",
                  type: "beach",
                  color: "from-amber-400 via-orange-300 to-red-300",
                  image: "/categories/popular.jpg",
                },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  custom={index}
                  variants={categoryVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    className={`bg-gradient-to-r ${category.color} text-white p-6 h-auto rounded-xl w-full overflow-hidden relative`}
                    onClick={() => onDestinationTypeChange(category.type as any)}
                  >
                    {category.image && (
                      <div className="absolute inset-0 opacity-20">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 0.2,
                        transition: { duration: 0.3 },
                      }}
                    />
                    <div className="flex flex-col items-center relative z-10">
                      <span className="text-lg font-medium">{category.name}</span>
                      <span className="text-xs mt-1">{category.desc}</span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Popular Destinations
              </h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {destinations.map((destination, index) => (
                    <motion.div
                      key={destination.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="flex items-center p-3 bg-white/80 backdrop-blur-sm cursor-pointer hover:bg-white/90 transition overflow-hidden"
                        onClick={() => {
                          setSearchValue(destination.name)
                          onDestinationTypeChange(destination.type as any)
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{
                            x: "100%",
                            transition: { duration: 0.8, ease: "easeInOut" },
                          }}
                        />
                        <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                          <img
                            src={destination.image || "/placeholder.svg"}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{destination.name}</span>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
