import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#0b5fff] to-[#3b7dff] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Ready to book more meetings without scaling SDRs?
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-4">
            Join hundreds of sales teams using AI to automate their outbound process and drive predictable pipeline growth.
          </p>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">24/7</div>
              <div className="text-xs sm:text-sm opacity-80">AI working for you</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">{"<48hrs"}</div>
              <div className="text-xs sm:text-sm opacity-80">Setup time</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">300%</div>
              <div className="text-xs sm:text-sm opacity-80">Response rate increase</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <button className="bg-[#ff6b6b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#ff5252] transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center touch-manipulation">
              Book a Demo
              <ArrowRight className="ml-1 sm:ml-2" size={16} />
            </button>
            <button className="bg-white text-[#0b5fff] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center touch-manipulation">
              Start Free Trial
              <Clock className="ml-1 sm:ml-2" size={16} />
            </button>
          </div>

          {/* Urgency */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mx-4">
            <Clock className="mr-1 sm:mr-2" size={14} />
            <span className="text-xs sm:text-sm font-medium">
              Limited spots available for Q1 onboarding
            </span>
          </div>

          {/* Trust signals */}
          <div className="mt-6 sm:mt-8 text-xs sm:text-sm opacity-80 px-4">
            <p>✓ No setup fees ✓ Cancel anytime ✓ 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;