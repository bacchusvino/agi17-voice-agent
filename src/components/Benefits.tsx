import React from 'react';
import { DollarSign, Clock, Shield, TrendingUp } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Keep Your Full Commission",
      description: "Stop paying Zillow 35-40% of your hard-earned commission. QualiFy helps you generate your own qualified leads from San Diego's FSBO market.",
      color: "bg-green-500",
      stat: "Save $15K+ per deal"
    },
    {
      icon: Clock,
      title: "Respond in Minutes, Not Hours",
      description: "AI qualification calls happen within 5 minutes of lead capture. Beat your competition with instant response times that convert.",
      color: "bg-blue-500",
      stat: "5x faster response"
    },
    {
      icon: Shield,
      title: "Build Trust with Video Follow-ups",
      description: "Personalized HeyGen videos show your face and build instant rapport. Stand out from generic email follow-ups that get ignored.",
      color: "bg-purple-500",
      stat: "300% higher engagement"
    },
    {
      icon: TrendingUp,
      title: "Focus on San Diego Market",
      description: "Target local FSBO listings, social media leads, and expired listings. Know your market better than out-of-town lead services.",
      color: "bg-orange-500",
      stat: "Local market expertise"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why San Diego Agents Choose QualiFy
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Stop losing deals to slow follow-up and expensive lead services. Take control of your pipeline.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className={`${benefit.color} p-2 sm:p-3 rounded-lg w-fit mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="text-white" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="bg-gray-50 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2">
                {benefit.stat}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* San Diego Market Stats */}
        <div className="mt-12 lg:mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            San Diego Real Estate Market Facts
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">$850K</div>
              <p className="text-gray-600 text-sm">Median home price in San Diego</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">25%</div>
              <p className="text-gray-600 text-sm">FSBO listings growth in 2024</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">78%</div>
              <p className="text-gray-600 text-sm">Leads lost to slow follow-up</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;