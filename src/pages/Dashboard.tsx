import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import { Target, Crown, Calendar, CreditCard } from 'lucide-react';

interface Subscription {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (error) {
          console.error('Error fetching subscription:', error);
        } else {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const getSubscriptionStatus = () => {
    if (!subscription) return 'No active subscription';
    
    const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
    const productName = product?.name || 'Unknown Plan';
    
    switch (subscription.subscription_status) {
      case 'active':
        return `${productName} - Active`;
      case 'trialing':
        return `${productName} - Trial`;
      case 'past_due':
        return `${productName} - Past Due`;
      case 'canceled':
        return `${productName} - Canceled`;
      case 'not_started':
        return 'No active subscription';
      default:
        return `${productName} - ${subscription.subscription_status}`;
    }
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Status Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center mb-4">
              <Crown className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Subscription Status</h2>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Current Plan</span>
                <p className="font-medium text-gray-900">{getSubscriptionStatus()}</p>
              </div>
              
              {subscription?.current_period_end && (
                <div>
                  <span className="text-sm text-gray-500">Next Billing Date</span>
                  <p className="font-medium text-gray-900">
                    {formatDate(subscription.current_period_end)}
                  </p>
                </div>
              )}
              
              {subscription?.cancel_at_period_end && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    Your subscription will cancel at the end of the current period.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Card */}
          {subscription?.payment_method_brand && (
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Card</span>
                  <p className="font-medium text-gray-900">
                    {subscription.payment_method_brand?.toUpperCase()} ending in {subscription.payment_method_last4}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="space-y-3">
              {!subscription || subscription.subscription_status === 'not_started' ? (
                <a
                  href="/pricing"
                  className="block w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Subscribe Now
                </a>
              ) : (
                <div className="space-y-2">
                  <button className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                    Manage Subscription
                  </button>
                  <button className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                    Download Invoice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8 border">
          <div className="text-center">
            <Target className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to OnPathFlow
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Your visual goal tracking and milestone management platform is ready to help you keep your clients motivated and on track.
            </p>
            
            {subscription?.subscription_status === 'active' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  You're all set!
                </h3>
                <p className="text-green-700">
                  Your subscription is active and you have full access to all OnPathFlow features.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Ready to get started?
                </h3>
                <p className="text-blue-700 mb-4">
                  Subscribe to OnPathFlow to unlock all features and start tracking your clients' progress.
                </p>
                <a
                  href="/pricing"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Pricing Plans
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};