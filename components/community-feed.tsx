"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Heart, MessageCircle, Share2, User, Calendar, MapPin, Sparkles } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityFeed() {
  const { themeColors } = useTheme()
  const [activeTab, setActiveTab] = useState("trending")
  const [activeTag, setActiveTag] = useState("All")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const posts = [
    {
      id: 1,
      user: {
        name: "Emma Wilson",
        avatar: "/users/emma.jpg",
      },
      destination: "Bali, Indonesia",
      dates: "May 15-22, 2023",
      content: "Found this hidden beach in Bali! Crystal clear water and amazing sunset views.",
      image: "/posts/bali-beach.jpg",
      likes: 342,
      comments: 28,
      tags: ["Beaches", "HiddenGems", "Sunset"],
    },
    {
      id: 2,
      user: {
        name: "Alex Chen",
        avatar: "/users/alex.jpg",
      },
      destination: "Swiss Alps, Switzerland",
      dates: "January 5-12, 2023",
      content: "Hiking through the Swiss Alps was breathtaking. The views are worth every step!",
      image: "/posts/swiss-alps.jpg",
      likes: 289,
      comments: 42,
      tags: ["Mountains", "Hiking", "Nature"],
    },
    {
      id: 3,
      user: {
        name: "Sofia Rodriguez",
        avatar: "/users/sofia.jpg",
      },
      destination: "Tokyo, Japan",
      dates: "March 10-20, 2023",
      content: "Tokyo at night is a whole different world. The city lights and street food are amazing!",
      image: "/posts/tokyo-night.jpg",
      likes: 512,
      comments: 76,
      tags: ["City", "NightLife", "StreetFood"],
    },
  ]

  const filteredPosts = activeTag === "All" ? posts : posts.filter((post) => post.tags.some((tag) => tag === activeTag))

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  return (
    <div className={`min-h-screen ${themeColors.background}`}>
      <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.h1
          className={`text-2xl font-bold mb-4 ${themeColors.text}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Community
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="trending">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Trending
                </motion.span>
              </TabsTrigger>
              <TabsTrigger value="following">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Following
                </motion.span>
              </TabsTrigger>
              <TabsTrigger value="nearby">
                <motion.span initial={{ scale: 1 }} whileTap={{ scale: 0.95 }}>
                  Nearby
                </motion.span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          className="flex gap-2 overflow-x-auto pb-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["All", "Beaches", "Mountains", "City", "HiddenGems", "Budget"].map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={activeTag === tag ? "default" : "outline"}
                className={`whitespace-nowrap cursor-pointer ${
                  activeTag === tag ? `bg-gradient-to-r ${themeColors.gradient} text-white` : ""
                }`}
                onClick={() => setActiveTag(tag)}
              >
                #{tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                themeColors={themeColors}
                isLiked={likedPosts.includes(post.id)}
                onLike={() => handleLike(post.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

interface PostCardProps {
  post: any
  index: number
  themeColors: any
  isLiked: boolean
  onLike: () => void
}

function PostCard({ post, index, themeColors, isLiked, onLike }: PostCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      <Card className={`overflow-hidden ${themeColors.cardBg}`}>
        <motion.div
          className="p-4"
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <h3 className="font-medium">{post.user.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{post.destination}</span>
                <span className="mx-1">•</span>
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.dates}</span>
              </div>
            </div>
          </div>

          <p className="mb-3">{post.content}</p>

          <motion.div
            className="rounded-lg overflow-hidden mb-3 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={post.image || "/placeholder.svg"}
              alt={`Travel photo from ${post.destination}`}
              className="w-full h-64 object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="flex gap-2 mb-3 flex-wrap">
            {post.tags.map((tag: string) => (
              <motion.div key={tag} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Badge variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <motion.button
                className="flex items-center gap-1 text-gray-600"
                whileTap={{ scale: 0.9 }}
                onClick={onLike}
              >
                <motion.div
                  animate={
                    isLiked
                      ? {
                          scale: [1, 1.5, 1],
                          color: ["#6b7280", "#ef4444", "#ef4444"],
                        }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </motion.div>
                <span>{isLiked ? post.likes + 1 : post.likes}</span>
              </motion.button>
              <motion.button className="flex items-center gap-1 text-gray-600" whileTap={{ scale: 0.9 }}>
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments}</span>
              </motion.button>
              <motion.button className="flex items-center gap-1 text-gray-600" whileTap={{ scale: 0.9 }}>
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className={`bg-gradient-to-r ${themeColors.gradient} text-white`} size="sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Generate My Trip
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
