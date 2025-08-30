import React from 'react';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Build Your Path to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600"> Success</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your goals into clear, actionable paths. OnPathFlow helps you visualize, plan, and achieve your objectives with our intuitive goal mapping platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="text-slate-600 hover:text-slate-900 font-semibold text-lg flex items-center gap-2">
                View Pricing
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* First Mockup Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Visualize Your Path to Success
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how OnPathFlow transforms complex goals into clear, actionable steps
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {/* Mockup of goal path builder */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Launch My Startup</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Goal path visualization */}
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1 bg-emerald-100 rounded-lg p-3">
                    <span className="text-emerald-800 font-medium">Market Research</span>
                    <div className="text-sm text-emerald-600 mt-1">Completed • 2 weeks</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="flex-1 bg-blue-100 rounded-lg p-3">
                    <span className="text-blue-800 font-medium">Build MVP</span>
                    <div className="text-sm text-blue-600 mt-1">In Progress • 4 weeks remaining</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                  <div className="flex-1 bg-slate-100 rounded-lg p-3">
                    <span className="text-slate-600 font-medium">Launch Campaign</span>
                    <div className="text-sm text-slate-500 mt-1">Pending • 6 weeks</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                  <div className="flex-1 bg-slate-100 rounded-lg p-3">
                    <span className="text-slate-600 font-medium">Scale & Grow</span>
                    <div className="text-sm text-slate-500 mt-1">Pending • 10 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to help you plan, track, and achieve your goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Visual Path Mapping</h3>
              <p className="text-slate-600 leading-relaxed">
                Create clear, visual representations of your goal paths with our intuitive drag-and-drop interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Progress Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Monitor your progress with detailed analytics and milestone tracking to stay motivated.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Reminders</h3>
              <p className="text-slate-600 leading-relaxed">
                Never miss a deadline with intelligent notifications and personalized reminder systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Mockup Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Track Progress Like Never Before
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get detailed insights and analytics to keep you motivated and on track
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {/* Mockup of progress dashboard */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Progress Dashboard</h3>
                <div className="text-sm text-slate-500">Last updated: 2 hours ago</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">73%</div>
                  <div className="text-sm text-emerald-700">Goals Completed</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-blue-700">Active Paths</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">28</div>
                  <div className="text-sm text-purple-700">Days Streak</div>
                </div>
              </div>
              
              {/* Progress bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Career Development</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Health & Fitness</span>
                    <span>62%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '62%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Financial Goals</span>
                    <span>41%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '41%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Goals?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join thousands of achievers who've turned their dreams into reality with OnPathFlow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Your 7-Day Free Trial
            </button>
            <button className="text-white hover:text-emerald-100 font-semibold text-lg flex items-center gap-2">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">OnPathFlow</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 OnPathFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;