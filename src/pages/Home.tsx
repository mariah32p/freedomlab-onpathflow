import React from 'react';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Users, CheckCircle, Eye, MessageSquare, BarChart3, Bell, Zap, Crown } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-purple-900 opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-brand-teal bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full border border-brand-teal border-opacity-30">
                <Target className="h-5 w-5 text-brand-teal" />
                <span className="text-brand-teal font-semibold">Visual Goal Tracking Platform</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Keep Your Clients
              <span className="text-brand-teal block">On The Path</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Visual goal tracking and milestone management for coaches, trainers, and course creators. 
              Keep clients motivated with beautiful progress paths, automated check-ins, and celebration moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="bg-brand-teal text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-opacity-90 transition-all shadow-2xl transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-brand-teal text-brand-teal bg-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-brand-teal hover:text-white transition-all shadow-xl"
              >
                View Pricing
              </Link>
            </div>
            
            <p className="text-gray-300 mt-6 text-sm">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Core MVP Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Core MVP Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create engaging visual progress tracking for your clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-brand-teal bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-brand-teal" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Visual Goal Path Builder</h3>
              <p className="text-gray-600 leading-relaxed">
                Create milestone-based paths for client goals with an intuitive visual interface that makes progress tangible and motivating.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-brand-purple bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Client Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Clients check off completed milestones themselves, creating ownership and accountability in their journey.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-brand-navy bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Shareable Client Links</h3>
              <p className="text-gray-600 leading-relaxed">
                Send clients their personal progress page with a simple link - no app downloads or complex logins required.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-brand-teal bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-brand-teal" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Simple Check-ins</h3>
              <p className="text-gray-600 leading-relaxed">
                Clients can add notes and photos when completing milestones, creating rich progress documentation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-brand-purple bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Coach Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                See all clients' progress at a glance with a comprehensive overview that keeps you informed and engaged.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-brand-navy bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Basic Celebrations</h3>
              <p className="text-gray-600 leading-relaxed">
                Simple "congrats" messages when milestones are completed to keep clients motivated and engaged.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your coaching practice. Start with our 14-day free trial.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-8 relative hover:shadow-2xl transition-shadow">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Basic Plan</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-brand-navy">$29</span>
                  <span className="text-gray-500 ml-2 text-lg">/month</span>
                </div>
                <p className="text-gray-600 font-medium">Perfect for individual coaches, small practice, freelancers</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Up to 3 active goal paths',
                  'Up to 20 clients tracked',
                  'Basic milestone paths (up to 10 milestones per path)',
                  'Client self-tracking via shared links',
                  'Simple progress dashboard',
                  'Basic check-in notes'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="block w-full bg-brand-teal text-white text-center py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-colors"
              >
                Start Free Trial
              </Link>
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
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Pro Plan</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-brand-navy">$49</span>
                  <span className="text-gray-500 ml-2 text-lg">/month</span>
                </div>
                <p className="text-gray-600 font-medium">Perfect for coaching businesses, course creators, team coaches</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-sm font-semibold text-brand-purple mb-3">Everything in Basic, plus:</div>
                {[
                  'Unlimited goal paths',
                  'Up to 100 clients tracked',
                  'Custom celebrations - Personalized milestone completion messages',
                  'Path templates - Save and reuse common goal structures',
                  'Client analytics - Track engagement and completion rates',
                  'Email notifications - Get notified when clients complete milestones'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-purple flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="block w-full bg-brand-purple text-white text-center py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Questions about our pricing?{' '}
              <a href="mailto:support@onpathflow.com" className="text-brand-teal hover:text-opacity-80 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-brand-teal to-opacity-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8 leading-tight">
                Why Coaches Choose OnPathFlow
              </h2>
              <div className="space-y-6">
                {[
                  'Increase client retention by 40% with visual progress tracking',
                  'Save 5+ hours per week with automated check-ins',
                  'Boost client motivation with celebration moments',
                  'Professional progress reports that wow your clients',
                  'Easy integration with your existing workflow'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-brand-teal bg-opacity-10 rounded-full p-2">
                      <CheckCircle className="h-6 w-6 text-brand-teal flex-shrink-0" />
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-br from-brand-teal to-brand-purple w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Target className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-6">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Join hundreds of coaches already using OnPathFlow to keep their clients motivated and on track.
                </p>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-brand-teal to-brand-purple text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all inline-block transform hover:scale-105"
                >
                  Start Your Free Trial
                </Link>
                <p className="text-gray-500 mt-4 text-sm">
                  No credit card required for trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Trusted by Coaches Worldwide
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-teal mb-2">500+</div>
              <div className="text-gray-300">Active Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-teal mb-2">10K+</div>
              <div className="text-gray-300">Clients Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-teal mb-2">95%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <blockquote className="text-xl text-gray-200 italic mb-6">
              "OnPathFlow transformed how I work with my coaching clients. The visual progress paths keep them engaged, 
              and I love seeing their excitement when they complete milestones. My client retention has never been better."
            </blockquote>
            <div className="text-brand-teal font-semibold">
              Sarah Johnson, Life Coach
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-brand-teal to-brand-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Free Trial Today
          </h2>
          <p className="text-xl text-gray-100 mb-10 leading-relaxed">
            No credit card required. Set up your first goal path in under 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/signup"
              className="bg-white text-brand-navy px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white hover:text-brand-navy transition-colors"
            >
              View All Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};