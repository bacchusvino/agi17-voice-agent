import React from 'react';
import { Bot, Calendar, Phone, Video } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Bot,
      title: "Automate SDR-level outreach",
      description: "Replace manual prospecting with AI that works 24/7, reaching more prospects with personalized messaging at scale.",
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Book more meetings with fewer tools",
      description: "Consolidate your outbound stack into one platform that handles prospecting, outreach, qualification, and booking.",
      color: "bg-green-500"
    },
    {
      icon: Phone,
      title: "AI qualification calls & scoring",
      description: "Intelligent conversation AI qualifies prospects automatically, scoring leads and routing only qualified opportunities.",
      color: "bg-purple-500"
    },
    {
      icon: Video,
      title: "Personalized videos at scale",
      description: "Generate custom video messages for each prospect using AI, increasing response rates by 300%.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#f7f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Teams Choose QualiFy
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Transform your outbound sales process with AI-powered automation that delivers results
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
              <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;