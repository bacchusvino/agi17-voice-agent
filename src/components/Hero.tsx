import React, { useState } from 'react';
import { Play, ArrowRight, Users, Mail, Calendar, Phone } from 'lucide-react';

const Hero = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-[#f7f9fc] to-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Outbound, <span className="text-[#0b5fff]">Automated</span>.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                QualiFy finds, qualifies, and books meetings with your outbound prospects — so your team closes more without scaling SDR headcount.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-[#ff6b6b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#ff5252] transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center touch-manipulation">
                Book a Demo
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="border-2 border-[#0b5fff] text-[#0b5fff] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#0b5fff] hover:text-white transition-all duration-200 flex items-center justify-center touch-manipulation"
              >
                <Play className="mr-2" size={20} />
                See it in 60s
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center lg:text-left">
              Start booking qualified meetings in <strong>&lt;7 days</strong>.
            </p>

            {/* Trust Logos */}
            <div className="space-y-3 text-center lg:text-left">
              <p className="text-sm text-gray-500 font-medium">Trusted by forward-thinking teams</p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 opacity-60 overflow-x-auto">
                <div className="bg-gray-200 h-8 w-16 sm:w-20 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">ACME</div>
                <div className="bg-gray-200 h-8 w-16 sm:w-20 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">ZENITH</div>
                <div className="bg-gray-200 h-8 w-16 sm:w-20 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">APEX</div>
                <div className="bg-gray-200 h-8 w-16 sm:w-20 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">NOVA</div>
              </div>
            </div>
          </div>

          {/* Right Column - Animation */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center mb-4 lg:mb-6">Outbound Flow Automation</h3>
              
              {/* Animated Steps */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-blue-50 rounded-lg animate-pulse">
                  <div className="bg-[#0b5fff] p-2 rounded-full">
                    <Mail className="text-white" size={14} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">AI sends outreach</p>
                    <p className="text-xs lg:text-sm text-gray-600">Personalized messaging</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-green-50 rounded-lg animation-delay-200 animate-pulse">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Phone className="text-white" size={14} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">AI qualifies</p>
                    <p className="text-xs lg:text-sm text-gray-600">Automated qualification calls</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-purple-50 rounded-lg animation-delay-400 animate-pulse">
                  <div className="bg-purple-500 p-2 rounded-full">
                    <Play className="text-white" size={14} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">AI sends video follow-up</p>
                    <p className="text-xs lg:text-sm text-gray-600">Personalized video messages</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-orange-50 rounded-lg animation-delay-600 animate-pulse">
                  <div className="bg-[#ff6b6b] p-2 rounded-full">
                    <Calendar className="text-white" size={14} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm lg:text-base">Meeting booked</p>
                    <p className="text-xs lg:text-sm text-gray-600">Directly on your calendar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setIsVideoModalOpen(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 sm:p-4 border-b flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-semibold">QualiFy in 60 seconds</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl sm:text-xl touch-manipulation p-1"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gray-100 flex items-center justify-center p-4">
              <div className="text-center">
                <Play className="mx-auto mb-4 text-[#0b5fff]" size={48} />
                <p className="text-gray-600 text-sm sm:text-base">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;