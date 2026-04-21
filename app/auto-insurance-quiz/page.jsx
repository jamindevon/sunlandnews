'use client';

import React, { useState } from 'react';

const LOGO_PATH = '/images/sebenchmarklogo.png';

const questions = [
  {
    id: 1,
    text: "What's your first name?",
    type: "text",
    placeholder: "e.g. John"
  },
  {
    id: 2,
    text: "Nice to meet you, {1}! Do you currently own your home?",
    type: "single",
    options: ["Yes", "No"]
  },
  {
    id: 3,
    text: "Do you have any drivers under 25 on your auto policy?",
    type: "single",
    options: ["Yes", "No"]
  },
  {
    id: 4,
    text: "Is any student on the policy getting good grades (B average or better)?",
    type: "single",
    options: ["Yes", "No", "Not applicable"],
    condition: (ans) => ans[3] === "Yes"
  },
  {
    id: 5,
    text: "How much are you currently paying for auto insurance every 6 months?",
    type: "single",
    options: ["Under $500", "$500 - $1,000", "$1,000 - $1,500", "Over $1,500"]
  }
];

export default function AutoInsuranceQuiz() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingsEstimate, setSavingsEstimate] = useState({ lowEnd: 0, highEnd: 0 });

  const currentQ = questions[currentQuestionIndex];

  const injectText = (text) => {
    return text.replace(/\{(\d+)\}/g, (match, id) => answers[id] || '');
  };

  const calculateDiscounts = (finalAnswers) => {
    let potentialPercentSavings = 0;
    if (finalAnswers[2] === "Yes") potentialPercentSavings += 10;
    if (finalAnswers[3] === "Yes" && finalAnswers[4] === "Yes") potentialPercentSavings += 15;
    potentialPercentSavings += 5; 

    let basePremium = 1000;
    const premiumAns = finalAnswers[5];
    if (premiumAns === "Under $500") basePremium = 400;
    if (premiumAns === "$500 - $1,000") basePremium = 750;
    if (premiumAns === "$1,000 - $1,500") basePremium = 1250;
    if (premiumAns === "Over $1,500") basePremium = 1800;

    const lowEnd = Math.floor((basePremium * (potentialPercentSavings * 0.5)) / 100);
    const highEnd = Math.floor((basePremium * potentialPercentSavings) / 100);

    return { lowEnd: Math.max(lowEnd, 25), highEnd: Math.max(highEnd, 75) };
  };

  const handleStart = () => setCurrentStep('leadForm');

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);
    goToNext(newAnswers);
  };

  const goToNext = (currentAnswers) => {
    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      if (!nextQ.condition || nextQ.condition(currentAnswers)) {
        break;
      }
      nextIndex++;
    }

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      submitFinalQuiz(currentAnswers);
    }
  };

  const submitPreliminaryLead = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/auto-insurance-quiz/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData })
      });
    } catch (e) {
      console.error("Submission failed", e);
    }

    setAnswers(prev => ({...prev, 1: leadData.name}));
    setCurrentQuestionIndex(1);
    setCurrentStep('quiz');
    setIsSubmitting(false);
  };

  const submitFinalQuiz = async (finalAnswers) => {
    const calcSavings = calculateDiscounts(finalAnswers);
    setSavingsEstimate(calcSavings);
    setCurrentStep('results');

    try {
      await fetch('/api/auto-insurance-quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadData,
          answers: finalAnswers,
          estimates: calcSavings
        })
      });
    } catch (e) {
      console.error("Submission failed", e);
    }
  };

  const renderLanding = () => (
    <div className="text-center py-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-black mb-6 leading-tight tracking-tight">
            Are you leaving money on the table?
        </h1>
        <p className="text-lg md:text-xl text-gray-800 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
            Take our 30-second discount checker quiz to see what <strong className="bg-[#ff4365] text-white px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-block mt-1">savings you qualify for</strong> right now.
        </p>
        <button 
            className="w-full md:w-auto px-10 py-5 text-xl font-bold uppercase text-white bg-[#7b2cb5] border-2 border-black rounded-xl transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            onClick={handleStart}
        >
            Find My Discounts ➔
        </button>
    </div>
  );

  const renderLeadForm = () => (
    <div className="py-2">
      <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-2 text-center">Let's get started.</h2>
      <p className="text-center text-gray-600 font-medium mb-8">Enter your information so we know where to send your results.</p>
      
      <form onSubmit={submitPreliminaryLead} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase">Full Name</label>
          <input 
            type="text" 
            required 
            className="w-full px-5 py-3 text-base bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
            value={leadData.name} 
            onChange={(e) => setLeadData({...leadData, name: e.target.value})}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase">Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full px-5 py-3 text-base bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
            value={leadData.email} 
            onChange={(e) => setLeadData({...leadData, email: e.target.value})}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2 uppercase">Phone Number</label>
          <input 
            type="tel" 
            required 
            className="w-full px-5 py-3 text-base bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
            value={leadData.phone} 
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
              
              // Automatically strip the leading '1' (US country code) if someone pastes 11 digits
              if (input.length === 11 && input.startsWith('1')) {
                input = input.substring(1);
              }

              // Enforce 10-digit limit
              if (input.length > 10) {
                input = input.substring(0, 10);
              }

              // Format to (XXX) XXX-XXXX
              let formatted = input;
              if (input.length > 6) {
                formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
              } else if (input.length > 3) {
                formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
              } else if (input.length > 0) {
                formatted = `(${input}`;
              }

              setLeadData({...leadData, phone: formatted});
            }}
            placeholder="(555) 555-5555"
          />
        </div>

        <div className="flex items-start gap-3 mt-4 mb-2 p-3 bg-gray-50 border-2 border-black rounded-xl">
            <input type="checkbox" required id="consent" className="mt-1 w-5 h-5 accent-[#7b2cb5] border-black border-2" />
            <label htmlFor="consent" className="text-xs text-gray-700 font-medium leading-relaxed">
                By clicking submit, I agree to receive text messages or phone calls from SE Benchmark at the number provided. I understand that consent is not a condition of purchase.
            </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full px-6 py-4 mt-2 text-lg font-bold uppercase text-white border-2 border-black rounded-xl transition-all ${isSubmitting
            ? 'bg-gray-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px] cursor-not-allowed'
            : 'bg-[#7b2cb5] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
          }`}
        >
          {isSubmitting ? 'Loading...' : 'Start The Quiz ➔'}
        </button>
      </form>
    </div>
  );

  const renderQuiz = () => (
    <div key={currentQ.id} className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-8 text-center leading-tight">
        {injectText(currentQ.text)}
      </h2>

      {currentQ.type === 'single' && (
        <div className="flex flex-col gap-4">
          {currentQ.options.map(opt => (
            <button 
              key={opt} 
              className="w-full px-6 py-4 text-left text-lg font-bold text-black bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl transition-all hover:bg-brutalYellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {currentQ.type === 'text' && (
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            className="w-full px-5 py-4 text-lg bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all font-bold"
            placeholder={currentQ.placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                handleAnswer(e.target.value.trim());
              }
            }}
          />
          <p className="text-center text-sm font-bold text-gray-500 uppercase mt-2">Press Enter to continue</p>
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className="py-6 text-center animate-in zoom-in duration-500">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-extrabold text-black mb-2 uppercase tracking-wide">Estimated 6-Month Savings</h2>
      <div className="text-5xl md:text-6xl font-extrabold text-[#7b2cb5] my-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          ${savingsEstimate.lowEnd} - ${savingsEstimate.highEnd}
      </div>
      <p className="text-lg font-medium text-gray-700 mb-8 max-w-sm mx-auto">
          Based on the discounts you qualify for, you could be saving hundreds!
      </p>
      <div className="bg-brutalYellow border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <p className="font-bold text-black text-lg">
            Ms. Daisy will be reaching out shortly to help you lock in these rates.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-[#ff4365] selection:text-white pb-12 pt-8 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white border-2 border-gray-200 p-6 md:p-10 shadow-lg rounded-[2rem] relative">
        <div className="mb-8 border-b-2 border-gray-100 pb-6 flex justify-center">
            <img src={LOGO_PATH} alt="SE Benchmark Insurance" className="h-16 w-auto object-contain" />
        </div>
        
        {currentStep === 'quiz' && (
            <div className="w-full h-3 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div 
                    className="h-full bg-[#7b2cb5] transition-all duration-500" 
                    style={{ width: `${Math.max(5, ((currentQuestionIndex) / questions.length) * 100)}%` }}
                />
            </div>
        )}

        {currentStep === 'landing' && renderLanding()}
        {currentStep === 'leadForm' && renderLeadForm()}
        {currentStep === 'quiz' && renderQuiz()}
        {currentStep === 'results' && renderResults()}
      </div>

      <p className="mt-8 text-xs font-medium text-gray-500 max-w-md text-center">
        *These estimates are for illustrative purposes and do not guarantee coverage or a specific insurance rate. Final rates are determined by underwriting.
      </p>
    </div>
  );
}
