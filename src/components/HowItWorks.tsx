import React from 'react';
import { Search, Phone, Video, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Capture Local Leads",
      description: "QualiFy monitors San Diego FSBO sites, Craigslist, Facebook Marketplace, and Instagram for new listings and seller inquiries.",
      details: ["FSBO websites", "Social media monitoring", "Expired listings", "Craigslist alerts"],
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "AI Qualifies Instantly",
      description: "Within 5 minutes, our AI makes a natural voice call to qualify the lead's timeline, motivation, and budget.",
      details: ["Natural conversation AI", "Qualification questions", "Lead scoring", "Appointment setting"],
      color: "bg-green-500"
    },
    {
      icon: Video,
      title: "Personal Video Follow-up",
      description: "AI creates a personalized HeyGen video with your face, mentioning their specific property and next steps.",
      details: ["Your face & voice", "Property-specific details", "Professional presentation", "Clear call-to-action"],
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            How QualiFy Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From lead capture to qualified appointment in under 30 minutes
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
                      <div className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2 mx-auto">
                        Step {index + 1}
                      </div>
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

        {/* Example Scenario */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Real Example: La Jolla FSBO
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-blue-600 mb-2">9:15 AM</div>
              <p className="text-gray-700">FSBO listing posted on Craigslist: "Selling my La Jolla condo, $1.2M"</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-green-600 mb-2">9:20 AM</div>
              <p className="text-gray-700">AI calls seller, qualifies timeline (3 months), motivation (relocating), budget confirmed</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-purple-600 mb-2">9:35 AM</div>
              <p className="text-gray-700">Personal video sent: "Hi Sarah, I saw your La Jolla condo listing. I'm a local agent who can help you get top dollar..."</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-[#ff6b6b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#ff5252] transform hover:scale-105 transition-all duration-200 shadow-lg touch-manipulation">
            Start Your Free Trial
          </button>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 px-4">
            No credit card required • Setup in 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;