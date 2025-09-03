import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Plus, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import { useSubscription } from '../hooks/useSubscription';

const DashboardPage: React.FC = () => {
  const { profile, loading, isTrialing, isPremium } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        {/* Trial Banner */}
        {isTrialing() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800">
              🎉 You're on a free trial! {isPremium() ? 'Premium' : 'Standard'} plan active.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome to your coaching platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Clients</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
              </div>
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Active Goals</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <div className="text-center">
            <Target className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Started</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Ready to help your clients achieve their goals? Start by adding your first client.
            </p>
            
            <Link 
              to="/clients"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Client</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;