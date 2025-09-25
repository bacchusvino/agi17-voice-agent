import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "QualiFy helped me land 3 listings in my first month. The AI qualification is spot-on, and the video follow-ups make me look so professional. I'm done paying Zillow's ridiculous fees.",
      author: "Maria Rodriguez",
      role: "Real Estate Agent",
      company: "Compass San Diego",
      location: "Mission Valley",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      result: "3 listings in 30 days"
    },
    {
      quote: "I was skeptical about AI, but QualiFy's voice calls sound completely natural. It qualified a $2.1M Del Mar listing while I was showing another property. Game changer.",
      author: "David Chen",
      role: "Broker Associate",
      company: "Coldwell Banker",
      location: "Del Mar",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      result: "$2.1M listing secured"
    },
    {
      quote: "The FSBO monitoring is incredible. QualiFy caught a Scripps Ranch listing 3 minutes after it was posted. I had the appointment booked before other agents even saw it.",
      author: "Jennifer Park",
      role: "Senior Agent",
      company: "RE/MAX",
      location: "Scripps Ranch",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      result: "First to respond, won listing"
    },
    {
      quote: "My clients love the personalized videos. One seller said it was the most professional follow-up they'd ever received. QualiFy makes me stand out in this competitive market.",
      author: "Michael Torres",
      role: "Real Estate Agent",
      company: "Keller Williams",
      location: "Point Loma",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      result: "Higher close rate"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

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
            What San Diego Agents Are Saying
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Real results from real estate professionals across San Diego County
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
                <div className="flex items-center text-sm opacity-80 mt-1">
                  <MapPin size={12} className="mr-1" />
                  {testimonials[currentTestimonial].location}
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 ml-2 sm:ml-0 text-center">
                <div className="font-bold text-xs sm:text-sm">
                  {testimonials[currentTestimonial].company.split(' ')[0]}
                </div>
                <div className="text-xs opacity-90">
                  {testimonials[currentTestimonial].result}
                </div>
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

        {/* Results Stats */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">$15K+</div>
            <p className="text-gray-600 text-sm sm:text-base">Average commission saved per deal</p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">5 min</div>
            <p className="text-gray-600 text-sm sm:text-base">Average response time to new leads</p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-[#0b5fff] mb-2">3x</div>
            <p className="text-gray-600 text-sm sm:text-base">More listings per month on average</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;