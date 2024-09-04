"use client";

import { motion } from 'framer-motion'
import { ChefHat, Github } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8" />
            <span className="text-xl font-bold">RestaurantOS</span>
          </div>
          <a 
            href="https://github.com/rodriveiga01/restaurant_os" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="hidden sm:inline">View on GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Future of Restaurant Management
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl mb-12 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            An open-source solution revolutionizing how restaurants operate. 
            Currently in active development.
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedPlate />
            <AnimatedCode />
          </motion.div>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 RestaurantOS. Open source and proudly community-driven.</p>
        </div>
      </footer>
    </div>
  );
}

function AnimatedPlate() {
  return (
    <motion.div
      className="w-24 h-24 bg-white rounded-full flex items-center justify-center"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    >
      <ChefHat className="h-12 w-12 text-gray-800" />
    </motion.div>
  )
}

function AnimatedCode() {
  return (
    <motion.div
      className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center text-2xl font-mono"
      animate={{
        scale: [1, 1.1, 1],
        borderRadius: ["20%", "30%", "20%"],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    >
      {'{'}...{'}'}
    </motion.div>
  )
}
