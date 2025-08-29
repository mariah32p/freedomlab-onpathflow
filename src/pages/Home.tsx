import React from 'react';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Users, CheckCircle, Eye, MessageSquare, BarChart3, Bell, Zap, Crown, ArrowRight, Play, Star, Calendar, Award, Camera, FileText } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2301b79e%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <div className="inline-flex items-center space-x-2 bg-brand-teal bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-teal border-opacity-30 mb-8">
                <Target className="h-4 w-4 text-brand-teal" />
                <span className="text-brand-teal font-semibold text-sm">Visual Goal Tracking Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Keep Your Clients
                <span className="text-brand-teal block">On The Path</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                Transform client engagement with visual progress paths, milestone celebrations, and automated check-ins that keep motivation high.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/signup"
                  className="bg-brand-teal text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-opacity-90 transition-all shadow-xl transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">14-day free trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-brand-teal" />
                  <span className="text-sm">No credit card required</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Mockup */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-brand-navy">Sarah's Weight Loss Journey</h3>
                    <div className="bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-semibold">75% Complete</div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Progress Path Mockup */}
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">Week 1: Foundation</div>
                        <div className="text-sm text-gray-500">Completed 3 days ago</div>
                      </div>
                    </div>
                    
                    <div className="ml-4 border-l-2 border-brand-teal h-6"></div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">Week 2: Building Habits</div>
                        <div className="text-sm text-gray-500">Completed yesterday</div>
                      </div>
                    </div>
                    
                    <div className="ml-4 border-l-2 border-brand-teal h-6"></div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">Week 3: Momentum</div>
                        <div className="text-sm text-brand-teal font-medium">Current milestone</div>
                      </div>
                    </div>
                    
                    <div className="ml-4 border-l-2 border-gray-300 border-dashed h-6"></div>
                    
                    <div className="flex items-center space-x-4 opacity-50">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-500">Week 4: Transformation</div>
                        <div className="text-sm text-gray-400">Upcoming</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating celebration mockup */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-bold text-sm">Milestone Complete!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Demo Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              See OnPathFlow in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how visual progress tracking transforms client engagement and motivation
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-16">
            <div className="bg-gradient-to-r from-brand-navy to-purple-900 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-brand-teal" />
                  <span className="text-xl font-bold text-white">Coach Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-gray-300" />
                  <div className="w-8 h-8 bg-brand-teal rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-brand-teal to-cyan-500 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-8 w-8" />
                    <span className="text-2xl font-bold">24</span>
                  </div>
                  <div className="font-semibold">Active Clients</div>
                  <div className="text-sm opacity-90">+3 this week</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="h-8 w-8" />
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                  <div className="font-semibold">Completion Rate</div>
                  <div className="text-sm opacity-90">Above average</div>
                </div>
                
                <div className="bg-gradient-to-br from-brand-navy to-blue-800 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8" />
                    <span className="text-2xl font-bold">12</span>
                  </div>
                  <div className="font-semibold">Goals Completed</div>
                  <div className="text-sm opacity-90">This month</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-brand-navy mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah M.', action: 'completed Week 2 milestone', time: '2 hours ago', color: 'brand-teal' },
                      { name: 'Mike R.', action: 'added progress photo', time: '4 hours ago', color: 'purple-500' },
                      { name: 'Lisa K.', action: 'started new goal path', time: '1 day ago', color: 'brand-navy' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className={`w-3 h-3 bg-${activity.color} rounded-full`}></div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-800">{activity.name}</span>
                          <span className="text-gray-600"> {activity.action}</span>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-brand-navy mb-4">Active Goal Paths</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Weight Loss Journey', clients: 8, progress: 65 },
                      { title: 'Business Growth Plan', clients: 5, progress: 80 },
                      { title: 'Fitness Challenge', clients: 11, progress: 45 }
                    ].map((path, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{path.title}</span>
                          <span className="text-sm text-gray-500">{path.clients} clients</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-brand-teal to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${path.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{path.progress}% average completion</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features with Mockups */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Everything You Need to Keep Clients Motivated
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six powerful features that transform how you track and celebrate client progress
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1: Visual Goal Path Builder */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-brand-teal bg-opacity-10 px-4 py-2 rounded-full mb-6">
                  <Target className="h-5 w-5 text-brand-teal" />
                  <span className="text-brand-teal font-semibold">Visual Goal Path Builder</span>
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-6">
                  Create milestone-based paths for client goals
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Design beautiful, step-by-step journeys that break down big goals into achievable milestones. 
                  Your clients see exactly where they are and what's next.
                </p>
                <div className="space-y-4">
                  {[
                    'Drag-and-drop milestone creation',
                    'Custom milestone descriptions and deadlines',
                    'Visual progress indicators',
                    'Flexible path structures'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-teal" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-brand-navy">Build New Path</h4>
                      <button className="bg-brand-teal text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Save Path
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: 'Initial Assessment', status: 'complete', color: 'brand-teal' },
                        { title: 'Week 1: Foundation', status: 'complete', color: 'brand-teal' },
                        { title: 'Week 2: Building Momentum', status: 'current', color: 'purple-500' },
                        { title: 'Week 3: Breakthrough', status: 'upcoming', color: 'gray-300' },
                        { title: 'Final Celebration', status: 'upcoming', color: 'gray-300' }
                      ].map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            milestone.status === 'complete' ? 'bg-brand-teal' :
                            milestone.status === 'current' ? 'bg-purple-500 animate-pulse' :
                            'bg-gray-300'
                          }`}>
                            {milestone.status === 'complete' ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : milestone.status === 'current' ? (
                              <Target className="h-4 w-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                            )}
                          </div>
                          <span className={`font-medium ${
                            milestone.status === 'upcoming' ? 'text-gray-500' : 'text-gray-800'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Client Progress Tracking */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2">
                <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-600 font-semibold">Client Progress Tracking</span>
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-6">
                  Clients check off completed milestones themselves
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Empower your clients with ownership of their progress. They mark milestones complete, 
                  creating accountability and celebrating their own wins.
                </p>
                <div className="space-y-4">
                  {[
                    'One-click milestone completion',
                    'Progress photos and notes',
                    'Instant celebration feedback',
                    'Personal achievement history'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:order-1 relative">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl">
                  {/* Mobile mockup */}
                  <div className="bg-white rounded-3xl p-6 shadow-lg max-w-sm mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Target className="h-6 w-6 text-brand-teal" />
                        <span className="font-bold text-brand-navy">My Progress</span>
                      </div>
                      <div className="w-8 h-8 bg-brand-teal rounded-full"></div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-brand-teal to-purple-500 text-white p-4 rounded-2xl mb-6">
                      <div className="text-sm opacity-90 mb-1">Current Milestone</div>
                      <div className="font-bold text-lg">Week 3: Building Momentum</div>
                      <div className="text-sm opacity-90 mt-2">3 of 5 tasks completed</div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { task: 'Complete 3 workouts', done: true },
                        { task: 'Track meals daily', done: true },
                        { task: 'Take progress photo', done: true },
                        { task: 'Weekly check-in call', done: false },
                        { task: 'Plan next week goals', done: false }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center space-x-3 p-3 rounded-xl ${
                          item.done ? 'bg-green-50' : 'bg-gray-50'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            item.done ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {item.done && <CheckCircle className="h-4 w-4 text-white" />}
                          </div>
                          <span className={`${item.done ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                            {item.task}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-brand-teal text-white py-3 rounded-xl font-semibold mt-6 hover:bg-opacity-90 transition-colors">
                      Complete Milestone
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Shareable Client Links */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-brand-navy bg-opacity-10 px-4 py-2 rounded-full mb-6">
                  <Eye className="h-5 w-5 text-brand-navy" />
                  <span className="text-brand-navy font-semibold">Shareable Client Links</span>
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-6">
                  Send clients their personal progress page
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  No app downloads or complex logins. Just send a simple link and your clients 
                  can track their progress anywhere, anytime.
                </p>
                <div className="space-y-4">
                  {[
                    'Unique secure links for each client',
                    'Works on any device or browser',
                    'No account creation required',
                    'Always up-to-date progress view'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-brand-navy" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-navy to-purple-900 rounded-3xl p-8 shadow-xl">
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-lg px-3 py-1 text-sm text-gray-600">
                        onpathflow.com/client/sarah-m-fitness
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-brand-navy">Sarah's Fitness Journey</h4>
                      <p className="text-gray-600">Week 3 of 8 • 62% Complete</p>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                      <div className="bg-gradient-to-r from-brand-teal to-purple-500 h-3 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-green-50 p-3 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">5</div>
                        <div className="text-sm text-green-700">Completed</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-sm text-blue-700">Remaining</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-brand-teal to-opacity-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your coaching practice. Start with our 14-day free trial.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="bg-brand-teal bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-brand-teal" />
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-2">Basic Plan</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-brand-navy">$29</span>
                  <span className="text-gray-500 ml-2 text-lg">/month</span>
                </div>
                <p className="text-gray-600 font-medium">Perfect for individual coaches, small practice, freelancers</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-sm font-bold text-brand-teal mb-4 uppercase tracking-wide">MVP Features:</div>
                {[
                  'Up to 3 active goal paths',
                  'Up to 20 clients tracked',
                  'Basic milestone paths (up to 10 milestones per path)',
                  'Client self-tracking via shared links',
                  'Simple progress dashboard',
                  'Basic check-in notes'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="block w-full bg-brand-teal text-white text-center py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-colors transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                14-day free trial • Cancel anytime
              </p>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-500 p-8 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
                  <Crown className="h-4 w-4" />
                  <span>MOST POPULAR</span>
                </div>
              </div>
              
              <div className="text-center mb-8 mt-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Crown className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-2">Pro Plan</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-brand-navy">$49</span>
                  <span className="text-gray-500 ml-2 text-lg">/month</span>
                </div>
                <p className="text-gray-600 font-medium">Perfect for coaching businesses, course creators, team coaches</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-sm font-bold text-purple-600 mb-4 uppercase tracking-wide">Everything in Basic, plus:</div>
                {[
                  'Unlimited goal paths',
                  'Up to 100 clients tracked',
                  'Custom celebrations - Personalized milestone completion messages',
                  'Path templates - Save and reuse common goal structures',
                  'Client analytics - Track engagement and completion rates',
                  'Email notifications - Get notified when clients complete milestones'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase with More Mockups */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Simple Check-ins Mockup */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-6 w-6 text-brand-teal" />
                <span className="font-bold text-brand-navy">Simple Check-ins</span>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Milestone Complete!</div>
                    <div className="text-sm text-gray-500">Week 2: Building Habits</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Camera className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Progress Photo</span>
                  </div>
                  <div className="w-full h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-lg"></div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Notes</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Feeling great! Hit all my workout goals this week and my energy is through the roof! 💪"
                  </p>
                </div>
              </div>
            </div>

            {/* Coach Dashboard Mockup */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-brand-navy">Coach Dashboard</span>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-brand-teal bg-opacity-10 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-brand-teal">24</div>
                    <div className="text-xs text-gray-600">Active Clients</div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl text-center">
                    <div className="text-lg font-bold text-purple-600">87%</div>
                    <div className="text-xs text-gray-600">Avg. Progress</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: 'Sarah M.', progress: 75, status: 'On track' },
                    { name: 'Mike R.', progress: 90, status: 'Ahead' },
                    { name: 'Lisa K.', progress: 45, status: 'Needs support' }
                  ].map((client, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{client.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800">{client.name}</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-brand-teal to-purple-500 h-1.5 rounded-full"
                            style={{ width: `${client.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        client.status === 'Ahead' ? 'bg-green-100 text-green-700' :
                        client.status === 'On track' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {client.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Basic Celebrations Mockup */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="h-6 w-6 text-yellow-600" />
                <span className="font-bold text-brand-navy">Basic Celebrations</span>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy">Congratulations!</h4>
                  <p className="text-gray-600 text-sm">You completed Week 2: Building Habits</p>
                </div>
                
                <div className="bg-gradient-to-r from-brand-teal to-purple-500 text-white p-4 rounded-xl text-center">
                  <div className="font-bold mb-1">🎉 Amazing Progress!</div>
                  <div className="text-sm opacity-90">You're 50% closer to your goal</div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-green-100 p-2 rounded-lg text-center">
                    <div className="text-lg">🏆</div>
                    <div className="text-xs text-green-700">Milestone</div>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg text-center">
                    <div className="text-lg">⚡</div>
                    <div className="text-xs text-blue-700">Streak</div>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg text-center">
                    <div className="text-lg">🎯</div>
                    <div className="text-xs text-purple-700">Focus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Core MVP Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to create engaging visual progress tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Visual Goal Path Builder',
                description: 'Create milestone-based paths for client goals',
                color: 'brand-teal'
              },
              {
                icon: TrendingUp,
                title: 'Client Progress Tracking',
                description: 'Clients check off completed milestones themselves',
                color: 'purple-500'
              },
              {
                icon: Eye,
                title: 'Shareable Client Links',
                description: 'Send clients their personal progress page',
                color: 'blue-500'
              },
              {
                icon: MessageSquare,
                title: 'Simple Check-ins',
                description: 'Clients can add notes/photos when completing milestones',
                color: 'green-500'
              },
              {
                icon: BarChart3,
                title: 'Coach Dashboard',
                description: 'See all clients\' progress at a glance',
                color: 'yellow-500'
              },
              {
                icon: Zap,
                title: 'Basic Celebrations',
                description: 'Simple "congrats" messages when milestones completed',
                color: 'pink-500'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-10">
                <div className={`bg-${feature.color} bg-opacity-20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-r from-brand-teal via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-12 border border-white border-opacity-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Coaching?
            </h2>
            <p className="text-xl text-gray-100 mb-10 leading-relaxed">
              Join the visual revolution in client progress tracking. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="bg-white text-brand-navy px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105 inline-flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center justify-center"
              >
                View Pricing
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-8 text-gray-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-brand-teal" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-brand-teal" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-brand-teal" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};