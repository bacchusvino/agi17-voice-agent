import React from 'react';
import { Upload, Zap, Calendar, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload or connect lead lists",
      description: "Import from CRM, LinkedIn, CSV files, or connect directly to your existing data sources.",
      details: ["CRM integration", "LinkedIn Sales Navigator", "CSV upload", "API connections"],
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "AI outbound automation",
      description: "Our AI handles personalized outreach across multiple channels and conducts qualification calls.",
      details: ["Multi-channel outreach", "AI qualification calls", "Response handling", "Lead scoring"],
      color: "bg-purple-500"
    },
    {
      icon: Calendar,
      title: "Meeting booked",
      description: "AI creates personalized video follow-ups and books qualified prospects directly into your calendar.",
      details: ["Personalized videos", "Calendar integration", "Automated scheduling", "Meeting preparation"],
      color: "bg-green-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Get started in minutes and see results in days with our simple 3-step process
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-8 lg:mb-12">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center max-w-sm">
                    <div className={`${step.color} p-3 lg:p-4 rounded-full mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="text-white" size={32} />
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-base lg:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">
                        {step.description}
                      </p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="text-[#0b5fff] mx-2 lg:mx-4 flex-shrink-0" size={24} className="lg:w-8 lg:h-8" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`${step.color} p-2 sm:p-3 rounded-full flex-shrink-0`}>
                      <step.icon className="text-white" size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-gray-100 text-gray-600 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full mr-2 sm:mr-3">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                        {step.description}
                      </p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-3 sm:my-4">
                    <ArrowRight className="text-[#0b5fff] rotate-90" size={20} className="sm:w-6 sm:h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-[#ff6b6b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#ff5252] transform hover:scale-105 transition-all duration-200 shadow-lg touch-manipulation">
            Start Your Free Trial
          </button>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 px-4">
            No credit card required • Setup in under 10 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;