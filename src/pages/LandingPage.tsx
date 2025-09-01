import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, CheckCircle, Clock, TrendingUp, Trophy, Bell, Settings, Star, MessageSquare } from 'lucide-react';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  const [currentDemoStep, setCurrentDemoStep] = React.useState(0);
  const [isAutoPlaying] = React.useState(true);

  // Auto-advance demo steps
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentDemoStep(prev => (prev + 1) % 4);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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

  const renderMobileDashboard = () => (
    <div className="space-y-4">
      {/* Mobile Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 rounded-xl border border-emerald-200">
          <div className="text-center">
            <Users className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-emerald-700">24</div>
            <div className="text-xs text-emerald-600">Clients</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
          <div className="text-center">
            <Target className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-700">89%</div>
            <div className="text-xs text-blue-600">Success Rate</div>
          </div>
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

      {/* Live Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Demo Disclaimer */}
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              ✨ Interactive Demo Below - Watch the Magic Happen
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              See OnPathFlow in Action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Watch how coaches use OnPathFlow to guide clients from goals to achievements
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Browser Window */}
            <div className="bg-slate-200 rounded-t-xl p-3">
              {/* Browser Chrome */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-4 py-1 text-sm text-slate-600 text-center">
                    https://onpathflow.com/dashboard
                  </div>
                </div>
                <div className="w-16"></div>
              </div>
            </div>
            
            {/* App Interface */}
            <div className="bg-white shadow-2xl rounded-b-xl overflow-hidden">
              {/* App Header */}
              <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-slate-800">OnPathFlow</h1>
                      <div className="flex items-center space-x-2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">PRO</span>
                        <span className="text-slate-500 text-sm">Coach Dashboard</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Bell className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
                    <Settings className="w-6 h-6 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200" />
                    <img 
                      src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                      alt="Coach"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500 shadow-lg"
                    />
                  </div>
                </div>
              </header>

              {/* Demo Navigation */}
              <div className="bg-white border-b border-slate-200 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {['Dashboard', 'Client Progress', 'Path Builder', 'Analytics'].map((step, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentDemoStep === index
                            ? 'bg-emerald-500 text-white shadow-lg'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-sm text-slate-500">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-[600px]">
                <div className="transition-all duration-500 ease-in-out">
                  {getCurrentDemoView()}
                </div>
              </div>
            </div>
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
            <Link to="/pricing" className="text-white hover:text-emerald-100 font-semibold text-lg flex items-center gap-2">
              View Pricing
            </Link>
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