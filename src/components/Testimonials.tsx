import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "QualiFy replaced 2 SDRs and doubled our booked calls. The AI qualification is incredibly accurate and saves our team hours every day.",
      author: "Sarah Chen",
      role: "VP of Sales",
      company: "TechFlow",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      logo: "TechFlow"
    },
    {
      quote: "We went from 5 meetings per month to 23 meetings in our first month with QualiFy. The ROI was immediate and substantial.",
      author: "Marcus Rodriguez",
      role: "Founder",
      company: "DataSync",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      logo: "DataSync"
    },
    {
      quote: "The personalized video feature is a game-changer. Our response rates increased by 300% compared to traditional email outreach.",
      author: "Emily Foster",
      role: "Head of Growth",
      company: "CloudVault",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      logo: "CloudVault"
    },
    {
      quote: "As a startup, we needed to scale sales without hiring expensive SDRs. QualiFy gave us enterprise-level capabilities at a fraction of the cost.",
      author: "David Park",
      role: "CEO",
      company: "AutoScale",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      logo: "AutoScale"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            See why sales teams are switching to QualiFy for their outbound automation
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-gradient-to-br from-[#0b5fff] to-[#3b7dff] rounded-2xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl">
            <div className="flex mb-4 sm:mb-6 justify-center sm:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current sm:w-5 sm:h-5" size={16} />
              ))}
            </div>

            <blockquote className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium mb-6 sm:mb-8 leading-relaxed text-center sm:text-left">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>

            <div className="flex items-center justify-center sm:justify-start">
              <img 
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].author}
                className="w-12 sm:w-16 h-12 sm:h-16 rounded-full mr-3 sm:mr-4 object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-base sm:text-lg">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="opacity-90 text-sm sm:text-base">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 ml-2 sm:ml-0">
                <span className="font-bold text-xs sm:text-sm">
                  {testimonials[currentTestimonial].logo}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 sm:mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors touch-manipulation"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-1.5 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-colors touch-manipulation ${
                    index === currentTestimonial ? 'bg-[#0b5fff]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors touch-manipulation"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">300%</div>
            <p className="text-gray-600 text-sm sm:text-base">Average response rate increase</p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">2-5x</div>
            <p className="text-gray-600 text-sm sm:text-base">More meetings booked per month</p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">&lt;7</div>
            <p className="text-gray-600 text-sm sm:text-base">Days to first qualified meeting</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;