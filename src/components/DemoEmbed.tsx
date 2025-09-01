import React, { useState, useEffect } from 'react';
import { Users, Target, CheckCircle, Clock, TrendingUp, Settings, Bell, Star, Trophy, MessageSquare } from 'lucide-react';

const DemoEmbed: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  // Auto-advance demo steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 6);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Celebration effect
  useEffect(() => {
    if (currentStep === 4) {
      setCelebrationVisible(true);
      const timer = setTimeout(() => setCelebrationVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const steps = [
    'Coach Dashboard',
    'Client Progress',
    'Path Builder',
    'Client View',
    'Milestone Complete',
    'Analytics'
  ];

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

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
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
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Recent Client Activity</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {mockClients.map((client) => (
            <div key={client.id} className="p-4 hover:bg-slate-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={client.avatar} 
                    alt={client.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-medium text-slate-800 text-sm">{client.name}</h4>
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
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-xl"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Sarah Chen</h2>
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

      {/* Current Milestone */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Current Focus</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-blue-800">Get AWS Certification</h4>
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm text-blue-700 mb-1">
              <span>Progress</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-slate-700 text-sm">Scheduled exam for next Friday. Been studying 2 hours daily.</p>
                <p className="text-slate-500 text-xs mt-1">Updated 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPathBuilder = () => (
    <div className="space-y-6">
      {/* Path Builder Header */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800">Create New Goal Path</h3>
          <button className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
            Save Template
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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

      {/* Milestone Builder */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-800 mb-4">Build Your Milestones</h4>
        
        <div className="space-y-3">
          {[
            { title: 'Complete Python Fundamentals Course', weeks: 4, status: 'building' },
            { title: 'Learn SQL & Database Design', weeks: 3, status: 'planned' },
            { title: 'Master Pandas & NumPy', weeks: 6, status: 'planned' },
            { title: 'Build 3 Data Analysis Projects', weeks: 8, status: 'planned' }
          ].map((milestone, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 border-dashed transition-all duration-300 ${
              milestone.status === 'building' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    milestone.status === 'building' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-800">{milestone.title}</span>
                </div>
                <span className="text-xs text-slate-500">{milestone.weeks} weeks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClientView = () => (
    <div className="space-y-6">
      {/* Client Welcome */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-12 -mt-12"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah! 👋</h2>
          <p className="text-emerald-100 mb-3">You're making incredible progress</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">12-day streak</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">6 milestones completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Focus */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Current Focus</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-blue-800">Get AWS Certification</h4>
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm text-blue-700 mb-1">
              <span>Progress</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-slate-700 text-sm">Scheduled exam for next Friday. Been studying 2 hours daily.</p>
                <p className="text-slate-500 text-xs mt-1">Updated 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressUpdate = () => (
    <div className="space-y-6">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
        {celebrationVisible && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              ></div>
            ))}
          </div>
        )}
        <div className="relative text-center">
          <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-3 animate-pulse" />
          <h2 className="text-2xl font-bold mb-1">Milestone Completed! 🎉</h2>
          <p className="text-emerald-100">Sarah just finished her AWS certification!</p>
        </div>
      </div>

      {/* Progress Update */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Sarah's Update</h3>
        
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <h4 className="font-semibold text-emerald-800">AWS Certification - PASSED! ✅</h4>
          </div>
          <p className="text-emerald-700 text-sm mb-3">
            Just got my results - I passed with a score of 847/1000! The practice exams really helped.
          </p>
          
          <div className="bg-white rounded-lg p-3 border border-emerald-200">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-3 text-white text-center">
              <div className="font-bold text-sm">AWS Certified Solutions Architect</div>
              <div className="text-xs opacity-90">Associate Level • Score: 847/1000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Client Analytics</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">94%</div>
            <div className="text-xs text-slate-600">Completion Rate</div>
            <div className="text-xs text-emerald-600 mt-1">↗ +12%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">8.2</div>
            <div className="text-xs text-slate-600">Avg Days/Milestone</div>
            <div className="text-xs text-blue-600 mt-1">↗ 15% faster</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">87%</div>
            <div className="text-xs text-slate-600">Satisfaction</div>
            <div className="text-xs text-purple-600 mt-1">↗ +5%</div>
          </div>
        </div>
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performers This Month</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', completed: 3, streak: 12, rank: 1 },
            { name: 'Marcus Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', completed: 2, streak: 8, rank: 2 },
            { name: 'Emily Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', completed: 2, streak: 5, rank: 3 }
          ].map((client) => (
            <div key={client.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                  client.rank === 1 ? 'bg-yellow-500' :
                  client.rank === 2 ? 'bg-slate-400' :
                  'bg-amber-600'
                }`}>
                  {client.rank}
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
                  <div className="font-bold text-emerald-600">{client.completed}</div>
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

  const getCurrentView = () => {
    switch (currentStep) {
      case 0:
        return renderDashboard();
      case 1:
        return renderClientProgress();
      case 2:
        return renderPathBuilder();
      case 3:
        return renderClientView();
      case 4:
        return renderProgressUpdate();
      case 5:
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Demo Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">OnPathFlow</h1>
                <div className="flex items-center space-x-2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">PRO</span>
                  <span className="text-slate-500 text-xs">Coach Dashboard</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <Settings className="w-5 h-5 text-slate-400" />
              <img 
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                alt="Coach"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Demo Navigation */}
      <div className="bg-white border-b border-slate-200 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-1">
              {steps.map((step, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    currentStep === index
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
            
            <div className="text-xs text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="transition-all duration-500 ease-in-out">
          {getCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default DemoEmbed;