'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createQuizResponse } from '../../lib/supabase';

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responses, setResponses] = useState({
    q1_interest: '',
    q2_lived: '',
    q3_value: '',
    q4_sms: '',
    q5_support: '',
    phone_number: ''
  });

  const questions = [
    {
      id: 'q1_interest',
      question: 'What are you most interested in?',
      options: [
        '🍽️ Local food & hidden gems',
        '🎉 Events & things to do',
        '🧠 Deep stories about people and culture',
        '🏛️ Local government & civic updates',
        '📬 All of it — surprise me'
      ]
    },
    {
      id: 'q2_lived',
      question: 'How long have you lived in the area?',
      options: [
        '📦 Just moved here',
        '🏡 Been here a few years',
        '🌴 Born & raised',
        '✈️ I visit often'
      ]
    },
    {
      id: 'q3_value',
      question: 'What would make this newsletter really valuable to you?',
      options: [
        '🔍 Help me find places I wouldn\'t know about',
        '⏰ Save me time & keep me updated',
        '🤝 Connect me with local people & stories',
        '💼 Show me how to support local businesses'
      ]
    },
    {
      id: 'q4_sms',
      question: 'Want to get occasional local alerts by text?',
      description: 'Like reminders for events, local deals, or early access to new stuff',
      options: [
        '✅ Yes, that sounds helpful',
        '⏳ Maybe later',
        '🙅 No thanks'
      ],
      hasPhoneField: true
    },
    {
      id: 'q5_support',
      question: 'Would you be open to supporting local news that feels like home?',
      options: [
        '💪 Yes, show me how',
        '⏳ Maybe later',
        '🆓 Just here for the free stuff 😅'
      ]
    }
  ];

  const handleOptionSelect = (questionId, option) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      // Smooth scroll to top of question for better UX
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Smooth scroll to top of question for better UX
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Get stored email and signup ID from localStorage
      const email = localStorage.getItem('signupEmail') || '';
      const signupId = localStorage.getItem('signupId') || null;

      // Store quiz responses in Supabase
      const result = await createQuizResponse(signupId, email, responses);

      if (result.success) {
        console.log('Quiz responses saved successfully');
      } else {
        console.error('Failed to save quiz responses:', result.error);
      }

      // Track quiz completion with Meta Pixel
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.trackCustom('QuizCompleted', {
            content_name: 'Community Quiz',
            willingness_to_support: responses.q5_support,
            sms_optin: responses.q4_sms,
            content_interests: responses.q1_interest,
            phone_provided: responses.phone_number ? 'yes' : 'no'
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }

      // Route based on Q5 answer
      if (responses.q5_support === '💪 Yes, show me how') {
        router.push('/support');
      } else {
        router.push('/quiz/thank-you');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Still route to appropriate page for better UX
      if (responses.q5_support === '💪 Yes, show me how') {
        router.push('/support');
      } else {
        router.push('/quiz/thank-you');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep - 1];
  const currentResponse = responses[currentQuestion.id];
  const canProceed = currentResponse !== '';

  return (
    <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white">
      <div className="container mx-auto max-w-xl px-4 py-8 pb-16">

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black uppercase tracking-widest bg-white border-2 border-black px-2 py-1 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Question {currentStep} of {questions.length}
            </span>
            <span className="text-xs font-bold text-gray-600">~45 sec</span>
          </div>
          <div className="w-full bg-white border-4 border-black h-5 rounded-full overflow-hidden">
            <div
              className="h-full bg-brutalPink border-r-4 border-black transition-all duration-300 ease-out overflow-hidden"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            >
              <div className="w-full h-full opacity-30" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 20px)" }}></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl p-5 md:p-8 relative overflow-hidden">
          {/* Top accent strip */}
          <div className="absolute top-0 left-0 w-full h-3 bg-brutalYellow border-b-4 border-black"></div>

          <h1 className="text-2xl md:text-3xl font-black text-black mb-4 text-center leading-tight uppercase tracking-tight mt-3">
            {currentQuestion.question}
          </h1>

          {/* Question Description */}
          {currentQuestion.description && (
            <p className="font-bold text-gray-700 text-center mb-5 leading-relaxed bg-brutalBg border-2 border-black p-3 rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,1)] text-sm">
              {currentQuestion.description}
            </p>
          )}

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <div key={option}>
                <button
                  onClick={() => handleOptionSelect(currentQuestion.id, option)}
                  className={`w-full p-3 text-left rounded-xl border-4 transition-all font-bold text-base ${currentResponse === option
                    ? 'border-black bg-brutalYellow shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                    : 'border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full border-4 flex-shrink-0 flex items-center justify-center transition-colors ${currentResponse === option
                      ? 'border-black bg-black'
                      : 'border-black bg-white'
                      }`}>
                      {currentResponse === option && (
                        <svg className="w-4 h-4" fill="none" stroke="#EAB308" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={currentResponse === option ? 'text-black' : 'text-gray-800'}>{option}</span>
                  </div>
                </button>

                {/* Conditional Phone Number Field */}
                {currentQuestion.hasPhoneField && option === '✅ Yes, that sounds helpful' && currentResponse === option && (
                  <div className="mt-4 p-5 bg-brutalBg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl">
                    <label htmlFor="phone" className="block text-sm font-black uppercase tracking-wide text-black mb-3">
                      📱 Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={responses.phone_number}
                      onChange={(e) => setResponses(prev => ({ ...prev, phone_number: e.target.value }))}
                      placeholder="(772) 555-0123"
                      className="w-full px-4 py-3 border-2 border-black bg-white font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all rounded-xl"
                    />
                    <p className="text-xs font-bold text-gray-600 mt-2 uppercase tracking-wide">
                      We'll only text you about important local stuff — no spam, promise!
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-3 mt-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2.5 text-sm font-black uppercase tracking-wider rounded-xl border-2 transition-all flex-shrink-0 ${currentStep === 1
                ? 'text-gray-400 cursor-not-allowed border-gray-300 bg-gray-100'
                : 'text-black border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                }`}
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className={`px-6 py-3 text-base font-black uppercase tracking-wider rounded-xl border-4 border-black transition-all flex-1 ${canProceed && !isSubmitting
                ? 'bg-primary text-white shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : currentStep === questions.length ? (
                'Complete Quiz ✓'
              ) : (
                'Next →'
              )}
            </button>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="text-center mt-8">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">
            Your responses help us personalize your newsletter experience
          </p>
        </div>
      </div>
    </div>
  );
}
