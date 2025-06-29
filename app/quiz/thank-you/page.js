'use client';

export default function QuizThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Thanks for sharing! 🙏
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed">
            Your first Sunland News issue is on its way.
          </p>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What happens next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  <strong>Tomorrow morning:</strong> Your first Sunland News email arrives with local stories, events, and happenings.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  <strong>Every weekday:</strong> Fresh content delivered to your inbox between 6-8 AM.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  <strong>Thursdays:</strong> Special events roundup with 30-50 handpicked local happenings.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12">
            <p className="text-gray-600 text-sm">
              Questions? Reply to any email we send you and we'll get back to you quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 