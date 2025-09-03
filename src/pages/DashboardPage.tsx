import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, TrendingUp, Settings, Bell, LogOut, Calendar, Trophy, AlertCircle, Clock, Plus, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';

const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { 
    profile, 
    loading, 
    isTrialing, 
    isActive,
    isPastDue,
    isCanceled,
    isNotStarted, 
    isInGracePeriod, 
    isPremium, 
    isStandard,
    getClientLimit,
    getPathLimit
  } = useSubscription();

  const handleSignOut = async () => {
    await signOut();
  };

  const getTrialDaysLeft = () => {
    if (!profile?.trial_ends_at) return 0;
    const trialEnd = new Date(profile.trial_ends_at);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Show loading state while profile is loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">OnPathFlow</h1>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isPremium() 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {profile?.plan?.toUpperCase() || 'STANDARD'}
                  </span>
                  <span className="text-slate-500 text-sm">Coach Dashboard</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
              <Link to="/settings">
                <Settings className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4">
            <Link 
              to="/dashboard" 
              className="text-emerald-600 border-b-2 border-emerald-600 pb-2 px-1 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/clients" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Clients
            </Link>
            <Link 
              to="/paths" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Goal Paths
            </Link>
            <Link 
              to="/analytics" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Analytics
            </Link>
          </nav>
        </div>
      </div>

      {/* Account Status Banners */}
      {isNotStarted() && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  Setting up your account... This may take a few moments.
                </span>
              </div>
              <Link 
                to="/get-started" 
                className="text-blue-100 hover:text-white font-medium text-sm underline"
              >
                Complete Setup
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trial Banner */}
      {isTrialing() && profile?.trial_ends_at && (
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">
                  Trial ends in {getTrialDaysLeft()} days. Your card will be charged on {formatDate(profile.trial_ends_at)}.
                </span>
              </div>
              <Link 
                to="/settings" 
                className="text-emerald-100 hover:text-white font-medium text-sm underline"
              >
                Manage in Settings
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Payment Issue Banner */}
      {isPastDue() && isInGracePeriod() && (
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">
                  Payment issue detected. Please update your payment method to continue service.
                </span>
              </div>
              <Link 
                to="/settings" 
                className="text-red-100 hover:text-white font-medium text-sm underline"
              >
                Update Payment
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h2>
          <div className="flex items-center space-x-4">
            <p className="text-slate-600">
              Here's what's happening with your coaching practice today.
            </p>
            {isPremium() && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Premium Features Unlocked
              </span>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-emerald-700">
                  {getClientLimit() ? `0/${getClientLimit()}` : '∞'}
                </p>
              </div>
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Active Paths</p>
                <p className="text-3xl font-bold text-blue-700">
                  {getPathLimit() ? `0/${getPathLimit()}` : '∞'}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-purple-700">--</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-amber-700">$0</p>
              </div>
              <Trophy className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Welcome to OnPathFlow!</h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              You're all set up and ready to start helping your clients achieve their goals. 
              Let's get you started with creating your first client and goal path.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Add Your First Client</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Start by adding a client and setting up their profile
                </p>
                <Link 
                  to="/clients/new"
                  className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Client</span>
                </Link>
                {getClientLimit() && (
                  <p className="text-emerald-600 text-xs mt-2">Standard: Up to {getClientLimit()} clients</p>
                )}
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Create a Goal Path</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Build your first milestone path template
                </p>
                <Link 
                  to="/paths/new"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Create Path</span>
                </Link>
                {getPathLimit() && (
                  <p className="text-blue-600 text-xs mt-2">Standard: Up to {getPathLimit()} paths per client</p>
                )}
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Customize Settings</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Set up your coaching preferences and notifications
                </p>
                <Link 
                  to="/analytics"
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>View Analytics</span>
                </Link>
                {isPremium() && (
                  <p className="text-purple-600 text-xs mt-2">Premium: Advanced analytics included</p>
                )}
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3">Account Status</h4>
              
              {/* Debug Sync Button - Remove after testing */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-subscriptions`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                      const result = await response.json();
                      console.log('Sync result:', result);
                      alert(`Sync complete: ${result.synced} synced, ${result.errors} errors`);
                      window.location.reload();
                    } catch (error) {
                      console.error('Sync error:', error);
                      alert('Sync failed - check console');
                    }
                  }}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 text-sm"
                >
                  🔄 Sync Subscriptions (Debug)
                </button>
                <p className="text-blue-600 text-xs mt-1">Click to manually sync subscription data from Stripe</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Plan:</span>
                  <span className={`font-medium capitalize ${isPremium() ? 'text-purple-600' : 'text-slate-900'}`}>
                    {profile?.plan || 'Standard'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className={`font-medium capitalize ${
                    isTrialing() ? 'text-blue-600' :
                    isActive() ? 'text-emerald-600' :
                    isPastDue() ? 'text-red-600' :
                    isCanceled() ? 'text-slate-600' :
                    'text-amber-600'
                  }`}>
                    {isTrialing() ? 'Free Trial' :
                     isActive() ? 'Active' :
                     isPastDue() ? 'Payment Issue' :
                     isCanceled() ? 'Canceled' :
                     'Setting Up...'}
                  </span>
                </div>
                {profile?.trial_ends_at && (
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
                <div className="flex justify-between">
                  <span className="text-slate-600">Member Since:</span>
                  <span className="font-medium text-slate-900">{formatDate(profile?.created_at)}</span>
                </div>
              </div>
              
              {/* Action Buttons Based on Status */}
              <div className="mt-4 space-y-2">
                {isNotStarted() && (
                  <Link 
                    to="/get-started"
                    className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 text-center block"
                  >
                    Complete Account Setup
                  </Link>
                )}
                
                {(isTrialing() || isActive()) && (
                  <Link 
                    to="/settings"
                    className="w-full bg-slate-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-600 transition-colors duration-200 text-center block"
                  >
                    Manage Subscription
                  </Link>
                )}
                
                {isPastDue() && (
                  <Link 
                    to="/settings"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 text-center block"
                  >
                    Fix Payment Issue
                  </Link>
                )}
                
                {isCanceled() && (
                  <Link 
                    to="/get-started"
                    className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 text-center block"
                  >
                    Reactivate Subscription
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;