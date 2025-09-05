import React from 'react';
import { LogOut } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { useStripe } from '../hooks/useStripe';

const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { profile, isPremium, isTrialing } = useSubscription();
  const { createPortalSession } = useStripe();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleManageSubscription = async () => {
    try {
      await createPortalSession();
    } catch (error) {
      console.error('Error opening billing portal:', error);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">Manage your account and subscription</p>
        </div>

        <div className="space-y-8">
          {/* Account Info */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <p className="text-slate-900">{user?.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isPremium() ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {profile?.plan?.toUpperCase() || 'STANDARD'}
                  </span>
                  {isTrialing() && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      Free Trial
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Management */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Subscription</h2>
            
            <div className="space-y-4">
              <button
                onClick={handleManageSubscription}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200"
              >
                Manage Billing
              </button>
              <p className="text-slate-500 text-sm">
                Update payment method, view invoices, or cancel subscription
              </p>
            </div>
          </div>

          {/* Sign Out */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;