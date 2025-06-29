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
        'Just moved here',
        'Been here a few years',
        'Born & raised',
        'I visit often'
      ]
    },
    {
      id: 'q3_value',
      question: 'What would make this newsletter really valuable to you?',
      options: [
        'Help me find places I wouldn\'t know about',
        'Save me time & keep me updated',
        'Connect me with local people & stories',
        'Show me how to support local businesses'
      ]
    },
    {
      id: 'q4_sms',
      question: 'Want to get occasional local alerts by text?',
      description: 'Like reminders for events, local deals, or early access to new stuff',
      options: [
        'Yes, that sounds helpful',
        'Maybe later',
        'No thanks'
      ],
      hasPhoneField: true
    },
    {
      id: 'q5_support',
      question: 'Would you be open to supporting local news that feels like home?',
      options: [
        'Yes, show me how',
        'Maybe later',
        'Just here for the free stuff 😅'
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
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackCustom', 'QuizCompleted', {
          content_name: 'Community Quiz',
          willingness_to_support: responses.q5_support,
          sms_optin: responses.q4_sms,
          content_interests: responses.q1_interest,
          phone_provided: responses.phone_number ? 'yes' : 'no'
        });
      }
      
      // Route based on Q5 answer
      if (responses.q5_support === 'Yes, show me how') {
        router.push('/support');
      } else {
        router.push('/quiz/thank-you');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Still route to appropriate page for better UX
      if (responses.q5_support === 'Yes, show me how') {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">45 seconds</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            {currentQuestion.question}
          </h1>
          
          {/* Question Description */}
          {currentQuestion.description && (
            <p className="text-gray-600 text-center mb-8 text-lg">
              {currentQuestion.description}
            </p>
          )}

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(currentQuestion.id, option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentResponse === option
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    currentResponse === option
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {currentResponse === option && (
                      <div className="w-full h-full rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Conditional Phone Number Field */}
          {currentQuestion.hasPhoneField && currentResponse === 'Yes, that sounds helpful' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <label htmlFor="phone" className="block text-sm font-medium text-green-800 mb-2">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={responses.phone_number}
                onChange={(e) => setResponses(prev => ({ ...prev, phone_number: e.target.value }))}
                placeholder="(772) 555-0123"
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
              <p className="text-xs text-green-600 mt-1">
                We'll only text you about important local stuff — no spam, promise!
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                canProceed && !isSubmitting
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : currentStep === questions.length ? (
                'Complete Quiz'
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Your responses help us personalize your newsletter experience
          </p>
        </div>
      </div>
    </div>
  );
} 