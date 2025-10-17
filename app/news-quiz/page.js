'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewsQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Weekly quiz data - easy to update each week
  const quizData = {
    title: "Sunland News Weekly Quiz 🌅",
    subtitle: "How well were you paying attention this week? Test your knowledge!",
    questions: [
      {
        question: "What major announcement did Port St. Lucie make about the Walton One Project?",
        options: [
          "A new convention center and hotel complex",
          "A professional soccer club and 6,000-seat stadium",
          "A downtown shopping mall and food hall",
          "An expanded event center with concert venues"
        ],
        correctAnswer: 1, // Index of correct answer (0-based)
        explanation: "Port St. Lucie announced a United Soccer League franchise with a $80 million, 6,000-seat stadium at the Mid-Florida Event Center site, with the men's team kicking off in 2027."
      },
      {
        question: "How much has food demand increased at GraceWay Village Café compared to last year?",
        options: [
          "15%",
          "23%",
          "37%",
          "45%"
        ],
        correctAnswer: 2,
        explanation: "GraceWay Village Café reported a 37% increase in demand as food banks across the Treasure Coast are seeing pandemic-level need again."
      },
      {
        question: "What was the problem with Fort Pierce's $63,347 Christmas lights contract?",
        options: [
          "The lights were defective and needed replacement",
          "The work was completed after the contract expired and without proper bidding",
          "The vendor overcharged by $20,000",
          "The installation was delayed until 2026"
        ],
        correctAnswer: 1,
        explanation: "The Marina Square holiday lights were installed after the contract expired in November 2024, without competitive bidding, and the work was completed before proper approval was obtained."
      },
      {
        question: "When does the new Port St. Lucie Soccer Club team start playing?",
        options: [
          "Fall 2025",
          "Spring 2026",
          "2027",
          "2028"
        ],
        correctAnswer: 2,
        explanation: "The men's team kicks off in 2027 in USL League One (third tier), with a women's team to follow."
      },
      {
        question: "What new meal service did Stoney's just launch?",
        options: [
          "Sunday brunch",
          "Weekday breakfast (Tuesday-Friday, 7-10 AM)",
          "Late-night menu",
          "Catering service"
        ],
        correctAnswer: 1,
        explanation: "Stoney's launched breakfast Tuesday through Friday from 7 AM to 10 AM, with items like chicken & waffles and sausage bowls all under $8."
      }
    ]
  };

  const getScoreMessage = (score, total) => {
    if (score === total) return "You're a Sunland News superfan! 🏆";
    if (score >= total * 0.6) return "Pretty good—you're staying informed! 📰";
    if (score >= total * 0.2) return "Time to catch up on the archives! 📚";
    return "No worries, there's always next week! 💪";
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    // Save the answer
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    // Check if correct
    if (selectedAnswer === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform) => {
    const text = `I scored ${score}/${quizData.questions.length} on this week's Sunland News Quiz! ${getScoreMessage(score, quizData.questions.length)}`;
    const url = window.location.href;

    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text}\n${url}`);
        alert('Link copied to clipboard!');
        break;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quiz Complete! 🎉
            </h1>
            <div className="text-6xl md:text-7xl font-bold text-blue-600 mb-4">
              {score}/{quizData.questions.length}
            </div>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              {getScoreMessage(score, quizData.questions.length)}
            </p>
          </div>

          {/* Answer Review */}
          <div className="mb-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Your Answers</h2>
            {quizData.questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={index} className="border-l-4 pl-4 py-2" style={{
                  borderColor: isCorrect ? '#10b981' : '#ef4444'
                }}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-2">
                        Question {index + 1}: {q.question}
                      </p>
                      {!isCorrect && (
                        <div className="space-y-1 text-sm mb-2">
                          <p className="text-red-600">
                            Your answer: {q.options[userAnswer]}
                          </p>
                          <p className="text-green-600">
                            Correct answer: {q.options[q.correctAnswer]}
                          </p>
                        </div>
                      )}
                      <p className="text-gray-600 text-sm">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Share Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Share Your Results
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleShare('twitter')}
                className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg font-medium hover:bg-[#1a8cd8] transition-colors"
              >
                Share on Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-6 py-3 bg-[#1877F2] text-white rounded-lg font-medium hover:bg-[#0d65d9] transition-colors"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="px-6 py-3 bg-[#0A66C2] text-white rounded-lg font-medium hover:bg-[#004182] transition-colors"
              >
                Share on LinkedIn
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Take Quiz Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {quizData.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {quizData.subtitle}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={selectedAnswer === ''}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            selectedAnswer === ''
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:from-blue-700 hover:to-orange-600 shadow-lg transform hover:scale-105'
          }`}
        >
          {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    </div>
  );
}
