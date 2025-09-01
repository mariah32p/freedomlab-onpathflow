import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, TrendingUp, Settings, Bell, LogOut, CreditCard, Calendar, Star, Trophy } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { profile, isTrialing, hasActiveSubscription } = useProfile();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
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
                    profile?.plan === 'premium' 
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
              <Settings className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h2>
          <p className="text-slate-600">
            Here's what's happening with your coaching practice today.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-emerald-700">0</p>
              </div>
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Active Paths</p>
                <p className="text-3xl font-bold text-blue-700">0</p>
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
                <button className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200">
                  Add Client
                </button>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Create a Goal Path</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Build your first milestone path template
                </p>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
                  Create Path
                </button>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Customize Settings</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Set up your coaching preferences and notifications
                </p>
                <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200">
                  Open Settings
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3">Account Status</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Plan:</span>
                  <span className="font-medium text-slate-900 capitalize">{profile?.plan || 'Standard'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className={`font-medium capitalize ${
                    hasActiveSubscription() ? 'text-emerald-600' : 'text-slate-600'
                  }`}>
                    {profile?.subscription_status?.replace('_', ' ') || 'Not Started'}
                  </span>
                </div>
                {profile?.trial_ends_at && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Trial Ends:</span>
                    <span className="font-medium text-slate-900">{formatDate(profile.trial_ends_at)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Member Since:</span>
                  <span className="font-medium text-slate-900">{formatDate(profile?.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;