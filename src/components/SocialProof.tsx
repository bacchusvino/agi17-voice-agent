import React from 'react';
import { TrendingUp } from 'lucide-react';

const SocialProof = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Case Study Highlight */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-full font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            <TrendingUp className="mr-1 sm:mr-2" size={14} className="sm:w-4 sm:h-4" />
            Success Story
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            20% more booked calls in 30 days
          </h2>
          <p className="text-gray-600 text-base sm:text-lg px-4">
            See how companies are transforming their outbound results
          </p>
        </div>

        {/* Company Logos */}
        <div className="space-y-6 sm:space-y-8">
          <p className="text-center text-gray-500 font-medium">
            Trusted by companies across industries
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center opacity-60">
            {/* SaaS Companies */}
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              TechFlow
            </div>
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              DataSync
            </div>
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              CloudVault
            </div>
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              AutoScale
            </div>
            
            {/* Service Providers */}
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              ProConsult
            </div>
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              DevStudio
            </div>
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              MarketPro
            </div>
            <div className="bg-gray-200 h-10 sm:h-12 w-20 sm:w-24 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-gray-600">
              GrowthLab
            </div>
          </div>
        </div>

        {/* Industry Categories */}
        <div className="mt-8 sm:mt-12 grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">B2B SaaS</h3>
            <p className="text-gray-600 text-sm">Scaling customer acquisition for growing software companies</p>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Professional Services</h3>
            <p className="text-gray-600 text-sm">Helping consultancies and agencies find ideal clients</p>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Startups</h3>
            <p className="text-gray-600 text-sm">Enabling lean teams to punch above their weight in sales</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;