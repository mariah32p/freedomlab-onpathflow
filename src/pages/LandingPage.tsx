import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, Users, TrendingUp, Clock, Star, Eye } from 'lucide-react';
import Header from '../components/Header';
import DemoEmbed from '../components/DemoEmbed';

const LandingPage: React.FC = () => {
  const [mobileStep, setMobileStep] = React.useState(0);
  
  // Mobile demo animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMobileStep(prev => (prev + 1) % 4);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  const renderMobileDemo = () => {
    switch (mobileStep) {
      case 0:
        // Coach Dashboard
        return (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">24</div>
                <div className="text-xs text-slate-600">Active Clients</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-xs text-slate-600">Success Rate</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', progress: 75, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
                { name: 'Marcus Rodriguez', progress: 67, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
                { name: 'Emily Johnson', progress: 45, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' }
              ].map((client, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-3 flex items-center space-x-3">
                  <img src={client.avatar} alt={client.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 text-sm">{client.name}</div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                      <div className="bg-emerald-500 h-1 rounded-full" style={{width: `${client.progress}%`}}></div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-bold text-sm">{client.progress}%</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 1:
        // Client Progress View
        return (
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                  alt="Sarah"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <div className="font-bold">Sarah Chen</div>
                  <div className="text-emerald-100 text-sm">Senior Engineer Path</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { title: 'Master React & TypeScript', status: 'completed' },
                { title: 'Build Portfolio Projects', status: 'completed' },
                { title: 'Get AWS Certification', status: 'in_progress' },
                { title: 'Network with Engineers', status: 'pending' }
              ].map((milestone, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  milestone.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                  milestone.status === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                  'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {milestone.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : milestone.status === 'in_progress' ? (
                      <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-slate-300 rounded-full"></div>
                    )}
                    <span className="text-sm font-medium text-slate-800">{milestone.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        // Path Builder View
        return (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Create New Path</h3>
              <div className="space-y-2">
                <input 
                  type="text" 
                  value="Become Data Scientist"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  readOnly
                />
                <input 
                  type="date" 
                  value="2025-08-15"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  readOnly
                />
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                { title: 'Python Fundamentals', status: 'building' },
                { title: 'SQL & Databases', status: 'planned' },
                { title: 'Machine Learning', status: 'planned' },
                { title: 'Portfolio Projects', status: 'planned' }
              ].map((milestone, index) => (
                <div key={index} className={`p-3 rounded-lg border-2 border-dashed ${
                  milestone.status === 'building' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        milestone.status === 'building' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                      }`}></div>
                      <span className="text-sm font-medium text-slate-800">{milestone.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        // Analytics View
        return (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-emerald-600">94%</div>
                <div className="text-xs text-slate-600">Completion</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">8.2</div>
                <div className="text-xs text-slate-600">Avg Days</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-xl font-bold text-purple-600">87%</div>
                <div className="text-xs text-slate-600">Satisfaction</div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">Top Performers</h4>
              <div className="space-y-2">
                {[
                  { name: 'Sarah Chen', rank: 1, completed: 3 },
                  { name: 'Marcus Rodriguez', rank: 2, completed: 2 },
                  { name: 'Emily Johnson', rank: 3, completed: 2 }
                ].map((client) => (
                  <div key={client.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                        client.rank === 1 ? 'bg-yellow-500' : client.rank === 2 ? 'bg-slate-400' : 'bg-amber-600'
                      }`}>
                        {client.rank}
                      </div>
                      <span className="text-sm font-medium text-slate-800">{client.name}</span>
                    </div>
                    <div className="text-emerald-600 font-bold text-sm">{client.completed} done</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-32 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f1f5f9%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                7-Day Free Trial Available
              </div>
              
              {/* Header */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight">
                Help Your Clients{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
                  Actually Achieve
                </span>{' '}
                Their Goals
              </h1>
              
              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The visual goal-setting platform that transforms how coaches guide clients from dreams to achievements. Build clear milestone paths, track progress, and celebrate every win together.
              </p>
              
              {/* CTA Button */}
              <div className="pt-2">
                <Link 
                  to="/signup" 
                  className="inline-block bg-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Your Free Trial
                </Link>
              </div>
              
              {/* Trial Details */}
              <p className="text-slate-500 text-sm">
                7-day free trial • Cancel anytime
              </p>
            </div>
            
            {/* Right Side - Simple Mockup */}
            <div className="relative mt-8 sm:mt-12 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-sm mx-auto lg:max-w-none transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-6 text-white">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Client Dashboard</h3>
                      <p className="text-emerald-100 text-sm">Track Your Progress</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Senior Manager Promotion</span>
                      <span className="text-emerald-200">6 of 8 milestones</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-slate-700 text-sm font-medium">Leadership Course Complete</span>
                      </div>
                      <span className="text-emerald-600 text-xs font-medium">Just now</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="text-slate-700 text-sm font-medium">Team Presentation</span>
                      </div>
                      <span className="text-blue-600 text-xs font-medium">Tomorrow</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-700 text-sm font-medium">360 Feedback Review</span>
                      </div>
                      <span className="text-slate-500 text-xs font-medium">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-white p-2 rounded-lg shadow-lg transform rotate-12 animate-bounce">
                <Star className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-blue-500 text-white p-2 rounded-lg shadow-lg transform -rotate-12">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              See OnPathFlow in Action
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Watch how coaches create milestone paths and track their clients' progress in real-time
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Desktop Browser Mockup */}
            <div className="hidden md:block bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-300 text-sm">onpathflow.com/dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50">
                <DemoEmbed />
              </div>
            </div>
            
            {/* Mobile Phone Mockup */}
            <div className="md:hidden max-w-sm mx-auto">
              {/* Simple Mobile Demo */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-6 h-6" />
                      <span className="font-bold">OnPathFlow</span>
                    </div>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                      {mobileStep === 0 ? 'Dashboard' : 
                       mobileStep === 1 ? 'Client View' : 
                       mobileStep === 2 ? 'Path Builder' : 
                       'Analytics'}
                    </span>
                  </div>
                </div>
                
                {/* Dynamic Content */}
                <div className="transition-all duration-500 ease-in-out">
                  {renderMobileDemo()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Everything You Need to Guide Your Clients
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Powerful tools designed specifically for coaches who want to help their clients achieve real, measurable results
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Visual Path Builder</h3>
              <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                Create custom milestone paths for each client. Break down big goals into clear, actionable steps with due dates and progress tracking.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-slate-800">Senior Manager Goal</span>
                    <span className="text-emerald-600 text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-emerald-500 mr-2" />
                      <span>Leadership course completed</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-600">
                      <Clock className="w-3 h-3 text-blue-500 mr-2" />
                      <span>Team presentation due</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Client Dashboard</h3>
              <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                Monitor all your clients in one place. See their progress, engagement levels, streaks, and completion rates at a glance.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-emerald-600">24</div>
                    <div className="text-xs text-slate-600">Active Clients</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">89%</div>
                    <div className="text-xs text-slate-600">Completion Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">47</div>
                    <div className="text-xs text-slate-600">Active Paths</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Progress Tracking & Analytics</h3>
              <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                Track client streaks, completion patterns, and engagement levels. See which clients need support and celebrate milestone achievements.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">12-day streak</span>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">High engagement</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Trending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">6 milestones done</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">On track</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              What Coaches Are Saying
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 px-4">
              Real results from real coaches using OnPathFlow
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 sm:p-8 border border-emerald-200 sm:col-span-2 lg:col-span-1">
              <div className="mb-6">
                <h4 className="font-bold text-slate-900">Mariah W.</h4>
                <p className="text-emerald-700 text-sm">Technology Consultant & Coach</p>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                "As someone who coaches tech professionals, OnPathFlow's visual milestone system is perfect for breaking down complex career transitions. My clients love seeing their progress mapped out clearly, and I can track multiple career paths simultaneously."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 border border-blue-200">
              <div className="mb-6">
                <h4 className="font-bold text-slate-900">Nathan R.</h4>
                <p className="text-blue-700 text-sm">Legal & Real Estate Coach</p>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                "Working with professionals transitioning between legal and real estate careers, I needed a tool that could handle complex, multi-step goals. OnPathFlow's path builder makes it easy to create custom journeys for each client's unique situation."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 sm:p-8 border border-purple-200">
              <div className="mb-6">
                <h4 className="font-bold text-slate-900">Amber I.</h4>
                <p className="text-purple-700 text-sm">Insurance & Design Coach</p>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
                "I coach professionals in both insurance and design - two very different fields. OnPathFlow's flexibility lets me create tailored milestone paths for each industry while tracking everything in one dashboard. The visual progress keeps my clients engaged across both sectors."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
              Start with a 7-day free trial. No hidden fees, cancel anytime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            
            {/* Standard Plan */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-slate-300 transition-colors duration-200">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Standard</h3>
                <p className="text-slate-600 mb-4 sm:mb-6">Perfect for getting started</p>
                
                <div className="mb-6 sm:mb-8">
                  <span className="text-4xl sm:text-5xl font-bold text-slate-900">$29</span>
                  <span className="text-slate-600 text-base sm:text-lg">/month</span>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Up to 10 clients</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Up to 5 goal paths per client</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Progress tracking & analytics</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Milestone tracking & celebrations</span>
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Premium</h3>
                <p className="text-slate-600 mb-4 sm:mb-6">For serious coaches</p>
                
                <div className="mb-6 sm:mb-8">
                  <span className="text-4xl sm:text-5xl font-bold text-slate-900">$49</span>
                  <span className="text-slate-600 text-base sm:text-lg">/month</span>
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Unlimited clients</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Unlimited goal paths per client</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Advanced analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-slate-700">Client performance leaderboards</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Single CTA Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Link 
              to="/signup"
              className="inline-block bg-emerald-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your 7-Day Free Trial
            </Link>
            <p className="text-slate-500 text-sm mt-3">
              Choose your plan during signup • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 px-4">
              Everything you need to know about OnPathFlow
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                How does the visual path builder work?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Simply create a goal for your client, then break it down into specific milestones with due dates. Your clients can see their entire journey laid out visually, track their progress, and celebrate each completed step.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                Can I track multiple clients at once?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Absolutely! Your coach dashboard shows all your clients' progress in one place. You can see who's on track, who might need extra support, and celebrate wins across your entire client base.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                What happens during the 7-day free trial?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                You get full access to all features - create unlimited goal paths, track client progress, and use all the analytics tools. No restrictions, no hidden fees. Cancel anytime before the trial ends.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                How do clients access their progress?
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Each client gets their own beautiful dashboard where they can see their goal paths, update their progress, add notes, and celebrate completed milestones. It's designed to keep them motivated and engaged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Coaching Practice?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of coaches who are helping their clients achieve more with OnPathFlow's visual goal-setting platform.
          </p>
          
          <div className="space-y-3 sm:space-y-4">
            <Link 
              to="/signup" 
              className="inline-block bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your 7-Day Free Trial
            </Link>
            <p className="text-emerald-100 text-sm">
              Cancel anytime • Full access during trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
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