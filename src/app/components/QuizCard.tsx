import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface QuizCardProps {
  question: {
    emoji: string;
    frontText: string;
    question: string;
    options: {
      letter: string;
      text: string;
      isCorrect: boolean;
    }[];
    footer: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({ question, onAnswer, questionNumber, totalQuestions }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-rose-100/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
        {/* Floating hearts decoration */}
        <div className="absolute -top-4 -right-4">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-8 h-8 fill-pink-400 text-pink-400" />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i < questionNumber ? 'w-8 bg-pink-400' : 'w-2 bg-pink-200'
              }`}
            />
          ))}
        </div>

        {/* Emoji */}
        <motion.div 
          className="text-6xl text-center mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {question.emoji}
        </motion.div>

        {/* Front text */}
        <p className="text-center text-pink-600 mb-2 italic">
          {question.frontText}
        </p>

        {/* Main question */}
        <h2 className="text-2xl text-center mb-8 text-gray-800">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(option.isCorrect)}
              className="w-full p-4 bg-white/70 hover:bg-white/90 rounded-2xl text-left transition-all duration-200 border border-pink-200 hover:border-pink-400 shadow-sm hover:shadow-md"
            >
              <span className="font-semibold text-pink-600 mr-3">{option.letter})</span>
              <span className="text-gray-700">{option.text}</span>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-pink-500 italic">
          {question.footer}
        </p>
      </div>
    </motion.div>
  );
}
