import React from 'react';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Users, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full">
                <Target className="h-5 w-5 text-indigo-600" />
                <span className="text-indigo-600 font-medium">Visual Goal Tracking</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Keep Your Clients
              <span className="text-indigo-600 block">On The Path</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Visual goal tracking and milestone management for coaches, trainers, and course creators. 
              Keep clients motivated with beautiful progress paths, automated check-ins, and celebration moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Track Progress
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for coaches and course creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visual Progress Paths</h3>
              <p className="text-gray-600">
                Create beautiful, interactive progress paths that show clients exactly where they are and where they're going.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Milestone Tracking</h3>
              <p className="text-gray-600">
                Set up automated milestone celebrations and check-ins to keep your clients engaged and motivated.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Management</h3>
              <p className="text-gray-600">
                Manage all your clients in one place with detailed progress reports and communication tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Coaches Choose OnPathFlow
              </h2>
              <div className="space-y-4">
                {[
                  'Increase client retention by 40% with visual progress tracking',
                  'Save 5+ hours per week with automated check-ins',
                  'Boost client motivation with celebration moments',
                  'Professional progress reports that wow your clients',
                  'Easy integration with your existing workflow'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-10 w-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Join hundreds of coaches already using OnPathFlow to keep their clients motivated and on track.
                </p>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-block"
                >
                  Start Your Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};