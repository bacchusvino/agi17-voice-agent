import React from 'react';
import { Mail, Linkedin, Phone, Video, BarChart, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Mail,
      title: "Multi-channel outbound",
      description: "Reach prospects across email, LinkedIn, and phone calls with coordinated messaging sequences.",
      highlights: ["Email automation", "LinkedIn outreach", "Cold calling", "SMS messaging"]
    },
    {
      icon: BarChart,
      title: "AI qualification scoring",
      description: "Advanced AI analyzes prospect responses and behavior to score lead quality automatically.",
      highlights: ["Response analysis", "Behavioral scoring", "Intent detection", "Quality metrics"]
    },
    {
      icon: Settings,
      title: "CRM sync & analytics",
      description: "Seamlessly integrate with your existing CRM and get detailed analytics on campaign performance.",
      highlights: ["HubSpot integration", "Salesforce sync", "Pipedrive connect", "Custom reporting"]
    },
    {
      icon: Video,
      title: "Automated video personalization",
      description: "Generate personalized video messages at scale using AI-powered video creation technology.",
      highlights: ["AI video generation", "Custom templates", "Voice cloning", "Dynamic content"]
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Powerful Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Everything you need to automate your outbound sales process and scale your pipeline
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-[#0b5fff] p-2 sm:p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-xs sm:text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-[#0b5fff] rounded-full mr-2 flex-shrink-0"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Showcase */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            Integrates with your existing stack
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-60">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center space-x-1.5 sm:space-x-2">
              <Settings size={16} className="sm:w-5 sm:h-5 text-orange-500" />
              <span className="font-semibold text-sm sm:text-base">HubSpot</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center space-x-1.5 sm:space-x-2">
              <Settings size={16} className="sm:w-5 sm:h-5 text-blue-500" />
              <span className="font-semibold text-sm sm:text-base">Salesforce</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center space-x-1.5 sm:space-x-2">
              <Settings size={16} className="sm:w-5 sm:h-5 text-green-500" />
              <span className="font-semibold text-sm sm:text-base">Pipedrive</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center space-x-1.5 sm:space-x-2">
              <Linkedin size={16} className="sm:w-5 sm:h-5 text-blue-600" />
              <span className="font-semibold text-sm sm:text-base">LinkedIn</span>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center space-x-1.5 sm:space-x-2">
              <Mail size={16} className="sm:w-5 sm:h-5 text-red-500" />
              <span className="font-semibold text-sm sm:text-base">Gmail</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;