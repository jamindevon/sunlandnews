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
    subtitle: "Week of February 2, 2026",
    questions: [
      {
        question: "How old did Fort Pierce turn on February 2, 2026?",
        options: [
          "100 years old",
          "115 years old",
          "125 years old",
          "135 years old"
        ],
        correctAnswer: 2, // 125 years old
        explanation: "Fort Pierce celebrated its 125th birthday on February 2, 2026."
      },
      {
        question: "How much did Port St. Lucie's payroll surge since 2021 according to the Florida DOGE report?",
        options: [
          "$25 million",
          "$38 million",
          "$50 million",
          "$87 million"
        ],
        correctAnswer: 1, // $38 million
        explanation: "The city's payroll has surged by $38 million since 2021, according to the report."
      },
      {
        question: "How many jobs could the proposed Indiantown data center bring?",
        options: [
          "200 jobs",
          "300 jobs",
          "400 jobs",
          "500 jobs"
        ],
        correctAnswer: 2, // 400 jobs
        explanation: "The proposed data center in Indiantown is expected to create 400 jobs."
      },
      {
        question: "How much will advance tickets cost for the Jackie Robinson Celebration Game through March 31?",
        options: [
          "$8",
          "$10",
          "$12",
          "$15"
        ],
        correctAnswer: 1, // $10
        explanation: "Presale tickets are available for $10 through March 31."
      },
      {
        question: "How many iguanas were captured by Florida residents during the recent cold snap?",
        options: [
          "Over 500",
          "Over 700",
          "Over 900",
          "Over 1,200"
        ],
        correctAnswer: 2, // Over 900
        explanation: "Residents captured over 900 iguanas during the designated time period."
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

    switch (platform) {
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
      <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white flex items-center justify-center px-4 py-12 pb-24 border-t-2 border-black">
        <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-brutalPink border-b-4 border-black"></div>

          <div className="text-center mb-8 mt-4">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tight">
              Quiz Complete! 🎉
            </h1>
            <div className="text-7xl md:text-8xl font-black text-black mb-4 inline-block bg-brutalYellow px-6 py-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-2">
              {score}/{quizData.questions.length}
            </div>
            <p className="text-xl md:text-2xl text-gray-800 font-bold mt-4 uppercase tracking-wide">
              {getScoreMessage(score, quizData.questions.length)}
            </p>
          </div>

          {/* Answer Review */}
          <div className="mb-10 space-y-6">
            <h2 className="text-3xl font-black text-black mb-6 uppercase tracking-tight bg-primary text-white inline-block px-4 py-1 border-2 border-black rotate-1">Review Your Answers</h2>
            {quizData.questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={index} className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-6 transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl bg-brutalBg border-2 border-black rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <p className="font-black text-black text-lg mb-3 leading-tight uppercase">
                        {index + 1}. {q.question}
                      </p>
                      {!isCorrect && (
                        <div className="space-y-2 text-sm mb-4 bg-gray-50 border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                          <p className="text-black font-bold flex items-center gap-2">
                            <span className="text-red-500 font-black">Your answer:</span> {q.options[userAnswer]}
                          </p>
                          <p className="text-black font-bold flex items-center gap-2">
                            <span className="text-green-600 font-black">Correct answer:</span> {q.options[q.correctAnswer]}
                          </p>
                        </div>
                      )}
                      <p className="text-gray-800 font-bold border-t-2 border-black pt-2 mt-2 bg-brutalBlue/10 p-2 border-l-4">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Share Buttons */}
          <div className="mb-10 bg-brutalBg border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-2xl transform rotate-1">
            <h3 className="text-2xl font-black text-black mb-6 text-center uppercase tracking-wide">
              Share Your Results
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleShare('twitter')}
                className="px-6 py-3 bg-[#1DA1F2] text-white font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all rounded-xl"
              >
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-6 py-3 bg-[#1877F2] text-white font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all rounded-xl"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="px-6 py-3 bg-[#0A66C2] text-white font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all rounded-xl"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-6 py-3 bg-white text-black font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all rounded-xl cursor-copy"
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleRestart}
              className="px-8 py-5 bg-brutalBlue text-white border-4 border-black font-black text-lg uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all w-full sm:w-auto"
            >
              Take Quiz Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-5 bg-[#ff4365] text-white border-4 border-black font-black text-lg uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all w-full sm:w-auto"
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
    <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white flex items-center justify-center px-4 py-12 pb-24 border-t-2 border-black">
      <div className="max-w-2xl w-full bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[40px] opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-10 relative z-10 mt-4">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 uppercase tracking-tight">
            {quizData.title}
          </h1>
          <p className="inline-block bg-brutalBlue text-white font-bold text-lg px-4 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-wide mb-8 -rotate-1">
            {quizData.subtitle}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-white border-4 border-black h-6 rounded-full overflow-hidden mb-3 relative shadow-[insets_0_2px_4px_rgba(0,0,0,0.1)]">
            <div
              className="h-full bg-brutalPink border-r-4 border-black transition-all duration-300 ease-out flex items-center justify-end pr-2 overflow-hidden"
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            >
              <div className="w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 20px)" }}></div>
            </div>
          </div>
          <p className="text-sm font-black text-black uppercase tracking-widest bg-gray-100 inline-block px-3 py-1 border-2 border-black rounded-lg">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-10 relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-8 leading-tight">
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-5 rounded-xl border-4 transition-all ${selectedAnswer === index
                  ? 'border-black bg-brutalYellow shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                  : 'border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-4 flex-shrink-0 flex items-center justify-center shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] transition-colors ${selectedAnswer === index
                    ? 'border-black bg-black'
                    : 'border-black bg-white'
                    }`}>
                    {selectedAnswer === index && (
                      <svg className="w-4 h-4 text-brutalYellow stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xl font-bold ${selectedAnswer === index ? 'text-black' : 'text-gray-800'}`}>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={selectedAnswer === ''}
          className={`w-full py-5 rounded-xl font-black text-xl uppercase tracking-wider transition-all border-4 border-black relative z-10 ${selectedAnswer === ''
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
            : 'bg-primary text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none'
            }`}
        >
          {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    </div>
  );
}
