import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import { stripeConfig } from '../lib/stripe-config';
import { useStripe } from '../hooks/useStripe';

const GetStartedPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('premium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { createCheckoutSession } = useStripe();

  const handleStartTrial = async () => {
    setError('');
    setLoading(true);
    
    try {
      const config = stripeConfig.products[selectedPlan];
      await createCheckoutSession(config.priceId, selectedPlan, false);
      
      // Show success message while checkout window is open
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout process');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start your 7-day free trial with full access to all features. Choose the plan that fits your coaching practice.
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 max-w-2xl mx-auto mt-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Standard Plan */}
          <div 
            className={`bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 ${
              selectedPlan === 'standard' 
                ? 'border-emerald-500 shadow-lg transform scale-105' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => setSelectedPlan('standard')}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Standard</h3>
              <p className="text-slate-600 mb-6">Perfect for getting started</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-900">$29</span>
                <span className="text-slate-600 text-lg">/month</span>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Up to 10 clients</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Up to 5 goal paths per client</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Progress tracking & analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Milestone tracking & celebrations</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div 
            className={`bg-gradient-to-br from-emerald-50 to-blue-50 border-2 rounded-2xl p-8 cursor-pointer transition-all duration-200 relative ${
              selectedPlan === 'premium' 
                ? 'border-emerald-500 shadow-lg transform scale-105' 
                : 'border-emerald-300 hover:border-emerald-400'
            }`}
            onClick={() => setSelectedPlan('premium')}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
              <p className="text-slate-600 mb-6">For serious coaches</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-900">$49</span>
                <span className="text-slate-600 text-lg">/month</span>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Unlimited clients</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Unlimited goal paths per client</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Advanced analytics dashboard</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="text-slate-700">Client performance leaderboards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Start Trial Button */}
        <div className="text-center">
          <button
            onClick={handleStartTrial}
            disabled={loading}
            className="bg-emerald-500 text-white px-12 py-4 rounded-xl font-bold text-xl hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Opening Checkout...</span>
              </div>
            ) : (
              `Start 7-Day Trial (${selectedPlan === 'standard' ? '$29' : '$49'}/month after trial)`
            )}
          </button>
          
          <p className="text-slate-500 text-sm mt-4">
            Checkout opens in new window • Full access during trial • Cancel anytime • No charges until trial ends
          </p>
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;