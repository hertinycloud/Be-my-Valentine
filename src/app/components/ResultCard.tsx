import { motion } from 'motion/react';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function ResultCard({ score, totalQuestions, onRestart }: ResultCardProps) {
  const percentage = (score / totalQuestions) * 100;
  const isPerfect = percentage === 100;
  const isGood = percentage >= 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-rose-100/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 text-center">
        {/* Floating celebration elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {isPerfect && Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ 
                y: [0, 400],
                x: Math.random() * 400 - 200,
                opacity: [0, 1, 0],
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity
              }}
              className="absolute top-0 left-1/2"
            >
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
            </motion.div>
          ))}
        </div>

        {/* Trophy/Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-6"
        >
          {isPerfect ? '🏆' : isGood ? '😊' : '😜'}
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl mb-4 text-gray-800">
          Quiz Completed!
        </h1>

        {/* Score */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-white/80 rounded-2xl px-8 py-4 mb-6"
          >
            <p className="text-5xl text-pink-600 mb-2">
              {score}/{totalQuestions}
            </p>
            <p className="text-sm text-gray-600">
              {percentage}% Correct
            </p>
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          {isPerfect ? (
            <>
              <div className="flex items-center justify-center gap-2 text-2xl text-pink-600 mb-2">
                <Sparkles className="w-6 h-6" />
                <p>You know us perfectly!</p>
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-xl text-gray-700">
                ❤️ Just like I know I want you forever.
              </p>
            </>
          ) : isGood ? (
            <>
              <div className="flex items-center justify-center gap-2 text-2xl text-purple-600 mb-2">
                <Heart className="w-6 h-6 fill-purple-400" />
                <p>You know me so well! 💕</p>
              </div>
              <p className="text-xl text-gray-700">
                Every moment with you is a treasure ✨
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 text-2xl text-pink-600 mb-2">
                <PartyPopper className="w-6 h-6" />
                <p>Hmm... someone needs more dates! 😜</p>
              </div>
              <p className="text-xl text-gray-700">
                But that just means more adventures together! 🌟
              </p>
            </>
          )}
        </motion.div>

        {/* Romantic closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-2xl text-pink-600 mb-2">
            💖 Happy Valentine's Day, My Love.
          </p>
        </motion.div>

        {/* Restart button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Take Quiz Again 💕
        </motion.button>
      </div>
    </motion.div>
  );
}
