import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';
import { CheckCircle, Target, Loader, Crown, Zap } from 'lucide-react';

export const Pricing: React.FC = () => {
  const { user, session } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user || !session) {
      window.location.href = '/login';
      return;
    }

    setLoading(priceId);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to start checkout process');
      setLoading(null);
    }
  };

  const basicFeatures = [
    'Up to 3 active goal paths',
    'Up to 20 clients tracked',
    'Basic milestone paths (up to 10 milestones per path)',
    'Client self-tracking via shared links',
    'Simple progress dashboard',
    'Basic check-in notes'
  ];

  const proFeatures = [
    'Everything in Basic, plus:',
    'Unlimited goal paths',
    'Up to 100 clients tracked',
    'Custom celebrations - Personalized milestone completion messages',
    'Path templates - Save and reuse common goal structures',
    'Client analytics - Track engagement and completion rates',
    'Email notifications - Get notified when clients complete milestones'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-brand-teal bg-opacity-10 p-4 rounded-2xl">
              <Target className="h-12 w-12 text-brand-teal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start tracking your clients' progress with beautiful visual paths and automated milestone celebrations.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-8 hover:shadow-2xl transition-shadow">
            <div className="text-center mb-8">
              <div className="bg-brand-teal bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-brand-teal" />
              </div>
              <h2 className="text-3xl font-bold text-brand-navy mb-2">Basic Plan</h2>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-bold text-brand-navy">$29</span>
                <span className="text-gray-500 ml-2 text-lg">/month</span>
              </div>
              <p className="text-gray-600 font-medium">Perfect for individual coaches, small practice, freelancers</p>
            </div>

            <div className="space-y-4 mb-8">
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe('price_basic_plan', 'subscription')}
              disabled={loading === 'price_basic_plan'}
              className="w-full bg-brand-teal text-white py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading === 'price_basic_plan' ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                'Start Free Trial'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              7-day free trial • Cancel anytime • No setup fees
            </p>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-3xl shadow-xl border-2 border-brand-purple p-8 relative hover:shadow-2xl transition-shadow">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-brand-purple text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                <Crown className="h-4 w-4" />
                <span>MOST POPULAR</span>
              </div>
            </div>

            <div className="text-center mb-8 mt-4">
              <div className="bg-brand-purple bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Crown className="h-8 w-8 text-brand-purple" />
              </div>
              <h2 className="text-3xl font-bold text-brand-navy mb-2">Pro Plan</h2>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl font-bold text-brand-navy">$49</span>
                <span className="text-gray-500 ml-2 text-lg">/month</span>
              </div>
              <p className="text-gray-600 font-medium">Perfect for coaching businesses, course creators, team coaches</p>
            </div>

            <div className="space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    index === 0 ? 'text-brand-purple' : 'text-brand-purple'
                  }`} />
                  <span className={`${
                    index === 0 ? 'text-brand-purple font-semibold' : 'text-gray-700'
                  }`}>{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe('price_pro_plan', 'subscription')}
              disabled={loading === 'price_pro_plan'}
              className="w-full bg-brand-purple text-white py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading === 'price_pro_plan' ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                'Start Free Trial'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              7-day free trial • Cancel anytime • No setup fees
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-brand-navy mb-4">
              All Plans Include Core MVP Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                'Visual Goal Path Builder',
                'Client Progress Tracking', 
                'Shareable Client Links',
                'Simple Check-ins',
                'Coach Dashboard',
                'Basic Celebrations'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};