"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ChevronDown, Calendar, DollarSign, Clock, Map, Bot, Sparkles } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AiItinerary() {
  const { themeColors } = useTheme()
  const [message, setMessage] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hi there! I'm your AI travel assistant. I can help you plan your perfect trip to Bali based on Emma's recommendations. What would you like to know?",
    },
    {
      role: "user",
      content: "Can you create a 5-day itinerary for Bali with a focus on beaches and local cuisine?",
    },
    {
      role: "system",
      content:
        "I'd be happy to create a 5-day Bali itinerary focusing on beaches and local cuisine! Here's what I recommend:",
    },
  ])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { role: "user", content: message }])
      setMessage("")

      // Simulate AI thinking and response
      setIsGenerating(true)
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setGenerationProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGenerationProgress(0)

          // Add AI response
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                role: "system",
                content:
                  "I'm working on customizing your Bali itinerary. Would you prefer luxury accommodations or budget-friendly options?",
              },
            ])
          }, 500)
        }
      }, 100)
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  }

  return (
    <div className={`min-h-screen flex flex-col ${themeColors.background}`}>
      <motion.div
        className="p-4 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Emma Wilson" />
              <AvatarFallback>EW</AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <h1 className="font-semibold">Emma's Bali Trip</h1>
            <p className="text-sm text-gray-500">Planning based on Emma's recommendations</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="p-4 border-b"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-medium mb-3">Customize Your Trip</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Days</label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="10">10 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Budget</label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Travel Mode</label>
                <Select defaultValue="mix">
                  <SelectTrigger>
                    <SelectValue placeholder="Travel Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Transport</SelectItem>
                    <SelectItem value="rental">Car Rental</SelectItem>
                    <SelectItem value="mix">Mix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Focus</label>
                <Select defaultValue="beaches">
                  <SelectTrigger>
                    <SelectValue placeholder="Focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beaches">Beaches</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className={`w-full mt-3 bg-gradient-to-r ${themeColors.gradient} text-white`}
                onClick={() => setShowOptions(false)}
              >
                Apply Preferences
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <motion.div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? `bg-gradient-to-r ${themeColors.gradient} text-white`
                    : `${themeColors.cardBg} border`
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {msg.role === "system" && (
                  <motion.div
                    className="flex items-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Bot className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">AI Assistant</span>
                  </motion.div>
                )}
                {msg.content}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isGenerating && (
          <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`max-w-[80%] rounded-lg p-3 ${themeColors.cardBg} border`}>
              <div className="flex items-center mb-2">
                <Bot className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center">
                <motion.div
                  className="mr-2"
                  animate={{
                    rotate: 360,
                    transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                >
                  <Sparkles className="h-4 w-4 text-blue-500" />
                </motion.div>
                <span>Generating your perfect itinerary...</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <motion.div className="h-full bg-blue-500 rounded-full" style={{ width: `${generationProgress}%` }} />
              </div>
            </div>
          </motion.div>
        )}

        {messages.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className={`p-4 ${themeColors.cardBg}`}>
              <motion.h3
                className="font-medium mb-2 flex items-center"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                5-Day Bali Itinerary
              </motion.h3>
              <Accordion type="single" collapsible className="w-full">
                {[1, 2, 3, 4, 5].map((day, index) => (
                  <AccordionItem key={day} value={`day-${day}`}>
                    <AccordionTrigger className="text-left">
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Day {day}:{" "}
                          {day === 1
                            ? "Kuta Beach & Welcome Dinner"
                            : day === 2
                              ? "Uluwatu Temple & Seafood"
                              : day === 3
                                ? "Ubud Cultural Tour"
                                : day === 4
                                  ? "Nusa Penida Island Trip"
                                  : "Seminyak & Farewell Dinner"}
                        </span>
                      </motion.div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.div
                        className="space-y-3 pl-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="flex items-start"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Morning</div>
                            <p className="text-sm text-gray-600">
                              {day === 1
                                ? "Breakfast at hotel, then relax at Kuta Beach"
                                : day === 2
                                  ? "Visit Uluwatu Temple and watch the waves"
                                  : day === 3
                                    ? "Explore Ubud Monkey Forest"
                                    : day === 4
                                      ? "Early boat to Nusa Penida Island"
                                      : "Shopping at Seminyak boutiques"}
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-start"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Afternoon</div>
                            <p className="text-sm text-gray-600">
                              {day === 1
                                ? "Lunch at Warung Made for authentic Balinese food"
                                : day === 2
                                  ? "Seafood lunch at Jimbaran Bay"
                                  : day === 3
                                    ? "Visit Tegallalang Rice Terraces"
                                    : day === 4
                                      ? "Snorkeling at Crystal Bay"
                                      : "Spa treatment at luxury resort"}
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-start"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Evening</div>
                            <p className="text-sm text-gray-600">
                              {day === 1
                                ? "Welcome dinner at beachfront restaurant"
                                : day === 2
                                  ? "Watch Kecak Fire Dance at sunset"
                                  : day === 3
                                    ? "Night market food tour in Ubud"
                                    : day === 4
                                      ? "Return to mainland, dinner at Sanur"
                                      : "Farewell dinner at Metis Restaurant"}
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-start mt-2"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Estimated Cost</div>
                            <p className="text-sm text-gray-600">
                              $
                              {day === 1
                                ? "80-120"
                                : day === 2
                                  ? "100-150"
                                  : day === 3
                                    ? "90-130"
                                    : day === 4
                                      ? "150-200"
                                      : "120-180"}{" "}
                              per person
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-start"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Map className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium">Location</div>
                            <p className="text-sm text-gray-600">
                              {day === 1
                                ? "Kuta"
                                : day === 2
                                  ? "Uluwatu & Jimbaran"
                                  : day === 3
                                    ? "Ubud"
                                    : day === 4
                                      ? "Nusa Penida"
                                      : "Seminyak"}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="flex gap-2 mt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button className={`w-full bg-gradient-to-r ${themeColors.gradient} text-white`}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Save Plan
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Book Recommendations
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <motion.div
        className="p-4 border-t"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full mb-3" onClick={() => setShowOptions(!showOptions)}>
            <ChevronDown className="h-4 w-4 mr-2" />
            {showOptions ? "Hide Options" : "Customize Trip"}
          </Button>
        </motion.div>
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="Ask about your trip..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              className={`bg-gradient-to-r ${themeColors.gradient} text-white`}
              onClick={handleSendMessage}
              disabled={isGenerating}
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
