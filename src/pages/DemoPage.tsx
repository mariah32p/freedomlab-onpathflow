import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Target, CheckCircle, Clock, TrendingUp, Bell, Settings, Plus, Eye, MessageSquare } from 'lucide-react';

const DemoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
      goal: 'Senior Software Engineer',
      progress: 67,
      status: 'active',
      lastUpdate: '2 hours ago',
      avatar: 'SC',
      milestones: 6,
      completed: 4
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      goal: 'VP of Product',
      progress: 45,
      status: 'active',
      lastUpdate: '1 day ago',
      avatar: 'MR',
      milestones: 8,
      completed: 3
    },
    {
      id: 3,
      name: 'Emily Johnson',
      goal: 'Start Consulting Business',
      progress: 89,
      status: 'active',
      lastUpdate: '3 hours ago',
      avatar: 'EJ',
      milestones: 7,
      completed: 6
    }
  ];

  const sarahPath = [
    { id: 1, title: 'Master React & TypeScript', completed: true, dueDate: 'Completed', notes: 'Finished online course and built 2 practice projects' },
    { id: 2, title: 'Build 3 Portfolio Projects', completed: true, dueDate: 'Completed', notes: 'Created e-commerce site, task manager, and weather app' },
    { id: 3, title: 'Get AWS Certification', completed: true, dueDate: 'Completed', notes: 'Passed AWS Solutions Architect exam with 847/1000' },
    { id: 4, title: 'Apply to Target Companies', completed: false, dueDate: 'In Progress', notes: 'Applied to Google, Meta, Netflix. Waiting for responses.' },
    { id: 5, title: 'Prepare for Technical Interviews', completed: false, dueDate: 'Next Week', notes: '' },
    { id: 6, title: 'Negotiate Senior Role Offer', completed: false, dueDate: 'Future', notes: '' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-slate-900">24</p>
              <p className="text-sm text-slate-600">Active Clients</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-emerald-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-slate-900">47</p>
              <p className="text-sm text-slate-600">Active Paths</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-slate-900">156</p>
              <p className="text-sm text-slate-600">Milestones Hit</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-slate-900">73%</p>
              <p className="text-sm text-slate-600">Avg Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm"><strong>Sarah Chen</strong> completed "Get AWS Certification"</span>
            <span className="text-xs text-slate-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span className="text-sm"><strong>Marcus Rodriguez</strong> added progress note</span>
            <span className="text-xs text-slate-500 ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm"><strong>Emily Johnson</strong> completed "Register LLC"</span>
            <span className="text-xs text-slate-500 ml-auto">3 hours ago</span>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Your Clients</h3>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
        <div className="space-y-4">
          {mockClients.map((client) => (
            <div 
              key={client.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => currentStep === 0 && setCurrentStep(1)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">{client.avatar}</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{client.name}</h4>
                  <p className="text-sm text-slate-600">{client.goal}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{client.progress}% complete</p>
                  <p className="text-xs text-slate-500">{client.completed}/{client.milestones} milestones</p>
                </div>
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
                    style={{width: `${client.progress}%`}}
                  ></div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClientDetail = () => (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-medium text-indigo-700">SC</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Sarah Chen</h2>
              <p className="text-slate-600">Goal: Senior Software Engineer at FAANG</p>
              <p className="text-sm text-slate-500">Started: March 15, 2024 • Target: December 2024</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-600">67%</div>
            <div className="text-sm text-slate-600">Complete</div>
          </div>
        </div>
      </div>

      {/* Progress Path */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Goal Path Progress</h3>
          <button 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
            onClick={() => currentStep === 1 && setCurrentStep(2)}
          >
            Edit Path
          </button>
        </div>
        
        <div className="space-y-4">
          {sarahPath.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-4">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                milestone.completed 
                  ? 'bg-emerald-500' 
                  : index === 3 
                    ? 'bg-blue-500 animate-pulse' 
                    : 'bg-slate-300'
              }`}>
                {milestone.completed && <CheckCircle className="w-4 h-4 text-white" />}
                {!milestone.completed && index === 3 && <Clock className="w-4 h-4 text-white" />}
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${
                  milestone.completed 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : index === 3 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-slate-50 border border-slate-200'
                }`}>
                  <h4 className={`font-medium ${
                    milestone.completed ? 'text-emerald-800' : index === 3 ? 'text-blue-800' : 'text-slate-600'
                  }`}>
                    {milestone.title}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    milestone.completed ? 'text-emerald-600' : index === 3 ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {milestone.dueDate}
                  </p>
                  {milestone.notes && (
                    <p className="text-sm text-slate-600 mt-2 bg-white p-2 rounded border">
                      📝 {milestone.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Client Actions</h3>
        <div className="flex space-x-4">
          <button 
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2"
            onClick={() => currentStep === 1 && setCurrentStep(3)}
          >
            <Eye className="w-4 h-4" />
            View Client Link
          </button>
          <button className="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700">
            Send Update
          </button>
          <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
            Schedule Check-in
          </button>
        </div>
      </div>
    </div>
  );

  const renderPathBuilder = () => (
    <div className="space-y-6">
      {/* Path Builder Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Path Builder</h2>
            <p className="text-slate-600">Creating path for: Sarah Chen - Senior Software Engineer</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
              Save Template
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
              Save Path
            </button>
          </div>
        </div>
      </div>

      {/* Path Building Interface */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Build Milestone Path</h3>
        
        <div className="space-y-4">
          {sarahPath.map((milestone, index) => (
            <div key={milestone.id} className="flex items-center space-x-4 p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                {index + 1}
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={milestone.title}
                  className="w-full text-lg font-medium text-slate-900 bg-transparent border-none outline-none"
                  readOnly
                />
                <input 
                  type="text" 
                  placeholder="Add description or deadline..."
                  className="w-full text-sm text-slate-600 bg-transparent border-none outline-none mt-1"
                />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600">
                  ×
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add Milestone
          </button>
        </div>
      </div>

      {/* Path Templates */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg hover:border-indigo-300 cursor-pointer">
            <h4 className="font-medium text-slate-900">Career Advancement</h4>
            <p className="text-sm text-slate-600 mt-1">8 milestones • Used 12 times</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg hover:border-indigo-300 cursor-pointer">
            <h4 className="font-medium text-slate-900">Business Launch</h4>
            <p className="text-sm text-slate-600 mt-1">10 milestones • Used 8 times</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg hover:border-indigo-300 cursor-pointer">
            <h4 className="font-medium text-slate-900">Skill Development</h4>
            <p className="text-sm text-slate-600 mt-1">6 milestones • Used 15 times</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Client Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-medium text-indigo-700">SC</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Hi Sarah! 👋</h1>
        <p className="text-xl text-slate-600 mt-2">Your path to Senior Software Engineer</p>
        <div className="mt-4">
          <div className="text-4xl font-bold text-emerald-600">67%</div>
          <div className="text-sm text-slate-600">Complete • 4 of 6 milestones</div>
        </div>
      </div>

      {/* Progress Path for Client */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Your Progress Path</h3>
        
        <div className="space-y-6">
          {sarahPath.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                milestone.completed 
                  ? 'bg-emerald-500' 
                  : index === 3 
                    ? 'bg-blue-500 animate-pulse' 
                    : 'bg-slate-300'
              }`}>
                {milestone.completed && <CheckCircle className="w-5 h-5 text-white" />}
                {!milestone.completed && index === 3 && <Clock className="w-5 h-5 text-white" />}
                {!milestone.completed && index > 3 && <span className="text-white text-sm">{index + 1}</span>}
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${
                  milestone.completed 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : index === 3 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-slate-50 border border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${
                      milestone.completed ? 'text-emerald-800' : index === 3 ? 'text-blue-800' : 'text-slate-600'
                    }`}>
                      {milestone.title}
                    </h4>
                    {!milestone.completed && index === 3 && (
                      <button 
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
                        onClick={() => currentStep === 3 && setCurrentStep(4)}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    milestone.completed ? 'text-emerald-600' : index === 3 ? 'text-blue-600' : 'text-slate-500'
                  }`}>
                    {milestone.dueDate}
                  </p>
                  {milestone.notes && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm text-slate-700">📝 {milestone.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">You're doing amazing! 🎉</h3>
        <p>You've completed 4 out of 6 milestones. Keep up the great work!</p>
      </div>
    </div>
  );

  const renderProgressUpdate = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Celebration */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-8 text-white text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2">Milestone Completed!</h2>
        <p className="text-xl text-emerald-100">Sarah just completed "Apply to Target Companies"</p>
      </div>

      {/* Update Form */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Progress Update</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What did you accomplish?</label>
            <textarea 
              className="w-full p-3 border border-slate-300 rounded-lg"
              rows={3}
              value="Applied to Google, Meta, and Netflix! Got confirmation emails from all three. Also updated my LinkedIn profile and reached out to my network for referrals."
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Any challenges or insights?</label>
            <textarea 
              className="w-full p-3 border border-slate-300 rounded-lg"
              rows={2}
              value="The application process was more detailed than expected, but having my portfolio projects ready made it much easier."
              readOnly
            />
          </div>
          <div className="flex space-x-4">
            <button 
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700"
              onClick={() => currentStep === 4 && setCurrentStep(5)}
            >
              Submit Update
            </button>
            <button className="border border-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-50">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Analytics</h2>
        <p className="text-slate-600">Track engagement and success across all your clients</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-emerald-600">89%</div>
          <div className="text-sm text-slate-600">Avg Completion Rate</div>
          <div className="text-xs text-emerald-600 mt-1">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-blue-600">4.2</div>
          <div className="text-sm text-slate-600">Days Avg Response</div>
          <div className="text-xs text-blue-600 mt-1">↓ 1.3 days improved</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-purple-600">156</div>
          <div className="text-sm text-slate-600">Milestones This Month</div>
          <div className="text-xs text-purple-600 mt-1">↑ 23% increase</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-3xl font-bold text-orange-600">92%</div>
          <div className="text-sm text-slate-600">Client Satisfaction</div>
          <div className="text-xs text-orange-600 mt-1">Based on check-ins</div>
        </div>
      </div>

      {/* Client Performance */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Client Performance</h3>
        <div className="space-y-4">
          {mockClients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700">{client.avatar}</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{client.name}</h4>
                  <p className="text-sm text-slate-600">{client.goal}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.progress}%</div>
                  <div className="text-xs text-slate-500">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.completed}/{client.milestones}</div>
                  <div className="text-xs text-slate-500">Milestones</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">{client.lastUpdate}</div>
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
        return 'Client Details';
      case 'path-builder':
        return 'Path Builder';
      case 'client-view':
        return 'Client View';
      case 'progress-update':
        return 'Progress Update';
      case 'analytics':
        return 'Analytics';
      default:
        return 'Coach Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mock Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">OnPathFlow</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">PRO</span>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button className={`px-3 py-2 rounded-lg text-sm font-medium ${
                steps[currentStep] === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}>
                Dashboard
              </button>
              <button className={`px-3 py-2 rounded-lg text-sm font-medium ${
                ['client-detail', 'path-builder'].includes(steps[currentStep]) ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}>
                Clients
              </button>
              <button className={`px-3 py-2 rounded-lg text-sm font-medium ${
                steps[currentStep] === 'analytics' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}>
                Analytics
              </button>
              <button className="text-slate-600 hover:text-slate-900 text-sm font-medium">
                Settings
              </button>
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </nav>
          </div>
        </div>
      </header>

      {/* Demo Controls */}
      <div className="bg-indigo-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">OnPathFlow Demo</h2>
              <span className="text-indigo-200">•</span>
              <span className="text-indigo-200">{getStepTitle()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStep ? 'bg-white' : 'bg-indigo-400'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>
              <button
                onClick={startDemo}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50"
              >
                {isPlaying ? 'Playing...' : 'Play Demo'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-500 ease-in-out">
          {getCurrentView()}
        </div>
      </main>

      {/* Step Indicator */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border">
        <div className="text-sm text-slate-600 mb-2">Demo Progress</div>
        <div className="flex space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-2 rounded-full ${
                index === currentStep ? 'bg-indigo-600' : index < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-slate-500 mt-2">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default DemoPage;