import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Target, CheckCircle, Clock, TrendingUp, Bell, Settings, Plus, Eye, MessageSquare, Zap, Award, Calendar, BarChart3, Sparkles, ArrowRight } from 'lucide-react';

const DemoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const steps = [
    'dashboard',
    'client-detail',
    'path-builder',
    'client-view',
    'progress-update',
    'analytics'
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 0;
          }
        });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, steps.length]);

  const startDemo = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const mockClients = [
    {
      id: 1,
      name: 'Sarah Chen',
      goal: 'Senior Software Engineer at FAANG',
      progress: 75,
      status: 'active',
      lastUpdate: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      milestones: 6,
      completed: 4,
      streak: 12,
      engagement: 'high'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      goal: 'VP of Product at Tech Startup',
      progress: 58,
      status: 'active',
      lastUpdate: '1 day ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      milestones: 8,
      completed: 5,
      streak: 8,
      engagement: 'medium'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      goal: 'Launch Consulting Business',
      progress: 92,
      status: 'active',
      lastUpdate: '3 hours ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      milestones: 7,
      completed: 6,
      streak: 21,
      engagement: 'high'
    }
  ];

  const sarahPath = [
    { 
      id: 1, 
      title: 'Master React & TypeScript', 
      completed: true, 
      dueDate: 'Completed Mar 15', 
      notes: 'Finished advanced course on Frontend Masters. Built 3 practice projects including a full-stack e-commerce app.',
      category: 'skill'
    },
    { 
      id: 2, 
      title: 'Build Portfolio Projects', 
      completed: true, 
      dueDate: 'Completed Apr 20', 
      notes: 'Created task management app, weather dashboard, and crypto tracker. All deployed with CI/CD.',
      category: 'portfolio'
    },
    { 
      id: 3, 
      title: 'Get AWS Solutions Architect Certification', 
      completed: true, 
      dueDate: 'Completed May 10', 
      notes: 'Passed with 847/1000 score. Studied for 6 weeks using A Cloud Guru and hands-on labs.',
      category: 'certification'
    },
    { 
      id: 4, 
      title: 'Apply to Target Companies', 
      completed: false, 
      dueDate: 'In Progress', 
      notes: 'Applied to Google, Meta, Netflix, and Stripe. Got initial screening calls from Google and Meta!',
      category: 'application'
    },
    { 
      id: 5, 
      title: 'Ace Technical Interviews', 
      completed: false, 
      dueDate: 'Next 2 weeks', 
      notes: '',
      category: 'interview'
    },
    { 
      id: 6, 
      title: 'Negotiate Senior Role Offer', 
      completed: false, 
      dueDate: 'Future', 
      notes: '',
      category: 'negotiation'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'skill': return '🎯';
      case 'portfolio': return '💼';
      case 'certification': return '🏆';
      case 'application': return '📧';
      case 'interview': return '🎤';
      case 'negotiation': return '💰';
      default: return '📋';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Good morning, Coach! ☀️</h2>
              <p className="text-indigo-100 text-lg">3 clients made progress yesterday. You're making a real impact!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">$2,847</div>
              <div className="text-indigo-200 text-sm">Monthly Revenue</div>
            </div>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-slate-900">24</p>
                <p className="text-sm text-slate-600">Active Clients</p>
              </div>
            </div>
            <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+3 this week</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-slate-900">47</p>
                <p className="text-sm text-slate-600">Active Paths</p>
              </div>
            </div>
            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">89% avg completion</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-slate-900">156</p>
                <p className="text-sm text-slate-600">Milestones Hit</p>
              </div>
            </div>
            <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">+23 this month</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-slate-900">94%</p>
                <p className="text-sm text-slate-600">Success Rate</p>
              </div>
            </div>
            <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Industry leading</div>
          </div>
        </div>
      </div>

      {/* Recent Activity with Real Engagement */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-500" />
            Recent Activity
          </h3>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Sarah" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-slate-900">Sarah Chen</span>
                <span className="text-slate-600">completed</span>
                <span className="font-medium text-green-700">"Get AWS Certification"</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">🎉 Scored 847/1000! Ready for senior-level interviews</p>
            </div>
            <div className="text-xs text-slate-500">2 hours ago</div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Marcus" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">Marcus Rodriguez</span>
                <span className="text-slate-600">shared progress update</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">💪 "Just presented to the board - they loved my product roadmap!"</p>
            </div>
            <div className="text-xs text-slate-500">1 day ago</div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Emily" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-slate-900">Emily Johnson</span>
                <span className="text-slate-600">hit milestone streak</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">🔥 21 days in a row! First client to land $50K+ contract</p>
            </div>
            <div className="text-xs text-slate-500">3 hours ago</div>
          </div>
        </div>
      </div>

      {/* Enhanced Client List */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-600" />
            Your Clients
          </h3>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
        <div className="space-y-4">
          {mockClients.map((client, index) => (
            <div 
              key={client.id} 
              className="group flex items-center justify-between p-6 border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50"
              onClick={() => currentStep === 0 && setCurrentStep(1)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-indigo-300 transition-all duration-300">
                    <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    client.engagement === 'high' ? 'bg-green-500' : client.engagement === 'medium' ? 'bg-yellow-500' : 'bg-slate-400'
                  }`}></div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-lg">{client.name}</h4>
                  <p className="text-slate-600">{client.goal}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      🔥 {client.streak} day streak
                    </span>
                    <span className="text-xs text-slate-500">Last update: {client.lastUpdate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{client.progress}%</div>
                  <div className="text-xs text-slate-500">Complete</div>
                  <div className="w-16 bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500" 
                      style={{width: `${client.progress}%`}}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.completed}/{client.milestones}</div>
                  <div className="text-xs text-slate-500">Milestones</div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClientDetail = () => (
    <div className="space-y-8 animate-slideIn">
      {/* Enhanced Client Header */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-indigo-100">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Sarah" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Sarah Chen</h2>
              <p className="text-slate-600 text-lg">Senior Software Engineer at FAANG</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Started: March 15, 2024
                </span>
                <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                  🔥 12 day streak
                </span>
                <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  🎯 Target: December 2024
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">75%</div>
            <div className="text-slate-600 font-medium">Complete</div>
            <div className="text-sm text-slate-500 mt-1">4 of 6 milestones</div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Path */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <Target className="w-6 h-6 text-indigo-600" />
            Goal Path Progress
          </h3>
          <button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => currentStep === 1 && setCurrentStep(2)}
          >
            Edit Path
          </button>
        </div>
        
        <div className="space-y-6">
          {sarahPath.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-6 group">
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  milestone.completed 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                    : index === 3 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse' 
                      : 'bg-slate-300'
                }`}>
                  {milestone.completed && <CheckCircle className="w-5 h-5 text-white" />}
                  {!milestone.completed && index === 3 && <Clock className="w-5 h-5 text-white" />}
                  {!milestone.completed && index > 3 && <span className="text-white text-sm font-bold">{index + 1}</span>}
                </div>
                {index < sarahPath.length - 1 && (
                  <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-12 ${
                    milestone.completed ? 'bg-emerald-300' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
              <div className="flex-1">
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 group-hover:shadow-lg ${
                  milestone.completed 
                    ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' 
                    : index === 3 
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg' 
                      : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(milestone.category)}</span>
                      <h4 className={`font-semibold text-lg ${
                        milestone.completed ? 'text-emerald-800' : index === 3 ? 'text-blue-800' : 'text-slate-600'
                      }`}>
                        {milestone.title}
                      </h4>
                    </div>
                    {milestone.completed && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm font-medium mb-3 ${
                    milestone.completed ? 'text-emerald-600' : index === 3 ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {milestone.dueDate}
                  </p>
                  {milestone.notes && (
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">📝 {milestone.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Client Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Settings className="w-6 h-6 text-slate-600" />
          Client Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <button 
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => currentStep === 1 && setCurrentStep(3)}
          >
            <Eye className="w-4 h-4" />
            View Client Portal
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Bell className="w-4 h-4" />
            Send Celebration
          </button>
          <button className="border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-indigo-300 hover:bg-indigo-50 flex items-center gap-2 transition-all duration-200">
            <Calendar className="w-4 h-4" />
            Schedule Check-in
          </button>
        </div>
      </div>
    </div>
  );

  const renderPathBuilder = () => (
    <div className="space-y-8 animate-slideIn">
      {/* Enhanced Path Builder Header */}
      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Target className="w-8 h-8 text-indigo-600" />
              Path Builder
            </h2>
            <p className="text-slate-600 text-lg mt-2">Creating path for: <span className="font-semibold text-indigo-600">Sarah Chen</span> - Senior Software Engineer</p>
          </div>
          <div className="flex space-x-3">
            <button className="border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
              Save Template
            </button>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Save Path
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Path Building Interface */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-600" />
          Build Milestone Path
        </h3>
        
        <div className="space-y-6">
          {sarahPath.map((milestone, index) => (
            <div key={milestone.id} className="group">
              <div className="flex items-center space-x-4 p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getCategoryIcon(milestone.category)}</span>
                    <input 
                      type="text" 
                      value={milestone.title}
                      className="text-lg font-semibold text-slate-900 bg-transparent border-none outline-none flex-1"
                      readOnly
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Add timeline, resources, or success criteria..."
                    className="w-full text-sm text-slate-600 bg-transparent border-none outline-none"
                  />
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full p-6 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 transition-all duration-300 flex items-center justify-center gap-3 group">
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold">Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Enhanced Path Templates */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Award className="w-6 h-6 text-yellow-600" />
          Popular Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-lg cursor-pointer transition-all duration-300 group">
            <div className="text-3xl mb-3">💼</div>
            <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600">Career Advancement</h4>
            <p className="text-sm text-slate-600 mt-2">8 milestones • Used 47 times</p>
            <div className="text-xs text-emerald-600 mt-2">94% success rate</div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-lg cursor-pointer transition-all duration-300 group">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600">Business Launch</h4>
            <p className="text-sm text-slate-600 mt-2">12 milestones • Used 23 times</p>
            <div className="text-xs text-emerald-600 mt-2">87% success rate</div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-lg cursor-pointer transition-all duration-300 group">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600">Skill Development</h4>
            <p className="text-sm text-slate-600 mt-2">6 milestones • Used 89 times</p>
            <div className="text-xs text-emerald-600 mt-2">96% success rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientView = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Enhanced Client Header */}
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-200 shadow-xl">
            <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Sarah" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Hi Sarah! 👋</h1>
        <p className="text-xl text-slate-600 mb-6">Your path to Senior Software Engineer</p>
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 text-white inline-block shadow-xl">
          <div className="text-5xl font-bold mb-2">75%</div>
          <div className="text-emerald-100">Complete • 4 of 6 milestones</div>
          <div className="text-sm text-emerald-200 mt-2">🔥 12 day streak • You're crushing it!</div>
        </div>
      </div>

      {/* Enhanced Progress Path for Client */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Target className="w-6 h-6 text-indigo-600" />
          Your Progress Path
        </h3>
        
        <div className="space-y-8">
          {sarahPath.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-6 group">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  milestone.completed 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 scale-110' 
                    : index === 3 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse scale-110' 
                      : 'bg-slate-300'
                }`}>
                  {milestone.completed && <CheckCircle className="w-6 h-6 text-white" />}
                  {!milestone.completed && index === 3 && <Clock className="w-6 h-6 text-white" />}
                  {!milestone.completed && index > 3 && <span className="text-white font-bold">{index + 1}</span>}
                </div>
                {index < sarahPath.length - 1 && (
                  <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-16 rounded-full ${
                    milestone.completed ? 'bg-gradient-to-b from-emerald-300 to-emerald-200' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
              <div className="flex-1">
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 group-hover:shadow-xl ${
                  milestone.completed 
                    ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200' 
                    : index === 3 
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg' 
                      : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getCategoryIcon(milestone.category)}</span>
                      <h4 className={`font-bold text-xl ${
                        milestone.completed ? 'text-emerald-800' : index === 3 ? 'text-blue-800' : 'text-slate-600'
                      }`}>
                        {milestone.title}
                      </h4>
                    </div>
                    {!milestone.completed && index === 3 && (
                      <button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        onClick={() => currentStep === 3 && setCurrentStep(4)}
                      >
                        Mark Complete
                      </button>
                    )}
                    {milestone.completed && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-semibold">Completed!</span>
                      </div>
                    )}
                  </div>
                  <p className={`font-medium mb-4 ${
                    milestone.completed ? 'text-emerald-600' : index === 3 ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {milestone.dueDate}
                  </p>
                  {milestone.notes && (
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <p className="text-slate-700 leading-relaxed">📝 {milestone.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Encouragement */}
      <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold mb-3">You're absolutely crushing this! 🎉</h3>
        <p className="text-lg text-white/90">4 out of 6 milestones complete. Senior engineer role is within reach!</p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="font-bold">12 days</div>
            <div className="text-white/80">Current streak</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="font-bold">75%</div>
            <div className="text-white/80">Faster than average</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="font-bold">2 months</div>
            <div className="text-white/80">Ahead of schedule</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressUpdate = () => {
    useEffect(() => {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-slideIn">
        {/* Enhanced Celebration */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl p-12 text-white text-center shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-bold mb-4">Milestone Crushed!</h2>
            <p className="text-2xl text-emerald-100 mb-6">Sarah just completed "Apply to Target Companies"</p>
            <div className="flex justify-center gap-6 text-lg">
              <div className="bg-white/20 rounded-xl px-6 py-3">
                <div className="font-bold">Google ✓</div>
                <div className="text-emerald-200 text-sm">Applied</div>
              </div>
              <div className="bg-white/20 rounded-xl px-6 py-3">
                <div className="font-bold">Meta ✓</div>
                <div className="text-emerald-200 text-sm">Applied</div>
              </div>
              <div className="bg-white/20 rounded-xl px-6 py-3">
                <div className="font-bold">Netflix ✓</div>
                <div className="text-emerald-200 text-sm">Applied</div>
              </div>
            </div>
          </div>
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Update Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            Share Your Success
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">What did you accomplish? 🎯</label>
              <div className="relative">
                <textarea 
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-700"
                  rows={4}
                  value="🚀 HUGE WIN! Applied to Google, Meta, and Netflix today! 

✅ Got confirmation emails from all three companies
✅ Updated LinkedIn profile with new certifications  
✅ Reached out to 5 people in my network for referrals
✅ Scheduled mock interviews for next week

Feeling so confident after all the prep work we mapped out. The portfolio projects really made the applications shine! 💪"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Any challenges or insights? 💡</label>
              <textarea 
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-slate-700"
                rows={3}
                value="The application process was more detailed than expected, but having my portfolio projects ready made it SO much easier. The AWS certification definitely caught their attention. Ready for the interview phase! 🎤"
                readOnly
              />
            </div>
            <div className="flex space-x-4">
              <button 
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                onClick={() => currentStep === 4 && setCurrentStep(5)}
              >
                <Sparkles className="w-5 h-5" />
                Submit Update
              </button>
              <button className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-8 animate-slideIn">
      {/* Enhanced Analytics Header */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border border-slate-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              Client Analytics
            </h2>
            <p className="text-slate-600 text-lg mt-2">Track engagement and success across all your clients</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">$2,847</div>
            <div className="text-slate-600 text-sm">Monthly Revenue</div>
            <div className="text-xs text-emerald-600 mt-1">↑ 23% from last month</div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">↑ 12%</div>
          </div>
          <div className="text-3xl font-bold text-emerald-600">89%</div>
          <div className="text-sm text-slate-600 font-medium">Avg Completion Rate</div>
          <div className="text-xs text-slate-500 mt-1">vs 67% industry avg</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">↓ 1.3 days</div>
          </div>
          <div className="text-3xl font-bold text-blue-600">2.9</div>
          <div className="text-sm text-slate-600 font-medium">Days Avg Response</div>
          <div className="text-xs text-slate-500 mt-1">Excellent engagement</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">↑ 23%</div>
          </div>
          <div className="text-3xl font-bold text-purple-600">156</div>
          <div className="text-sm text-slate-600 font-medium">Milestones This Month</div>
          <div className="text-xs text-slate-500 mt-1">Record breaking!</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Perfect</div>
          </div>
          <div className="text-3xl font-bold text-orange-600">4.9</div>
          <div className="text-sm text-slate-600 font-medium">Client Satisfaction</div>
          <div className="text-xs text-slate-500 mt-1">Based on check-ins</div>
        </div>
      </div>

      {/* Enhanced Client Performance */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Users className="w-6 h-6 text-indigo-600" />
          Client Performance Leaderboard
        </h3>
        <div className="space-y-4">
          {mockClients.map((client, index) => (
            <div key={client.id} className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-indigo-300 transition-all duration-300">
                    <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{client.name}</h4>
                  <p className="text-slate-600">{client.goal}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      client.engagement === 'high' ? 'bg-green-100 text-green-700' : 
                      client.engagement === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {client.engagement} engagement
                    </span>
                    <span className="text-xs text-slate-500">🔥 {client.streak} day streak</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{client.progress}%</div>
                  <div className="text-xs text-slate-500 mb-2">Complete</div>
                  <div className="w-20 bg-slate-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        client.progress > 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                        client.progress > 50 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                        'bg-gradient-to-r from-yellow-500 to-orange-500'
                      }`}
                      style={{width: `${client.progress}%`}}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">{client.completed}/{client.milestones}</div>
                  <div className="text-xs text-slate-500">Milestones</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-600">{client.lastUpdate}</div>
                  <div className="text-xs text-slate-500">Last update</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getCurrentView = () => {
    switch (steps[currentStep]) {
      case 'dashboard':
        return renderDashboard();
      case 'client-detail':
        return renderClientDetail();
      case 'path-builder':
        return renderPathBuilder();
      case 'client-view':
        return renderClientView();
      case 'progress-update':
        return renderProgressUpdate();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  const getStepTitle = () => {
    switch (steps[currentStep]) {
      case 'dashboard':
        return 'Coach Dashboard';
      case 'client-detail':
        return 'Client Management';
      case 'path-builder':
        return 'Path Builder';
      case 'client-view':
        return 'Client Portal';
      case 'progress-update':
        return 'Progress Celebration';
      case 'analytics':
        return 'Performance Analytics';
      default:
        return 'Coach Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Mock Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800">OnPathFlow</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">PRO</span>
                  <span className="text-xs text-slate-500">Coach Dashboard</span>
                </div>
              </div>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                steps[currentStep] === 'dashboard' ? 'bg-indigo-100 text-indigo-700 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}>
                Dashboard
              </button>
              <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                ['client-detail', 'path-builder'].includes(steps[currentStep]) ? 'bg-indigo-100 text-indigo-700 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}>
                Clients
              </button>
              <button className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                steps[currentStep] === 'analytics' ? 'bg-indigo-100 text-indigo-700 shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}>
                Analytics
              </button>
              <button className="text-slate-600 hover:text-slate-900 text-sm font-semibold hover:bg-slate-100 px-4 py-2 rounded-xl transition-all duration-200">
                Settings
              </button>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-200 hover:ring-indigo-300 transition-all duration-200 cursor-pointer">
                  <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" alt="Coach" className="w-full h-full object-cover" />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Demo Controls */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">OnPathFlow Demo</h2>
                  <p className="text-indigo-200 text-sm">{getStepTitle()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'bg-white shadow-lg scale-125' : 
                      index < currentStep ? 'bg-emerald-300' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>
              <button
                onClick={startDemo}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isPlaying 
                    ? 'bg-white/20 text-white cursor-not-allowed' 
                    : 'bg-white text-indigo-600 hover:bg-indigo-50'
                }`}
                disabled={isPlaying}
              >
                {isPlaying ? 'Playing Demo...' : 'Play Demo'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-700 ease-in-out">
          {getCurrentView()}
        </div>
      </main>

      {/* Enhanced Step Indicator */}
      <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-slate-200">
        <div className="text-sm font-semibold text-slate-700 mb-3">Demo Progress</div>
        <div className="flex space-x-2 mb-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-3 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' : 
                index < currentStep ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-slate-500 text-center">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DemoPage;