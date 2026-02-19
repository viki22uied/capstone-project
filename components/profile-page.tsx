"use client"

import { useEffect } from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  User,
  Settings,
  LogOut,
  Calendar,
  MapPin,
  Star,
  Award,
  ChevronRight,
  GraduationCap,
  Languages,
  Check,
  Sparkles,
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const { themeColors } = useTheme()
  const [activeTab, setActiveTab] = useState("trips")
  const [isGuide, setIsGuide] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [applicationProgress, setApplicationProgress] = useState(30)

  const completeStep = (step: string) => {
    if (!completedSteps.includes(step)) {
      const newCompletedSteps = [...completedSteps, step]
      setCompletedSteps(newCompletedSteps)

      // Update progress
      setApplicationProgress(Math.min(100, 30 + newCompletedSteps.length * 35))
    }
  }

  return (
    <div className={`min-h-screen ${themeColors.background}`}>
      <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className={`text-2xl font-bold ${themeColors.text}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Profile
          </motion.h1>
          <motion.div
            className="flex gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="outline" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className={`p-4 mb-6 ${themeColors.cardBg} overflow-hidden relative`}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 1,
              }}
            />

            <div className="flex items-center gap-4 relative z-10">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Avatar className="h-16 w-16 ring-2 ring-white/50 ring-offset-2">
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="User" />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1">
                <motion.h2
                  className="text-xl font-semibold"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Alex Morgan
                </motion.h2>
                <motion.p
                  className="text-gray-500"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Travel enthusiast
                </motion.p>
                <motion.div
                  className="flex items-center mt-1"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">San Francisco, CA</span>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-3 gap-2 mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <StatsCounter label="Trips" value={12} delay={0.1} />
              <StatsCounter label="Countries" value={48} delay={0.2} />
              <StatsCounter label="Photos" value={156} delay={0.3} />
            </motion.div>

            {!isGuide && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full mt-4 bg-gradient-to-r ${themeColors.gradient} text-white relative overflow-hidden`}
                  onClick={() => setIsGuide(true)}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Become a Guide
                  </span>
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>

        <AnimatePresence>
          {isGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`p-4 mb-6 ${themeColors.cardBg}`}>
                <motion.h2
                  className="text-lg font-semibold mb-3 flex items-center"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Guide Application
                </motion.h2>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step-1">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span>College ID Verification</span>
                        {completedSteps.includes("college-id") && <Check className="h-4 w-4 ml-2 text-green-500" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">Upload your college ID to verify your student status.</p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant={completedSteps.includes("college-id") ? "outline" : "default"}
                            className={`w-full ${
                              completedSteps.includes("college-id")
                                ? "bg-green-100 text-green-800 border-green-300"
                                : `bg-gradient-to-r ${themeColors.gradient} text-white`
                            }`}
                            onClick={() => completeStep("college-id")}
                            disabled={completedSteps.includes("college-id")}
                          >
                            {completedSteps.includes("college-id") ? (
                              <span className="flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                Verified
                              </span>
                            ) : (
                              "Upload College ID"
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-2">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        <span>Tourism Knowledge Test</span>
                        {completedSteps.includes("knowledge-test") && <Check className="h-4 w-4 ml-2 text-green-500" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Complete a short multiple-choice test on tourism knowledge.
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant={completedSteps.includes("knowledge-test") ? "outline" : "default"}
                            className={`w-full ${
                              completedSteps.includes("knowledge-test")
                                ? "bg-green-100 text-green-800 border-green-300"
                                : `bg-gradient-to-r ${themeColors.gradient} text-white`
                            }`}
                            onClick={() => completeStep("knowledge-test")}
                            disabled={completedSteps.includes("knowledge-test")}
                          >
                            {completedSteps.includes("knowledge-test") ? (
                              <span className="flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                Completed
                              </span>
                            ) : (
                              "Take Test"
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-3">
                    <AccordionTrigger>
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-2" />
                        <span>Guide Profile</span>
                        {completedSteps.includes("guide-profile") && <Check className="h-4 w-4 ml-2 text-green-500" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Create your guide profile with languages spoken and areas of expertise.
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant={completedSteps.includes("guide-profile") ? "outline" : "default"}
                            className={`w-full ${
                              completedSteps.includes("guide-profile")
                                ? "bg-green-100 text-green-800 border-green-300"
                                : `bg-gradient-to-r ${themeColors.gradient} text-white`
                            }`}
                            onClick={() => completeStep("guide-profile")}
                            disabled={completedSteps.includes("guide-profile")}
                          >
                            {completedSteps.includes("guide-profile") ? (
                              <span className="flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                Profile Created
                              </span>
                            ) : (
                              "Create Profile"
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">
                      Application Status:{" "}
                      <Badge
                        variant="outline"
                        className={`${
                          applicationProgress >= 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {applicationProgress >= 100 ? "Approved" : "Pending"}
                      </Badge>
                    </p>
                    <p className="text-sm font-medium">{applicationProgress}%</p>
                  </div>
                  <div className="relative">
                    <Progress value={applicationProgress} className="h-2.5" />
                    {applicationProgress >= 100 && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="h-full bg-gradient-to-r from-green-300 via-green-500 to-green-300 rounded-full opacity-50" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="trips">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Saved Trips
                </motion.span>
              </TabsTrigger>
              <TabsTrigger value="rides">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Rides
                </motion.span>
              </TabsTrigger>
              <TabsTrigger value="history">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  History
                </motion.span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trips" className="mt-4 space-y-4">
              <AnimatePresence>
                {[
                  {
                    name: "Bali Beach Getaway",
                    date: "June 15-22, 2023",
                    image: "/placeholder.svg?height=100&width=200",
                  },
                  {
                    name: "Tokyo City Adventure",
                    date: "August 5-12, 2023",
                    image: "/placeholder.svg?height=100&width=200",
                  },
                  {
                    name: "Swiss Alps Hiking",
                    date: "September 10-18, 2023",
                    image: "/placeholder.svg?height=100&width=200",
                  },
                ].map((trip, index) => (
                  <TripCard key={index} trip={trip} index={index} themeColors={themeColors} />
                ))}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="rides" className="mt-4 space-y-4">
              <AnimatePresence>
                {[
                  { destination: "Yosemite National Park", date: "June 15, 2023", status: "Upcoming" },
                  { destination: "Big Sur Coastal Drive", date: "July 8, 2023", status: "Pending" },
                ].map((ride, index) => (
                  <RideStatusCard key={index} ride={ride} index={index} themeColors={themeColors} />
                ))}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="history" className="mt-4 space-y-4">
              <AnimatePresence>
                {[
                  { name: "Paris City Tour", date: "March 10-17, 2023", rating: 4.8 },
                  { name: "Barcelona Weekend", date: "January 20-23, 2023", rating: 4.5 },
                  { name: "New York City Trip", date: "November 5-12, 2022", rating: 4.7 },
                ].map((trip, index) => (
                  <HistoryCard key={index} trip={trip} index={index} themeColors={themeColors} />
                ))}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

function StatsCounter({ label, value, delay }: { label: string; value: number; delay: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev < value) {
            return prev + 1
          }
          clearInterval(interval)
          return prev
        })
      }, 1000 / value)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <motion.div
        className="text-lg font-semibold"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring" }}
      >
        {count}
      </motion.div>
      <div className="text-xs text-gray-500">{label}</div>
    </motion.div>
  )
}

function TripCard({ trip, index, themeColors }: { trip: any; index: number; themeColors: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`overflow-hidden ${themeColors.cardBg}`}>
        <div className="flex h-24">
          <motion.div className="w-1/3 overflow-hidden" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <img src={trip.image || "/placeholder.svg"} alt={trip.name} className="h-full w-full object-cover" />
          </motion.div>
          <div className="w-2/3 p-3 flex flex-col justify-between">
            <div>
              <h3 className="font-medium">{trip.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{trip.date}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline">Saved</Badge>
              <motion.div whileHover={{ x: 3 }} whileTap={{ x: -3 }}>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function RideStatusCard({ ride, index, themeColors }: { ride: any; index: number; themeColors: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`p-4 ${themeColors.cardBg}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{ride.destination}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{ride.date}</span>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Badge
              variant={ride.status === "Upcoming" ? "default" : "outline"}
              className={ride.status === "Upcoming" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
            >
              {ride.status}
            </Badge>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

function HistoryCard({ trip, index, themeColors }: { trip: any; index: number; themeColors: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`p-4 ${themeColors.cardBg}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{trip.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{trip.date}</span>
            </div>
          </div>
          <motion.div className="flex items-center" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="text-sm">{trip.rating}</span>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
