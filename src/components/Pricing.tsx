import React, { useState } from 'react';
import { Check, X, Star, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with outbound automation",
      monthlyPrice: 299,
      annualPrice: 2390, // 20% discount
      features: [
        "Up to 500 prospects/month",
        "Email + LinkedIn outreach",
        "Basic AI qualification",
        "CRM integration (1 platform)",
        "Email support",
        "Basic analytics dashboard"
      ],
      limitations: [
        "No phone calls",
        "No video personalization",
        "Limited templates"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Growth",
      description: "Most popular for scaling teams ready to automate their entire outbound process",
      monthlyPrice: 599,
      annualPrice: 4792, // 20% discount
      features: [
        "Up to 2,000 prospects/month",
        "Multi-channel outreach (email, LinkedIn, calls)",
        "Advanced AI qualification calls",
        "Personalized video creation",
        "CRM integration (unlimited)",
        "Priority support",
        "Advanced analytics & reporting",
        "Custom AI training",
        "A/B testing capabilities"
      ],
      limitations: [],
      popular: true,
      cta: "Book Demo"
    },
    {
      name: "Scale",
      description: "For enterprise teams with high-volume outbound requirements",
      monthlyPrice: 1299,
      annualPrice: 10392, // 20% discount
      features: [
        "Up to 10,000 prospects/month",
        "Everything in Growth",
        "Advanced conversation AI",
        "Custom integrations",
        "Dedicated success manager",
        "White-label options",
        "Advanced security & compliance",
        "Custom reporting",
        "API access",
        "Multi-team management"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    {
      name: "Extra Prospects",
      description: "Additional prospect capacity beyond your plan limit",
      price: "From $0.50/prospect"
    },
    {
      name: "Premium Integrations",
      description: "Advanced CRM features and custom integrations",
      price: "$199/month"
    },
    {
      name: "Dedicated IP",
      description: "Dedicated sending infrastructure for better deliverability",
      price: "$299/month"
    }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Choose the plan that fits your outbound volume. All plans include our core AI automation features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 text-sm sm:text-base">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0b5fff] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } touch-manipulation`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#0b5fff] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } touch-manipulation`}
            >
              Annual
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-[#0b5fff] lg:scale-105'
                  : 'border-gray-200 hover:border-[#0b5fff]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#0b5fff] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center">
                    <Star className="mr-1" size={12} className="sm:w-4 sm:h-4" fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{plan.description}</p>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)}
                    </span>
                    <span className="text-gray-600 ml-1 sm:ml-2 text-sm sm:text-base">/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 mt-1">
                      Billed annually (${plan.annualPrice}/year)
                    </p>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-6 ${
                    plan.popular
                      ? 'bg-[#ff6b6b] text-white hover:bg-[#ff5252] transform hover:scale-105 shadow-lg'
                      : 'bg-[#0b5fff] text-white hover:bg-[#0951e6] transform hover:scale-105 shadow-lg'
                  } touch-manipulation text-sm sm:text-base`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-1 sm:ml-2 inline" size={14} className="sm:w-4 sm:h-4" />
                </button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">What's included:</h4>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" size={14} className="sm:w-4 sm:h-4" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mt-3 sm:mt-4 text-sm sm:text-base">Not included:</h4>
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="flex items-start">
                          <X className="text-gray-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" size={14} className="sm:w-4 sm:h-4" />
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Add-ons & Extras</h3>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{addon.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{addon.description}</p>
                <p className="text-[#0b5fff] font-semibold text-sm sm:text-base">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Pricing FAQ</h3>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-left max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Can I change plans anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">What happens if I exceed my prospect limit?</h4>
              <p className="text-gray-600 text-sm">You can purchase additional prospects at $0.50 each, or upgrade to a higher plan.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">Yes, all plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee if you're not satisfied with the results.</p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-[#0b5fff] to-[#3b7dff] rounded-2xl p-6 sm:p-8 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Need a custom solution?</h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 px-4">
            Enterprise teams with unique requirements can get custom pricing and features.
          </p>
          <button className="bg-white text-[#0b5fff] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base touch-manipulation">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;