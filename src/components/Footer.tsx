import React from 'react';
import { Mail, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              QualiFy
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              AI-powered outbound automation that finds, qualifies, and books meetings with your ideal prospects.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">Get weekly outbound playbooks</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0b5fff] focus:border-transparent text-sm sm:text-base"
                />
                <button className="bg-[#ff6b6b] px-3 sm:px-4 py-2 rounded-r-lg hover:bg-[#ff5252] transition-colors touch-manipulation">
                  <Mail size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Request Demo</a></li>
              <li><a href="#trial" className="hover:text-white transition-colors">Free Trial</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#customers" className="hover:text-white transition-colors">Customer Stories</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm">
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#api" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Email Templates</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Outbound Guides</a></li>
              <li><a href="#webinars" className="hover:text-white transition-colors">Webinars</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 text-gray-400 text-xs sm:text-sm">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#security" className="hover:text-white transition-colors">Security</a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
            © 2025 QualiFy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;