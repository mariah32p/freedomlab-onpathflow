import React from 'react';
import Header from '../components/Header';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Start with a 7-day free trial. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Basic Plan */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-colors duration-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
                <p className="text-slate-600 mb-6">Perfect for getting started</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-slate-900">$9</span>
                  <span className="text-slate-600 text-lg">/month</span>
                </div>

                <button className="w-full bg-slate-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-8">
                  Start 7-Day Free Trial
                </button>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Up to 5 goal paths</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Basic progress tracking</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Email reminders</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Mobile app access</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
                <p className="text-slate-600 mb-6">For serious goal achievers</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-slate-900">$29</span>
                  <span className="text-slate-600 text-lg">/month</span>
                </div>

                <button className="w-full bg-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-8">
                  Start 7-Day Free Trial
                </button>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Unlimited goal paths</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Advanced analytics & insights</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Smart AI recommendations</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Custom integrations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  How does the free trial work?
                </h3>
                <p className="text-slate-600">
                  Start your 7-day free trial with full access to all features. We'll ask for your payment method upfront, but you won't be charged until the trial ends. Cancel anytime during the trial with no charges.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-slate-600">
                  Yes! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately with prorated billing.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  What happens if I cancel?
                </h3>
                <p className="text-slate-600">
                  You can cancel anytime from your account settings. You'll continue to have access until the end of your current billing period, and your data will be safely stored for 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">OnPathFlow</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 OnPathFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;