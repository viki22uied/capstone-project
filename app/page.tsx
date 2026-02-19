"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import LandingPage from "@/components/landing-page"
import CommunityFeed from "@/components/community-feed"
import RideTogether from "@/components/ride-together"
import AiItinerary from "@/components/ai-itinerary"
import ProfilePage from "@/components/profile-page"
import BottomNavigation from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  const [activeTab, setActiveTab] = useState("explore")
  const [destinationType, setDestinationType] = useState("beach")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (tab: string) => {
    // Add a small delay to allow for exit animations
    setTimeout(() => {
      setActiveTab(tab)
    }, 300)
  }

  return (
    <ThemeProvider initialTheme={destinationType}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col overflow-hidden"
          >
            <main className="flex-1 pb-16 relative">
              <AnimatePresence mode="wait">
                <Tabs key={activeTab} value={activeTab} className="h-full">
                  <TabsContent value="explore" className="h-full m-0 p-0">
                    <LandingPage onDestinationTypeChange={setDestinationType} />
                  </TabsContent>
                  <TabsContent value="community" className="h-full m-0 p-0">
                    <CommunityFeed />
                  </TabsContent>
                  <TabsContent value="ride" className="h-full m-0 p-0">
                    <RideTogether />
                  </TabsContent>
                  <TabsContent value="ai" className="h-full m-0 p-0">
                    <AiItinerary />
                  </TabsContent>
                  <TabsContent value="profile" className="h-full m-0 p-0">
                    <ProfilePage />
                  </TabsContent>
                </Tabs>
              </AnimatePresence>
            </main>
            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
