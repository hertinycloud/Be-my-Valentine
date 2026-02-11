import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WelcomeCard } from './components/WelcomeCard';
import { QuizCard } from './components/QuizCard';
import { ResultCard } from './components/ResultCard';
import { ValentineProposal } from './components/ValentineProposal';

// Quiz questions data
const questions = [
  {
    emoji: '📅',
    frontText: '💌 Do you remember this special day?',
    question: 'When did we first meet?',
    options: [
      { letter: 'A', text: 'The luckiest day of my life 🌟', isCorrect: true },
      { letter: 'B', text: 'January 15, 2023', isCorrect: false },
      { letter: 'C', text: 'March 3, 2023', isCorrect: false },
      { letter: 'D', text: 'The day you stole my heart ❤️', isCorrect: false },
    ],
    footer: '✨ Choose wisely, my love…',
  },
  {
    emoji: '🍝',
    frontText: '🍝 A memory full of butterflies…',
    question: 'Where did we go on our first date?',
    options: [
      { letter: 'A', text: 'Fancy restaurant 🍷', isCorrect: false },
      { letter: 'B', text: 'That cozy Italian place downtown 🍝', isCorrect: true },
      { letter: 'C', text: 'Anywhere with you 💕', isCorrect: false },
      { letter: 'D', text: 'Coffee & awkward smiles ☕😆', isCorrect: false },
    ],
    footer: '💖 I still replay that day in my mind…',
  },
  {
    emoji: '😂',
    frontText: '😜 Let\'s see if you remember this!',
    question: 'Who said "I love you" first?',
    options: [
      { letter: 'A', text: 'You 😇', isCorrect: false },
      { letter: 'B', text: 'Me 😌', isCorrect: true },
      { letter: 'C', text: 'At the same time 💞', isCorrect: false },
      { letter: 'D', text: 'Our eyes said it first 🥹', isCorrect: false },
    ],
    footer: '✨ No cheating allowed!',
  },
  {
    emoji: '✈️',
    frontText: '🌍 Our happy place…',
    question: 'What do we love doing together the most?',
    options: [
      { letter: 'A', text: 'Watching movies 🎬', isCorrect: false },
      { letter: 'B', text: 'Late night talks 🌙', isCorrect: true },
      { letter: 'C', text: 'Exploring new places together 🗺️', isCorrect: false },
      { letter: 'D', text: 'Literally anything together ❤️', isCorrect: false },
    ],
    footer: '💫 Because every moment with you matters…',
  },
  {
    emoji: '💞',
    frontText: '💞 Final Question…',
    question: 'What are we building together?',
    options: [
      { letter: 'A', text: 'Beautiful memories ✨', isCorrect: false },
      { letter: 'B', text: 'Endless love 💖', isCorrect: false },
      { letter: 'C', text: 'A forever story 📖', isCorrect: false },
      { letter: 'D', text: 'All of the above 🥰', isCorrect: true },
    ],
    footer: '💌 Hint: There is only one right answer 😉',
  },
];

type GameState = 'welcome' | 'playing' | 'proposal' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or show proposal
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameState('proposal');
      }
    }, 500);
  };

  const handleProposalComplete = () => {
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('welcome');
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-pink-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {gameState === 'welcome' && (
            <WelcomeCard key="welcome" onStart={handleStart} />
          )}
          
          {gameState === 'playing' && (
            <QuizCard
              key={`question-${currentQuestion}`}
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              questionNumber={currentQuestion}
              totalQuestions={questions.length}
            />
          )}
          
          {gameState === 'proposal' && (
            <ValentineProposal
              key="proposal"
              onComplete={handleProposalComplete}
            />
          )}
          
          {gameState === 'results' && (
            <ResultCard
              key="results"
              score={score}
              totalQuestions={questions.length}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}