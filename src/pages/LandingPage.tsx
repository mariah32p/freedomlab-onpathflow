import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, CheckCircle, Clock, TrendingUp, Trophy, Bell, Settings, Star, MessageSquare, ArrowRight, Play, Zap, Shield, BarChart3, Smartphone, Globe, ChevronDown } from 'lucide-react';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  const [currentDemoStep, setCurrentDemoStep] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(false);
  const [demoInView, setDemoInView] = React.useState(false);
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  // Intersection Observer for demo section
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDemoInView(true);
          setIsAutoPlaying(true);
        } else {
          setIsAutoPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      observer.observe(demoSection);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance demo steps when in view
  React.useEffect(() => {
    if (!isAutoPlaying || !demoInView) return;
    
    const interval = setInterval(() => {
      setCurrentDemoStep(prev => (prev + 1) % 4);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, demoInView]);

  const mockClients = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      goal: 'Senior Software Engineer',
      progress: 75,
      engagement: 'high',
      streak: 12,
      completedMilestones: 6,
      totalMilestones: 8
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      goal: 'VP of Product',
      progress: 67,
      engagement: 'high',
      streak: 8,
      completedMilestones: 4,
      totalMilestones: 6
    },
    {
      id: 3,
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      goal: 'Start Consulting Business',
      progress: 45,
      engagement: 'medium',
      streak: 5,
      completedMilestones: 3,
      totalMilestones: 7
    }
  ];

  const sarahMilestones = [
    {
      id: 1,
      title: 'Master React & TypeScript',
      description: 'Complete advanced React course and build 2 TypeScript projects',
      status: 'completed',
      completedAt: '2024-12-15',
      dueDate: '2024-12-20'
    },
    {
      id: 2,
      title: 'Build Portfolio Projects',
      description: 'Create 3 impressive projects showcasing different skills',
      status: 'completed',
      completedAt: '2025-01-10',
      dueDate: '2025-01-15'
    },
    {
      id: 3,
      title: 'Get AWS Certification',
      description: 'Pass AWS Solutions Architect Associate exam',
      status: 'in_progress',
      progress: 80,
      dueDate: '2025-01-25'
    },
    {
      id: 4,
      title: 'Network with Senior Engineers',
      description: 'Connect with 5 senior engineers at target companies',
      status: 'pending',
      dueDate: '2025-02-01'
    },
    {
      id: 5,
      title: 'Apply to Target Companies',
      description: 'Submit applications to Google, Meta, Netflix, and 2 others',
      status: 'pending',
      dueDate: '2025-02-15'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-xs font-medium">Total Clients</p>
              <p className="text-2xl font-bold text-emerald-700">24</p>
            </div>
            <Users className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-xs font-medium">Active Paths</p>
              <p className="text-2xl font-bold text-blue-700">47</p>
            </div>
            <Target className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-xs font-medium">Completion Rate</p>
              <p className="text-2xl font-bold text-purple-700">89%</p>
            </div>
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs font-medium">Monthly Revenue</p>
              <p className="text-2xl font-bold text-amber-700">$2,847</p>
            </div>
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800">Recent Client Activity</h4>
        </div>
        <div className="divide-y divide-slate-100">
          {mockClients.map((client) => (
            <div key={client.id} className="p-4 hover:bg-slate-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={client.avatar} 
                    alt={client.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <h5 className="font-semibold text-slate-800 text-sm">{client.name}</h5>
                    <p className="text-slate-600 text-xs">{client.goal}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{client.progress}%</div>
                    <div className="text-xs text-slate-500">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{client.streak}</div>
                    <div className="text-xs text-slate-500">Streak</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.engagement === 'high' ? 'bg-emerald-100 text-emerald-700' :
                    client.engagement === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {client.engagement}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClientProgress = () => (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <img 
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
            alt="Sarah Chen"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">Sarah Chen</h3>
            <p className="text-emerald-100">Senior Software Engineer Path</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm">12-day streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-emerald-200" />
                <span className="text-sm">75% complete</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">75%</div>
            <div className="text-emerald-100 text-sm">Complete</div>
          </div>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800">Milestone Progress</h4>
        </div>
        <div className="p-4 space-y-4">
          {sarahMilestones.slice(0, 3).map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {index < 2 && (
                <div className="absolute left-6 top-12 w-0.5 h-12 bg-slate-200"></div>
              )}
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-emerald-500' :
                  milestone.status === 'in_progress' ? 'bg-blue-500' :
                  'bg-slate-300'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : milestone.status === 'in_progress' ? (
                    <Clock className="w-6 h-6 text-white animate-pulse" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-semibold text-slate-800 text-sm">{milestone.title}</h5>
                    <span className="text-xs text-slate-500">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{milestone.description}</p>
                  
                  {milestone.status === 'in_progress' && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{width: `${milestone.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {milestone.status === 'completed' && (
                    <div className="bg-emerald-50 rounded-lg p-3 mt-2">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-emerald-400 mt-0.5" />
                        <p className="text-xs text-emerald-700">
                          {milestone.id === 1 ? 'Built a task manager and weather app. Feeling confident with hooks and TypeScript!' :
                           'Finished my e-commerce site, chat app, and data visualization dashboard.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-slate-800">Client Analytics</h4>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">Last 30 days</button>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs font-medium">This quarter</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">94%</div>
            <div className="text-xs text-slate-600">Milestone Completion Rate</div>
            <div className="text-xs text-emerald-600 mt-1">↗ +12% vs last quarter</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">8.2</div>
            <div className="text-xs text-slate-600">Avg Days per Milestone</div>
            <div className="text-xs text-blue-600 mt-1">↗ 15% faster</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">87%</div>
            <div className="text-xs text-slate-600">Client Satisfaction</div>
            <div className="text-xs text-purple-600 mt-1">↗ +5% this month</div>
          </div>
        </div>
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4">Top Performers This Month</h4>
        
        <div className="space-y-3">
          {mockClients.map((client) => (
            <div key={client.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                  client.id === 1 ? 'bg-yellow-500' :
                  client.id === 2 ? 'bg-slate-400' :
                  'bg-amber-600'
                }`}>
                  {client.id}
                </div>
                <img 
                  src={client.avatar}
                  alt={client.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-slate-800 text-sm">{client.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{client.completedMilestones}</div>
                  <div className="text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{client.streak}</div>
                  <div className="text-slate-500">Streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPathBuilder = () => (
    <div className="space-y-6">
      {/* Path Builder Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-800">Create New Goal Path</h3>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200">
            Save Template
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Goal Title</label>
            <input 
              type="text" 
              value="Become a Data Scientist"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target Date</label>
            <input 
              type="date" 
              value="2025-08-15"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Milestone Builder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-6">Build Your Milestones</h4>
        
        <div className="space-y-4">
          {[
            { title: 'Complete Python Fundamentals Course', weeks: 4, status: 'building' },
            { title: 'Learn SQL & Database Design', weeks: 3, status: 'planned' },
            { title: 'Master Pandas & NumPy', weeks: 6, status: 'planned' },
            { title: 'Build 3 Data Analysis Projects', weeks: 8, status: 'planned' },
            { title: 'Get Kaggle Competition Experience', weeks: 4, status: 'planned' }
          ].map((milestone, index) => (
            <div key={index} className={`p-4 rounded-xl border-2 border-dashed transition-all duration-300 ${
              milestone.status === 'building' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    milestone.status === 'building' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                  }`}></div>
                  <span className="font-medium text-slate-800">{milestone.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">{milestone.weeks} weeks</span>
                  {milestone.status === 'building' && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Another Milestone</span>
          </button>
        </div>
      </div>
    </div>
  );

  const getCurrentDemoView = () => {
    switch (currentDemoStep) {
      case 0:
        return renderDashboard();
      case 1:
        return renderClientProgress();
      case 2:
        return renderPathBuilder();
      case 3:
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  const renderMobileDashboard = () => (
    <div className="space-y-4">
      {/* Mobile Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          <div className="text-lg font-bold text-emerald-700">24</div>
          <div className="text-xs text-emerald-600">Clients</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="text-lg font-bold text-blue-700">89%</div>
          <div className="text-xs text-blue-600">Success Rate</div>
        </div>
      </div>

      {/* Mobile Client List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-3 border-b border-slate-200">
          <h4 className="font-semibold text-slate-800 text-sm">Active Clients</h4>
        </div>
        <div className="divide-y divide-slate-100">
          {mockClients.slice(0, 2).map((client) => (
            <div key={client.id} className="p-3">
              <div className="flex items-center space-x-3">
                <img 
                  src={client.avatar} 
                  alt={client.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-slate-800 text-sm">{client.name}</h5>
                  <p className="text-slate-600 text-xs">{client.goal}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-600">{client.progress}%</div>
                  <div className="text-xs text-slate-500">{client.streak} day streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMobileClientProgress = () => (
    <div className="space-y-4">
      {/* Mobile Client Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
            alt="Sarah Chen"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
          />
          <div className="flex-1">
            <h3 className="font-bold">Sarah Chen</h3>
            <p className="text-emerald-100 text-sm">Senior Engineer Path</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-3 h-3 text-yellow-300" />
              <span className="text-xs">12-day streak</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">75%</div>
            <div className="text-emerald-100 text-xs">Complete</div>
          </div>
        </div>
      </div>

      {/* Mobile Milestones */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-3 border-b border-slate-200">
          <h4 className="font-semibold text-slate-800 text-sm">Current Milestones</h4>
        </div>
        <div className="p-3 space-y-3">
          {sarahMilestones.slice(0, 3).map((milestone) => (
            <div key={milestone.id} className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                milestone.status === 'completed' ? 'bg-emerald-500' :
                milestone.status === 'in_progress' ? 'bg-blue-500' :
                'bg-slate-300'
              }`}>
                {milestone.status === 'completed' ? (
                  <CheckCircle className="w-3 h-3 text-white" />
                ) : milestone.status === 'in_progress' ? (
                  <Clock className="w-3 h-3 text-white animate-pulse" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-slate-800 text-sm">{milestone.title}</h5>
                <p className="text-slate-600 text-xs">{milestone.description}</p>
                
                {milestone.status === 'in_progress' && (
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full transition-all duration-500" 
                        style={{width: `${milestone.progress}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMobilePathBuilder = () => (
    <div className="space-y-4">
      {/* Mobile Path Builder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h3 className="font-semibold text-slate-800 mb-4">Create Goal Path</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Goal Title</label>
            <input 
              type="text" 
              value="Become a Data Scientist"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Target Date</label>
            <input 
              type="date" 
              value="2025-08-15"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Mobile Milestone Builder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm">Build Milestones</h4>
        
        <div className="space-y-2">
          {[
            { title: 'Python Fundamentals', weeks: 4, status: 'building' },
            { title: 'SQL & Databases', weeks: 3, status: 'planned' },
            { title: 'Data Analysis Projects', weeks: 8, status: 'planned' }
          ].map((milestone, index) => (
            <div key={index} className={`p-3 rounded-lg border transition-all duration-300 ${
              milestone.status === 'building' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    milestone.status === 'building' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                  }`}></div>
                  <span className="font-medium text-slate-800 text-sm">{milestone.title}</span>
                </div>
                <span className="text-xs text-slate-500">{milestone.weeks}w</span>
              </div>
            </div>
          ))}
          
          <button className="w-full p-3 border border-dashed border-slate-300 rounded-lg text-slate-500 text-sm flex items-center justify-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Milestone</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMobileAnalytics = () => (
    <div className="space-y-4">
      {/* Mobile Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm">Performance</h4>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">94%</div>
            <div className="text-xs text-slate-600">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">8.2</div>
            <div className="text-xs text-slate-600">Avg Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">87%</div>
            <div className="text-xs text-slate-600">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Mobile Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-800 mb-3 text-sm">Top Performers</h4>
        
        <div className="space-y-2">
          {mockClients.slice(0, 3).map((client) => (
            <div key={client.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                  client.id === 1 ? 'bg-yellow-500' :
                  client.id === 2 ? 'bg-slate-400' :
                  'bg-amber-600'
                }`}>
                  {client.id}
                </div>
                <img 
                  src={client.avatar}
                  alt={client.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-medium text-slate-800 text-xs">{client.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{client.completedMilestones}</div>
                  <div className="text-slate-500">Done</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{client.streak}</div>
                  <div className="text-slate-500">Streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getCurrentMobileDemoView = () => {
    switch (currentDemoStep) {
      case 0:
        return renderMobileDashboard();
      case 1:
        return renderMobileClientProgress();
      case 2:
        return renderMobilePathBuilder();
      case 3:
        return renderMobileAnalytics();
      default:
        return renderMobileDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              7-Day Free Trial Available
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
              Stop Setting Goals That Never Get Achieved
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Turn your biggest ambitions into clear, actionable milestone paths. OnPathFlow helps coaches and individuals break down overwhelming goals into achievable daily wins.
            </p>
            
            <div className="mb-8">
              <Link to="/signup" className="inline-flex items-center bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 text-slate-700 px-6 py-3 rounded-full text-lg font-semibold mb-6 border border-emerald-200">
              <Play className="w-5 h-5 mr-3 text-emerald-600" />
              See OnPathFlow in Action
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Watch Goals Transform Into Reality
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how coaches use OnPathFlow to track client progress, build custom goal paths, and celebrate achievements in real-time.
            </p>
          </div>

          {/* Desktop Demo */}
          <div className="hidden md:block">
            <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-w-5xl mx-auto transition-all duration-1000 ${
              demoInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              {/* Mock Browser Header */}
              <div className="bg-slate-100 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-sm text-slate-600">https://onpathflow.com/dashboard</div>
                <div></div>
              </div>

              {/* Demo Navigation */}
              <div className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo and Title */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-800">OnPathFlow</h1>
                      <div className="flex items-center space-x-2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">PRO</span>
                        <span className="text-slate-500 text-sm">Coach Dashboard</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Tabs */}
                  <div className="flex space-x-1">
                    {['Dashboard', 'Progress', 'Builder', 'Analytics'].map((step, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentDemoStep === index
                            ? 'bg-emerald-500 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                  
                  {/* User Profile */}
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
                    <Settings className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
                  </div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-[500px]">                
                <div className="transition-all duration-500 ease-in-out">
                  {getCurrentDemoView()}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Demo */}
          <div className={`md:hidden transition-all duration-1000 ${
            demoInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <div className="max-w-sm mx-auto">
              <div className="bg-slate-800 rounded-t-2xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-slate-300">onpathflow.com</div>
                  <div className="w-4 h-4"></div>
                </div>
              </div>
              
              <div className="bg-white shadow-2xl overflow-hidden">
                <header className="bg-white border-b border-slate-200 px-4 py-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-sm">OnPathFlow</span>
                        <div className="flex items-center space-x-1">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">PRO</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-slate-400" />
                      <Settings className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  
                  {/* Mobile Navigation Tabs */}
                  <div className="flex space-x-2 overflow-x-auto">
                    {['Dashboard', 'Clients', 'Builder', 'Analytics'].map((step, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                          currentDemoStep === index
                            ? 'bg-emerald-500 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </header>

                <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-[500px]">
                  <div className="transition-all duration-500 ease-in-out">
                    {getCurrentMobileDemoView()}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-b-2xl h-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need to Achieve Your Goals
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powerful features designed to turn your biggest dreams into step-by-step reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Visual Goal Mapping */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visual Goal Mapping</h3>
              <p className="text-slate-600 mb-6">
                Transform overwhelming goals into clear, visual milestone paths. See exactly what needs to happen and when.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Complete certification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-700">Build portfolio projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-slate-500">Apply to companies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Progress Tracking */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Progress Tracking</h3>
              <p className="text-slate-600 mb-6">
                Automatic progress updates, streak tracking, and intelligent insights to keep you motivated and on track.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Weekly Progress</span>
                  <span className="text-sm font-bold text-emerald-600">87%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                  <span>12-day streak 🔥</span>
                  <span>3 milestones this week</span>
                </div>
              </div>
            </div>

            {/* Team Collaboration */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Team Collaboration</h3>
              <p className="text-slate-600 mb-6">
                Perfect for coaches, mentors, and teams. Share progress, celebrate wins, and stay accountable together.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop" alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-slate-700">Sarah completed AWS cert! 🎉</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop" alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-slate-700">Marcus started networking milestone</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="mt-16">
            {/* Desktop Demo */}
            <div className="hidden md:block">
              <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-w-5xl mx-auto transition-all duration-1000 ${
                demoInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                {/* Mock Browser Header */}
                <div className="bg-slate-100 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-slate-600">https://onpathflow.com/dashboard</div>
                  <div></div>
                </div>

                {/* Demo Navigation */}
                <div className="bg-white border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-slate-800">OnPathFlow</h1>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">PRO</span>
                          <span className="text-slate-500 text-sm">Coach Dashboard</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Navigation Tabs */}
                    <div className="flex space-x-1">
                      {['Dashboard', 'Progress', 'Builder', 'Analytics'].map((step, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentDemoStep === index
                              ? 'bg-emerald-500 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {step}
                        </button>
                      ))}
                    </div>
                    
                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
                      <Settings className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
                    </div>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-[500px]">                
                  <div className="transition-all duration-500 ease-in-out">
                    {getCurrentDemoView()}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Demo */}
            <div className={`md:hidden transition-all duration-1000 ${
              demoInView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <div className="max-w-sm mx-auto">
                <div className="bg-slate-800 rounded-t-2xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-slate-300">onpathflow.com</div>
                    <div className="w-4 h-4"></div>
                  </div>
                </div>
                
                <div className="bg-white shadow-2xl overflow-hidden">
                  <header className="bg-white border-b border-slate-200 px-4 py-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-sm">OnPathFlow</span>
                          <div className="flex items-center space-x-1">
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">PRO</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-slate-400" />
                        <Settings className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    
                    {/* Mobile Navigation Tabs */}
                    <div className="flex space-x-2 overflow-x-auto">
                      {['Dashboard', 'Clients', 'Builder', 'Analytics'].map((step, index) => (
                        <button
                          key={index}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                            currentDemoStep === index
                              ? 'bg-emerald-500 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {step}
                        </button>
                      ))}
                    </div>
                  </header>

                  <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-[500px]">
                    <div className="transition-all duration-500 ease-in-out">
                      {getCurrentMobileDemoView()}
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded-b-2xl h-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Trusted by Goal Achievers Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of coaches, entrepreneurs, and ambitious individuals who've transformed their goals into reality.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-slate-600">Goals Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-slate-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">94%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">4.9/5</div>
              <div className="text-slate-600">User Rating</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "OnPathFlow completely changed how I approach my career goals. I went from feeling overwhelmed to having a clear roadmap. Landed my dream job in 6 months!"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800">Sarah Chen</div>
                  <div className="text-slate-600 text-sm">Senior Software Engineer at Google</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "As a coach, OnPathFlow has revolutionized how I work with clients. The visual progress tracking keeps everyone motivated and accountable."
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                  alt="Jennifer Martinez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800">Jennifer Martinez</div>
                  <div className="text-slate-600 text-sm">Executive Coach & Consultant</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">
                "Finally, a tool that makes goal setting actually work. The milestone breakdown feature is genius - no more overwhelming to-do lists!"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                  alt="Marcus Rodriguez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-800">Marcus Rodriguez</div>
                  <div className="text-slate-600 text-sm">VP of Product at Startup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start with a 7-day free trial. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-colors duration-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
                <p className="text-slate-600 mb-6">Perfect for getting started</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-slate-900">$9</span>
                  <span className="text-slate-600 text-lg">/month</span>
                </div>

                <Link to="/signup" className="block w-full bg-slate-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-8 text-center">
                  Start 7-Day Free Trial
                </Link>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Up to 5 goal paths</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Basic progress tracking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Email reminders</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Mobile app access</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
                <p className="text-slate-600 mb-6">For serious goal achievers</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-slate-900">$29</span>
                  <span className="text-slate-600 text-lg">/month</span>
                </div>

                <Link to="/signup" className="block w-full bg-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-8 text-center">
                  Start 7-Day Free Trial
                </Link>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Unlimited goal paths</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Advanced analytics & insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Smart AI recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                  <span className="text-slate-700">Custom integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about OnPathFlow
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "How does the free trial work?",
                answer: "Start your 7-day free trial with full access to all Pro features. We'll ask for your payment method upfront, but you won't be charged until the trial ends. Cancel anytime during the trial with no charges."
              },
              {
                question: "What makes OnPathFlow different from other goal-setting apps?",
                answer: "OnPathFlow focuses on visual milestone mapping and real-time progress tracking. Unlike simple to-do apps, we help you break down complex goals into achievable paths with built-in accountability and celebration features."
              },
              {
                question: "Can I use OnPathFlow for team goals?",
                answer: "Absolutely! OnPathFlow is perfect for coaches, managers, and teams. Share progress, collaborate on milestones, and celebrate achievements together. Pro plans include advanced team features."
              },
              {
                question: "How does the coaching feature work?",
                answer: "Coaches can create custom goal paths for clients, track their progress in real-time, and provide feedback directly within the platform. Clients get their own dashboard to update progress and communicate with their coach."
              },
              {
                question: "Can I change plans later?",
                answer: "Yes! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately with prorated billing."
              },
              {
                question: "What happens to my data if I cancel?",
                answer: "Your data is safely stored for 30 days after cancellation, giving you time to export or reactivate your account. We never delete your progress without warning."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                    expandedFaq === index ? 'transform rotate-180' : ''
                  }`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Turn Your Goals Into Reality?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful goal achievers who've transformed their dreams into step-by-step action plans.
          </p>
          
          <div className="mb-8">
            <Link to="/signup" className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Your Free Trial Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-emerald-100">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-emerald-200" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-emerald-200" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-emerald-200" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
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