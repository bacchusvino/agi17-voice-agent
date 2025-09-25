import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const faqs = [
    {
      question: "How does the AI qualification work?",
      answer: "Our AI makes natural-sounding phone calls to leads within 5 minutes of capture. It asks qualifying questions about timeline, motivation, budget, and property details. The conversation feels completely natural - most people don't realize they're talking to AI. Qualified leads are immediately flagged for your follow-up."
    },
    {
      question: "What lead sources does QualiFy monitor?",
      answer: "We monitor San Diego FSBO websites, Craigslist, Facebook Marketplace, Instagram, expired MLS listings, and other local sources. You can also add custom sources. Our system checks for new listings every few minutes and captures leads before your competition even sees them."
    },
    {
      question: "How much does it cost compared to Zillow leads?",
      answer: "QualiFy costs $297/month for unlimited leads and qualification calls. Compare that to Zillow's 35-40% commission fee on a typical $850K San Diego home ($10,000-$13,000 per deal). You save money after just one closed transaction."
    },
    {
      question: "How realistic are the personalized videos?",
      answer: "The HeyGen videos use your actual face and voice, trained from a short video you provide. They mention specific property details and look completely authentic. Leads often comment on how professional and personal they feel compared to generic email follow-ups."
    },
    {
      question: "Can I customize what the AI says during calls?",
      answer: "Absolutely. You can customize the AI's script, qualifying questions, and responses to match your style and local market knowledge. We provide proven scripts for San Diego, but you can adjust everything to fit your approach."
    },
    {
      question: "How quickly can I get started?",
      answer: "Setup takes about 5 minutes. You'll connect your phone number, record a short video for personalization, and choose your lead sources. Most agents see their first qualified leads within 24 hours of setup."
    },
    {
      question: "Does this work for both buyers and sellers?",
      answer: "Yes, but it's especially powerful for seller leads. FSBO sellers are actively looking to avoid agent fees, so when you provide immediate, professional service, you stand out. The system also works great for buyer leads from social media and other sources."
    },
    {
      question: "What if leads don't answer the AI call?",
      answer: "The system tries multiple times at different hours and can send text messages. If no phone contact is made, it automatically sends a personalized video via email or text. You get notified of all activity so you can follow up personally if needed."
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
            Everything you need to know about QualiFy for real estate
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
            Still have questions about QualiFy?
          </p>
          <button className="bg-[#0b5fff] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0951e6] transition-colors text-sm sm:text-base touch-manipulation">
            Schedule a Demo Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;