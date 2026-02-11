import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ValentineProposalProps {
  onComplete: () => void;
}

export function ValentineProposal({ onComplete }: ValentineProposalProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [showAccepted, setShowAccepted] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    // Generate random position
    const maxX = window.innerWidth > 768 ? 400 : 200;
    const maxY = window.innerHeight > 768 ? 300 : 150;
    
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    
    // Shrink the button each time it moves
    setNoButtonScale(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setTimeout(() => {
      setShowAccepted(true);
    }, 500);
  };

  if (showAccepted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="relative bg-gradient-to-br from-pink-100/90 via-red-100/90 to-rose-100/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 text-center overflow-hidden">
          {/* Explosion of hearts */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: '50%', y: '50%' }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Heart className="w-6 h-6 fill-pink-400 text-pink-400" />
              </motion.div>
            ))}
          </div>

          {/* Bubu and Dudu kissing */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="relative w-64 h-64 mx-auto">
              {/* Heart background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart className="w-full h-full fill-pink-300/30 text-pink-300/30" />
              </motion.div>
              
              {/* Character placeholder - cute illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-9xl"
                >
                  🐼💋🐼
                </motion.div>
              </div>

              {/* Sparkles around */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-140px)`
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-5xl mb-4"
            >
              💕
            </motion.div>

            <h1 className="text-4xl text-gray-800 mb-4">
              I knew you'd say YES! 
            </h1>
            
            <p className="text-2xl text-pink-600 mb-4">
              😊 Because we're meant to be together
            </p>

            <div className="bg-white/60 rounded-2xl p-6 max-w-md mx-auto mb-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                You make every day feel like Valentine's Day ❤️
              </p>
              <p className="text-lg text-pink-600 mt-4 italic">
                Forever and always, my love 💖
              </p>
            </div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl"
            >
              💝
            </motion.div>
          </motion.div>

          {/* Continue button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            See My Score 💕
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-rose-100/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 text-center">
        {/* Floating hearts */}
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

        {/* Dudu asking Bubu */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">🐼</div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl"
          >
            💝
          </motion.div>
          <div className="text-8xl mt-4">🐼</div>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-pink-600 text-lg mb-2 italic">
            💌 One more special question...
          </p>
          
          <h1 className="text-4xl text-gray-800 mb-3">
            Will You Be My Valentine?
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            🌹 Dudu is asking Bubu... 🌹
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6 min-h-[120px] relative">
          {/* Yes Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleYesClick}
            animate={yesClicked ? { 
              scale: [1, 1.3, 1.3],
              rotate: [0, -10, 10, -10, 10, 0]
            } : {}}
            className="px-12 py-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-2xl rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 relative z-10"
          >
            YES! 💕
          </motion.button>

          {/* No Button - Runs Away */}
          <motion.button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            animate={{ 
              x: noButtonPosition.x,
              y: noButtonPosition.y,
              scale: noButtonScale
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-12 py-5 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-2xl rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 relative z-10 whitespace-nowrap"
          >
            No 😢
          </motion.button>
        </div>

        <motion.p 
          className="text-sm text-pink-500 italic mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ✨ Try to catch the "No" button if you dare... 😏
        </motion.p>
      </div>
    </motion.div>
  );
}
