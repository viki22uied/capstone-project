"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Car, Filter, Bike, Calendar, DollarSign, MapPin, User, Fuel } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSwipeable } from "react-swipeable"

export default function RideTogether() {
  const { themeColors } = useTheme()
  const [rideType, setRideType] = useState("all")
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [requestingRide, setRequestingRide] = useState<number | null>(null)

  const rides = [
    {
      id: 1,
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
      },
      type: "car",
      from: "San Francisco",
      to: "Yosemite National Park",
      date: "June 15, 2023",
      time: "8:00 AM",
      seats: 3,
      cost: 25,
      fuelLevel: 85,
      carModel: "Tesla Model 3",
      preferences: ["No smoking", "Pet friendly", "Music lover"],
    },
    {
      id: 2,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
      },
      type: "bike",
      from: "Miami Beach",
      to: "Key West",
      date: "July 2, 2023",
      time: "6:30 AM",
      seats: 1,
      cost: 15,
      fuelLevel: 90,
      bikeModel: "Trek Domane SL 7",
      preferences: ["Early starter", "Scenic routes", "Photography stops"],
    },
    {
      id: 3,
      user: {
        name: "David Lee",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 4.7,
      },
      type: "car",
      from: "Seattle",
      to: "Olympic National Park",
      date: "August 10, 2023",
      time: "9:00 AM",
      seats: 4,
      cost: 30,
      fuelLevel: 70,
      carModel: "Subaru Outback",
      preferences: ["Hiking enthusiasts", "Split gas costs", "Coffee stops"],
    },
  ]

  const filteredRides = rideType === "all" ? rides : rides.filter((ride) => ride.type === rideType)

  const toggleCardFlip = (id: number) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((cardId) => cardId !== id))
    } else {
      setFlippedCards([...flippedCards, id])
    }
  }

  const requestRide = (id: number) => {
    setRequestingRide(id)
    setTimeout(() => {
      setRequestingRide(null)
      // Flip card back after request
      setFlippedCards(flippedCards.filter((cardId) => cardId !== id))
    }, 2000)
  }

  return (
    <div className={`min-h-screen ${themeColors.background}`}>
      <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-4">
          <motion.h1
            className={`text-2xl font-bold ${themeColors.text}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ride Together
          </motion.h1>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={rideType} onValueChange={setRideType} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  All
                </motion.span>
              </TabsTrigger>
              <TabsTrigger value="car">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Cars
                </motion.span>
              </TabsTrigger>
              <TabsTrigger value="bike">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Bikes
                </motion.span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <Select defaultValue="date">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="mountain">Mountain</SelectItem>
                <SelectItem value="city">City</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredRides.map((ride, index) => (
              <RideCard
                key={ride.id}
                ride={ride}
                index={index}
                themeColors={themeColors}
                isFlipped={flippedCards.includes(ride.id)}
                onFlip={() => toggleCardFlip(ride.id)}
                isRequesting={requestingRide === ride.id}
                onRequestRide={() => requestRide(ride.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

interface RideCardProps {
  ride: any
  index: number
  themeColors: any
  isFlipped: boolean
  onFlip: () => void
  isRequesting: boolean
  onRequestRide: () => void
}

function RideCard({ ride, index, themeColors, isFlipped, onFlip, isRequesting, onRequestRide }: RideCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handlers = useSwipeable({
    onSwipedLeft: onFlip,
    onSwipedRight: onFlip,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      {...handlers}
    >
      <div className="relative perspective">
        <motion.div
          className="relative w-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Front of card */}
          <motion.div
            className={`${isFlipped ? "absolute backface-hidden" : ""} w-full`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <Card className={`p-4 ${themeColors.cardBg}`}>
              <div className="flex items-start gap-3">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ride.user.avatar || "/placeholder.svg"} alt={ride.user.name} />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{ride.user.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>★ {ride.user.rating}</span>
                        <span className="mx-1">•</span>
                        {ride.type === "car" ? <Car className="h-3 w-3 mr-1" /> : <Bike className="h-3 w-3 mr-1" />}
                        <span>{ride.type === "car" ? "Car" : "Bike"}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Badge
                        variant="outline"
                        className={`${
                          ride.type === "car" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ride.seats} {ride.seats === 1 ? "seat" : "seats"}
                      </Badge>
                    </motion.div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <div className="font-medium">{ride.from}</div>
                        <div className="text-gray-500">to {ride.to}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <div className="font-medium">{ride.date}</div>
                        <div className="text-gray-500">{ride.time}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                      <div className="font-medium">${ride.cost} per person</div>
                    </div>

                    <div className="flex items-center text-sm">
                      <Fuel className="h-4 w-4 mr-2 text-gray-500" />
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Fuel Level</span>
                          <span className="text-xs font-medium">{ride.fuelLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <motion.div
                            className="h-1.5 rounded-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${ride.fuelLevel}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <motion.button
                      className="text-sm text-blue-600 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onFlip}
                    >
                      View Details
                    </motion.button>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className={`bg-gradient-to-r ${themeColors.gradient} text-white`} size="sm">
                        Request Ride
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Back of card */}
          <motion.div
            className={`${!isFlipped ? "absolute backface-hidden" : ""} w-full`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Card className={`p-4 ${themeColors.cardBg}`}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">{ride.user.name}'s Ride Details</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onFlip}
                    className="text-gray-500"
                  >
                    ✕
                  </motion.button>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Vehicle</h4>
                    <p className="font-medium">{ride.type === "car" ? ride.carModel : ride.bikeModel}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {ride.preferences.map((pref: string, i: number) => (
                        <motion.div
                          key={pref}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Badge variant="outline">{pref}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Route</h4>
                    <div className="bg-gray-100 rounded-lg p-3 relative h-24">
                      <div className="absolute left-3 top-3 w-3 h-3 rounded-full bg-green-500" />
                      <div className="absolute left-3 bottom-3 w-3 h-3 rounded-full bg-red-500" />
                      <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-300 dashed-line" />
                      <div className="pl-8 pt-1">{ride.from}</div>
                      <div className="pl-8 absolute bottom-3">{ride.to}</div>

                      <motion.div
                        className="absolute left-3 w-3 h-3 rounded-full bg-blue-500"
                        initial={{ top: "20%" }}
                        animate={{
                          top: ["20%", "80%", "20%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 1 }}
                  animate={isRequesting ? { opacity: 0 } : { opacity: 1 }}
                >
                  <Button
                    className={`w-full bg-gradient-to-r ${themeColors.gradient} text-white relative overflow-hidden`}
                    onClick={onRequestRide}
                    disabled={isRequesting}
                  >
                    Request to Join Ride
                  </Button>
                </motion.div>

                {isRequesting && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="inline-block"
                        animate={{
                          rotate: 360,
                          transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        }}
                      >
                        {ride.type === "car" ? (
                          <Car className="h-12 w-12 text-blue-500" />
                        ) : (
                          <Bike className="h-12 w-12 text-green-500" />
                        )}
                      </motion.div>
                      <p className="mt-2 font-medium">Requesting ride...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
