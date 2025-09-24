import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl font-bold text-[#0b5fff]">
              QualiFy
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-700 hover:text-[#0b5fff] transition-colors text-sm xl:text-base"
            >
              Product
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-700 hover:text-[#0b5fff] transition-colors text-sm xl:text-base"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-700 hover:text-[#0b5fff] transition-colors text-sm xl:text-base"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-700 hover:text-[#0b5fff] transition-colors text-sm xl:text-base"
            >
              Resources
            </button>
            <button className="bg-[#ff6b6b] text-white px-4 xl:px-6 py-2 rounded-lg font-semibold hover:bg-[#ff5252] transform hover:scale-105 transition-all duration-200 shadow-lg text-sm xl:text-base touch-manipulation">
              Book Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#0b5fff] touch-manipulation p-1"
            >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg">
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2.5 text-gray-700 hover:text-[#0b5fff] hover:bg-gray-50 rounded-md transition-colors touch-manipulation"
              >
                Product
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="block w-full text-left px-3 py-2.5 text-gray-700 hover:text-[#0b5fff] hover:bg-gray-50 rounded-md transition-colors touch-manipulation"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-3 py-2.5 text-gray-700 hover:text-[#0b5fff] hover:bg-gray-50 rounded-md transition-colors touch-manipulation"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="block w-full text-left px-3 py-2.5 text-gray-700 hover:text-[#0b5fff] hover:bg-gray-50 rounded-md transition-colors touch-manipulation"
              >
                Resources
              </button>
              <div className="pt-2">
                <button className="w-full bg-[#ff6b6b] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff5252] transition-colors touch-manipulation">
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;