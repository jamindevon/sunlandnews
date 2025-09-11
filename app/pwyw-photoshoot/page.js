import CalEmbed from './CalEmbed';

export const metadata = {
  title: "Pay What You Want School Photos - Sunland Bookstore",
  description: "Special school photo sessions at Sunland Bookstore - September 20th, 2025. Every child deserves school photos regardless of budget.",
  robots: "noindex, nofollow"
};

export default function PWYWPhotoshootPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pay What You Want School Photos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every child deserves school photos regardless of budget. We want to help out and document a few children 
            in exchange for whatever you think it's worth. We're grateful to capture these precious moments for your child.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          
          {/* Photos Section */}
          <div className="bg-gray-50 rounded-lg p-4 md:p-8">
            {/* Topsy-turvy photo arrangement */}
            <div className="relative h-[500px] md:h-[600px]">
              {/* Photo 1 - tilted left */}
              <div className="absolute top-0 left-2 md:left-4 w-40 h-40 md:w-64 md:h-64 transform -rotate-12 hover:rotate-0 transition-transform duration-300 border-4 border-gray-800 bg-white p-2 shadow-lg">
                <img 
                  src="/images/P9040292.JPG" 
                  alt="Sample school portrait 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Photo 2 - tilted right */}
              <div className="absolute top-8 md:top-12 right-2 md:right-8 w-44 h-44 md:w-72 md:h-72 transform rotate-12 hover:rotate-0 transition-transform duration-300 border-4 border-gray-800 bg-white p-2 shadow-lg">
                <img 
                  src="/images/P9040293.JPG" 
                  alt="Sample school portrait 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Photo 3 - slight tilt, lower center */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 rotate-6 hover:rotate-0 transition-transform duration-300 w-48 h-48 md:w-80 md:h-80 border-4 border-gray-800 bg-white p-2 shadow-lg">
                <img 
                  src="/images/P9040296.JPG" 
                  alt="Sample school portrait 3" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Event Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>Saturday, September 20th, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>Sunland Bookstore</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Session Length:</span>
                  <span>20-30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Deposit:</span>
                  <span>$10 (refundable)</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Professional 20-30 minute portrait session</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>3-5 professionally edited digital photos</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>1 professional print included</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Photos delivered by September 22nd</span>
                </li>
              </ul>
            </div>

            {/* How It Works */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reserve Your Slot</h3>
                    <p className="text-gray-600">Book your time slot using the button below with a $10 refundable deposit</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Attend Your Session</h3>
                    <p className="text-gray-600">Come to Sunland Bookstore on Saturday, September 20th for your professional photos</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Receive Your Photos</h3>
                    <p className="text-gray-600">Get your edited digital photos and print</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Pay What You Want</h3>
                    <p className="text-gray-600">After seeing your photos, pay what you think the experience was worth to your family</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-6">
              Get your time slot here:
            </p>
            <a 
              href="https://cal.com/sunlandcompany/pwywtwo?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-12 py-4 text-xl font-bold rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Book Now
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}