import React, { useState } from 'react';
import { User, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { useStripe } from '../hooks/useStripe';

const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { profile, isPremium, isTrialing, isActive, isPastDue } = useSubscription();
  const { createPortalSession } = useStripe();
  const [activeTab, setActiveTab] = useState<'account' | 'billing' | 'notifications' | 'security'>('account');

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600 mt-1">Manage your account and subscription preferences</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-500"
                      />
                      <p className="text-slate-500 text-sm mt-1">
                        Contact support to change your email address
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Account Type
                      </label>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isPremium() 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {profile?.plan?.toUpperCase() || 'STANDARD'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isTrialing() ? 'bg-blue-100 text-blue-700' :
                          isActive() ? 'bg-emerald-100 text-emerald-700' :
                          isPastDue() ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {isTrialing() ? 'Free Trial' :
                           isActive() ? 'Active' :
                           isPastDue() ? 'Payment Issue' :
                           'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Member Since
                      </label>
                      <p className="text-slate-900">{formatDate(profile?.created_at)}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
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
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Billing & Subscription</h2>
                  
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Plan</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isPremium() 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {profile?.plan?.toUpperCase() || 'STANDARD'}
                            </span>
                            <span className="text-2xl font-bold text-slate-900">
                              ${isPremium() ? '49' : '29'}/month
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm">
                            {isPremium() ? 'Unlimited clients and advanced features' : 'Up to 10 clients with core features'}
                          </p>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Status:</span>
                            <span className={`font-medium ${
                              isTrialing() ? 'text-blue-600' :
                              isActive() ? 'text-emerald-600' :
                              isPastDue() ? 'text-red-600' :
                              'text-amber-600'
                            }`}>
                              {isTrialing() ? 'Free Trial' :
                               isActive() ? 'Active' :
                               isPastDue() ? 'Payment Issue' :
                               'Inactive'}
                            </span>
                          </div>
                          
                          {profile?.trial_ends_at && isTrialing() && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">Trial Ends:</span>
                              <span className="font-medium text-slate-900">{formatDate(profile.trial_ends_at)}</span>
                            </div>
                          )}
                          
                          {profile?.current_period_end && isActive() && (
                            <div className="flex justify-between">
                              <span className="text-slate-600">Next Billing:</span>
                              <span className="font-medium text-slate-900">{formatDate(profile.current_period_end)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Manage Subscription */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Manage Subscription</h3>
                      <div className="space-y-3">
                        <button
                          onClick={handleManageSubscription}
                          className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200"
                        >
                          Open Billing Portal
                        </button>
                        <p className="text-slate-500 text-sm">
                          Update payment method, view invoices, or cancel your subscription
                        </p>
                      </div>
                    </div>

                    {/* Plan Comparison */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Plan Features</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-slate-200 rounded-xl p-6">
                          <h4 className="font-semibold text-slate-900 mb-3">Standard - $29/month</h4>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Up to 10 clients</li>
                            <li>• Up to 5 goal paths per client</li>
                            <li>• Progress tracking & analytics</li>
                            <li>• Milestone tracking</li>
                          </ul>
                        </div>
                        
                        <div className="border-2 border-emerald-500 rounded-xl p-6 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              PREMIUM
                            </span>
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-3">Premium - $49/month</h4>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• Unlimited clients</li>
                            <li>• Unlimited goal paths per client</li>
                            <li>• Advanced analytics dashboard</li>
                            <li>• Client performance leaderboards</li>
                            <li>• Priority support</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { id: 'milestone_completed', label: 'Milestone completions', description: 'When clients complete milestones' },
                          { id: 'goal_progress', label: 'Goal progress updates', description: 'Weekly progress summaries' },
                          { id: 'client_inactive', label: 'Client inactivity alerts', description: 'When clients haven\'t updated progress in 7 days' },
                          { id: 'payment_reminders', label: 'Payment reminders', description: 'Billing and payment notifications' }
                        ].map((notification) => (
                          <div key={notification.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-slate-900">{notification.label}</h4>
                              <p className="text-slate-600 text-sm">{notification.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Password</h3>
                      <div className="space-y-4">
                        <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors duration-200">
                          Change Password
                        </button>
                        <p className="text-slate-500 text-sm">
                          Last changed: Never
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                            <p className="text-slate-600 text-sm">Add an extra layer of security to your account</p>
                          </div>
                          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Data & Privacy</h3>
                      <div className="space-y-4">
                        <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900">
                          <HelpCircle className="w-4 h-4" />
                          <span>Download your data</span>
                        </button>
                        <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                          <HelpCircle className="w-4 h-4" />
                          <span>Delete account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;