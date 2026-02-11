import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeCardProps {
  onStart: () => void;
}

export function WelcomeCard({ onStart }: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-rose-100/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 text-center">
        {/* Animated hearts */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [-50, -400],
                x: Math.random() * 400 - 200,
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 3,
                repeat: Infinity
              }}
              className="absolute bottom-0 left-1/2"
            >
              <Heart className="w-6 h-6 fill-pink-300 text-pink-300" />
            </motion.div>
          ))}
        </div>

        {/* Main emoji */}
        <motion.div 
          className="text-8xl mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💝
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-5xl mb-4 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our Love Story Quiz
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-xl text-pink-600">
            <Sparkles className="w-5 h-5" />
            <p>Test Your Memory of Us</p>
            <Sparkles className="w-5 h-5" />
          </div>
          
          <p className="text-lg text-gray-700 max-w-md mx-auto">
            How well do you remember our special moments together? 
            Let's find out! 💕
          </p>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-600 pt-4">
            <span>📅 First Dates</span>
            <span>•</span>
            <span>❤️ Sweet Memories</span>
            <span>•</span>
            <span>✨ Our Journey</span>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-10 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Quiz 💖
        </motion.button>

        {/* Footer note */}
        <motion.p 
          className="text-sm text-pink-500 italic mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ✨ Made with love, just for you ✨
        </motion.p>
      </div>
    </motion.div>
  );
}
