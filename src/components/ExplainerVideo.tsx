import React from 'react';
import { Play, Target, MessageSquare, Video, Calendar } from 'lucide-react';

const ExplainerVideo = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Player */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video bg-gradient-to-br from-[#0b5fff] to-[#3b7dff] rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer hover:shadow-3xl transition-shadow duration-300 touch-manipulation">
              <div className="text-center text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 sm:p-6 mb-3 sm:mb-4 hover:bg-white/30 transition-colors">
                  <Play size={32} className="sm:w-12 sm:h-12" fill="currentColor" />
                </div>
                <p className="text-base sm:text-lg font-semibold">Watch QualiFy in Action</p>
                <p className="text-xs sm:text-sm opacity-90">60-90 seconds demo</p>
              </div>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                See How It Works
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Watch our complete outbound automation workflow in action
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4 text-left">
                <div className="bg-[#0b5fff] p-2 rounded-lg flex-shrink-0">
                  <Target className="text-white" size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Find the right prospects</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Advanced data sourcing & enrichment from multiple channels</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 text-left">
                <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                  <MessageSquare className="text-white" size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">AI-driven first outreach & qualification</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Intelligent messaging and automated qualification conversations</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 text-left">
                <div className="bg-purple-500 p-2 rounded-lg flex-shrink-0">
                  <Video className="text-white" size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Automated personalized video/email follow-up</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Dynamic video creation and contextual email sequences</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 text-left">
                <div className="bg-[#ff6b6b] p-2 rounded-lg flex-shrink-0">
                  <Calendar className="text-white" size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Meetings booked directly on your calendar</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Seamless calendar integration with automatic scheduling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplainerVideo;