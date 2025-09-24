import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = [
    {
      question: "How does AI qualification work?",
      answer: "Our AI uses natural language processing to conduct phone conversations with prospects, asking qualifying questions, understanding responses, and scoring leads based on fit, need, budget, and timeline. It can handle objections and book meetings for qualified prospects automatically."
    },
    {
      question: "What channels does QualiFy support?",
      answer: "QualiFy supports multi-channel outreach including email, LinkedIn messaging, cold calls, SMS, and video messages. You can create coordinated sequences across all channels or focus on specific channels based on your strategy."
    },
    {
      question: "How is our data secured?",
      answer: "We use enterprise-grade security with SOC 2 Type II compliance, end-to-end encryption, and secure data centers. Your prospect data and conversations are never shared with third parties and can be deleted at any time."
    },
    {
      question: "Does it integrate with HubSpot/Pipedrive/Salesforce?",
      answer: "Yes, QualiFy integrates with all major CRM systems including HubSpot, Salesforce, Pipedrive, and more. We sync contacts, activities, and meeting bookings automatically, keeping your CRM up-to-date in real-time."
    },
    {
      question: "How fast can we get started?",
      answer: "Most teams are up and running within 24-48 hours. Setup involves connecting your CRM, uploading prospect lists, and configuring your outreach sequences. Our team provides white-glove onboarding to ensure success."
    },
    {
      question: "What makes QualiFy different from other outbound tools?",
      answer: "Unlike other tools that just send emails, QualiFy combines AI-powered conversations, multi-channel outreach, automatic qualification, and personalized video creation in one platform. It's like having an AI SDR team that works 24/7."
    },
    {
      question: "Can I customize the AI's conversation style?",
      answer: "Absolutely. You can train the AI on your specific talk tracks, objection handling, qualifying criteria, and company messaging. The AI learns your sales methodology and maintains consistency across all prospect interactions."
    },
    {
      question: "What's the pricing model?",
      answer: "We offer flexible pricing based on the number of prospects you want to reach per month. Most teams start with our Growth plan at $500/month for up to 1,000 prospects. Enterprise plans are available for larger volumes."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-[#f7f9fc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            Get answers to common questions about QualiFy
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0b5fff] focus:ring-inset rounded-lg touch-manipulation"
                onClick={() => toggleItem(index)}
              >
                <span className="font-semibold text-gray-900 pr-3 sm:pr-4 text-sm sm:text-base">
                  {faq.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="text-[#0b5fff] flex-shrink-0" size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Still have questions?
          </p>
          <button className="bg-[#0b5fff] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0951e6] transition-colors text-sm sm:text-base touch-manipulation">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;