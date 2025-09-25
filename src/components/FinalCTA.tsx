import React from 'react';
import { ArrowRight, Clock, DollarSign, MapPin } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#0b5fff] to-[#3b7dff] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Stop Giving Away Your Commission to Zillow
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-4">
            Join San Diego agents who are keeping 100% of their commission while closing more deals with AI-powered lead qualification.
          </p>

          {/* Value Props */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-fit mx-auto mb-3">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="text-lg sm:text-xl font-bold mb-1">Save $15K+</div>
              <div className="text-xs sm:text-sm opacity-80">Per deal vs Zillow leads</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-fit mx-auto mb-3">
                <Clock className="text-white" size={24} />
              </div>
              <div className="text-lg sm:text-xl font-bold mb-1">5 Minutes</div>
              <div className="text-xs sm:text-sm opacity-80">From lead to qualification</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-fit mx-auto mb-3">
                <MapPin className="text-white" size={24} />
              </div>
              <div className="text-lg sm:text-xl font-bold mb-1">San Diego</div>
              <div className="text-xs sm:text-sm opacity-80">Local market focus</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <button className="bg-[#ff6b6b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#ff5252] transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center touch-manipulation">
              Start Free Trial
              <ArrowRight className="ml-1 sm:ml-2" size={16} />
            </button>
            <button className="bg-white text-[#0b5fff] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center touch-manipulation">
              Book Demo Call
              <Clock className="ml-1 sm:ml-2" size={16} />
            </button>
          </div>

          {/* Urgency */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mx-4 mb-6">
            <Clock className="mr-1 sm:mr-2" size={14} />
            <span className="text-xs sm:text-sm font-medium">
              Limited beta spots for San Diego agents
            </span>
          </div>

          {/* Trust signals */}
          <div className="text-xs sm:text-sm opacity-80 px-4">
            <p>✓ No setup fees ✓ Cancel anytime ✓ 30-day money-back guarantee</p>
            <p className="mt-2">Used by agents at Compass, RE/MAX, Coldwell Banker, and Keller Williams</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;