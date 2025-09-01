import React from 'react';
import { Target } from 'lucide-react';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                7-Day Free Trial Available
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Build Your Path to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600"> Success</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Transform your goals into clear, actionable paths. OnPathFlow helps you visualize, plan, and achieve your objectives with our intuitive goal mapping platform.
              </p>
              
              <div className="mb-6">
                <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-slate-600 text-sm">
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7-day free trial
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cancel anytime
                </div>
              </div>
            </div>
            
            {/* Right Column - Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">Senior Software Engineer Path</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Progress Overview */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Overall Progress</span>
                    <span className="text-sm font-semibold text-slate-800">75%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                {/* Milestone Steps */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1 bg-emerald-100 rounded-lg p-3">
                      <span className="text-emerald-800 font-medium text-sm">Master React & TypeScript</span>
                      <div className="text-xs text-emerald-600 mt-1">✓ Completed</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="flex-1 bg-blue-100 rounded-lg p-3">
                      <span className="text-blue-800 font-medium text-sm">Build Portfolio Projects</span>
                      <div className="text-xs text-blue-600 mt-1">🔄 In Progress</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                    <div className="flex-1 bg-slate-100 rounded-lg p-3">
                      <span className="text-slate-600 font-medium text-sm">Get AWS Certification</span>
                      <div className="text-xs text-slate-500 mt-1">📅 Upcoming</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              See OnPathFlow in Action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Watch how coaches and clients use OnPathFlow to turn ambitious goals into clear, actionable paths
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Demo Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">OnPathFlow</h3>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">PRO</span>
                          <span className="text-slate-500 text-sm">Coach Dashboard</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Demo Content */}
                <div className="p-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-700">24</div>
                        <div className="text-emerald-600 text-sm">Total Clients</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-700">47</div>
                        <div className="text-blue-600 text-sm">Active Paths</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-700">89%</div>
                        <div className="text-purple-600 text-sm">Completion</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-700">$2,847</div>
                        <div className="text-amber-600 text-sm">Revenue</div>
                      </div>
                    </div>
                  </div>

                  {/* Client Activity */}
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h4 className="font-semibold text-slate-800 mb-4">Recent Client Activity</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                            alt="Sarah Chen"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-slate-800 text-sm">Sarah Chen</div>
                            <div className="text-slate-600 text-xs">Senior Software Engineer</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="text-center">
                            <div className="font-bold text-emerald-600">75%</div>
                            <div className="text-slate-500">Progress</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600">12</div>
                            <div className="text-slate-500">Streak</div>
                          </div>
                          <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                            High
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                            alt="Marcus Rodriguez"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-slate-800 text-sm">Marcus Rodriguez</div>
                            <div className="text-slate-600 text-xs">VP of Product</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="text-center">
                            <div className="font-bold text-emerald-600">67%</div>
                            <div className="text-slate-500">Progress</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600">8</div>
                            <div className="text-slate-500">Streak</div>
                          </div>
                          <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                            High
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/demo" 
              className="inline-flex items-center bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Try Interactive Demo
            </Link>
          </div>
        </div>
      </section>

      {/* First Mockup Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-lg text-amber-800 font-medium">
                "I want to become a Senior Software Engineer at a top tech company"
              </p>
              <p className="text-sm text-amber-600 mt-2">— Sarah, Current Junior Developer</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Here's how Sarah mapped her path from Junior to Senior Engineer
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {/* Real career progression mockup */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Senior Software Engineer Path</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Career path steps */}
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1 bg-emerald-100 rounded-lg p-3">
                    <span className="text-emerald-800 font-medium">Master React & TypeScript</span>
                    <div className="text-sm text-emerald-600 mt-1">✓ Completed • 3 months</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="flex-1 bg-blue-100 rounded-lg p-3">
                    <span className="text-blue-800 font-medium">Build 3 Portfolio Projects</span>
                    <div className="text-sm text-blue-600 mt-1">🔄 In Progress • 2 projects done</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                  <div className="flex-1 bg-slate-100 rounded-lg p-3">
                    <span className="text-slate-600 font-medium">Get AWS Certification</span>
                    <div className="text-sm text-slate-500 mt-1">📅 Scheduled • Exam in 6 weeks</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                  <div className="flex-1 bg-slate-100 rounded-lg p-3">
                    <span className="text-slate-600 font-medium">Apply to Target Companies</span>
                    <div className="text-sm text-slate-500 mt-1">🎯 Next • Start in 8 weeks</div>
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
              Why Vague Goals Fail (And How We Fix It)
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Stop spinning your wheels. Start building momentum with features that turn dreams into done.
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Break Down Big Dreams</h3>
              <p className="text-slate-600 leading-relaxed">
                "Get promoted" becomes "Complete React course → Build 3 projects → Get AWS cert → Apply to 5 companies." Clear steps, not wishful thinking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">See Real Progress</h3>
              <p className="text-slate-600 leading-relaxed">
                Watch your completion percentage climb. Get dopamine hits from checking off real milestones, not just "worked on my goal today."
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Stay Accountable</h3>
              <p className="text-slate-600 leading-relaxed">
                Get nudged when you're falling behind. No more "I'll start Monday" excuses—your path keeps you honest and moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Mockup Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-lg text-blue-800 font-medium">
                "I've been 'working on my career' for 2 years with nothing to show for it"
              </p>
              <p className="text-sm text-blue-600 mt-2">— Marcus, Stuck in Middle Management</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Here's what Marcus sees now instead of endless to-do lists
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              {/* Career progress dashboard */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Executive Leadership Path</h3>
                <div className="text-sm text-slate-500">Target: VP of Product by Dec 2025</div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">67%</div>
                  <div className="text-sm text-emerald-700">Path Complete</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">$15K</div>
                  <div className="text-sm text-blue-700">Salary Increase</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-purple-700">Months to Goal</div>
                </div>
              </div>
              
              {/* Career milestone progress */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>📚 Complete MBA Program</span>
                    <span>92% (Graduating May 2025)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>👥 Lead Cross-Functional Team</span>
                    <span>75% (Managing 8 people)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>🎯 Launch Product Feature</span>
                    <span>45% (Beta testing phase)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-700 font-medium">Next: Schedule VP coffee chat (Due: Next Friday)</span>
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
            Stop Setting Goals.
            Stop Wishing. Start Building.
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Your career won't advance itself. But with the right path, it doesn't have to be overwhelming either.
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