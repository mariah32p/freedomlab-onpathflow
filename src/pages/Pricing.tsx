import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { products } from '../stripe-config';
import { Alert } from '../components/Alert';
import { CheckCircle, Target, Loader } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Target className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start tracking your clients' progress with beautiful visual paths and automated milestone celebrations.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </div>
        )}

        <div className="max-w-lg mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl border-2 border-indigo-200 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Visual progress paths for unlimited clients',
                  'Automated milestone celebrations',
                  'Custom check-in schedules',
                  'Progress reports and analytics',
                  'Client communication tools',
                  'Mobile-responsive client portal',
                  'Email support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(product.priceId, product.mode)}
                disabled={loading === product.priceId}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading === product.priceId ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  'Start Free Trial'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                14-day free trial • Cancel anytime • No setup fees
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Questions about our pricing?{' '}
            <a href="mailto:support@onpathflow.com" className="text-indigo-600 hover:text-indigo-500">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};