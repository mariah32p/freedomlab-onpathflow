import React, { useState, useEffect } from 'react';
import { Users, Target, CheckCircle, Clock, TrendingUp, Settings, Plus, Eye, MessageSquare, Star, Trophy, Bell } from 'lucide-react';

const DemoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Auto-advance demo steps
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = (prev + 1) % 6;
        // Show modal for certain steps
        if (next === 1) {
          setTimeout(() => showClientDetailModal(), 2000);
        } else if (next === 2) {
          setTimeout(() => showPathBuilderModal(), 2500);
        } else if (next === 4) {
          setTimeout(() => showCelebrationModal(), 2000);
        }
        return next;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Celebration effect
  useEffect(() => {
    if (currentStep === 4) {
      setCelebrationVisible(true);
      const timer = setTimeout(() => setCelebrationVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;
    
    const text = "Passed my AWS exam! 🎉 Score: 847/1000";
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);
    
    return () => clearInterval(typeInterval);
  }, [isTyping]);

  const showClientDetailModal = () => {
    setModalContent({
      type: 'client-detail',
      title: 'Viewing Client Progress',
      content: 'Let me show you Sarah\'s detailed progress. She\'s been absolutely crushing her milestones and maintaining an incredible 12-day streak!'
    });
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  };

  const showPathBuilderModal = () => {
    setModalContent({
      type: 'path-builder',
      title: 'Creating a New Goal Path',
      content: 'Here\'s how I build custom milestone paths for my clients. Each path is carefully tailored to their specific career goals and timeline.'
    });
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4500);
  };

  const showCelebrationModal = () => {
    setModalContent({
      type: 'celebration',
      title: 'Client Milestone Completed!',
      content: 'Sarah just completed her AWS certification! Watch how the system automatically celebrates her achievement and updates her progress.'
    });
    setShowModal(true);
    setIsTyping(true);
    setTypedText('');
    setTimeout(() => setShowModal(false), 8000);
  };

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
      lastActive: '2 hours ago',
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
      lastActive: '1 day ago',
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
      lastActive: '3 days ago',
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
      note: 'Built a task manager and weather app. Feeling confident with hooks and TypeScript!',
      dueDate: '2024-12-20'
    },
    {
      id: 2,
      title: 'Build Portfolio Projects',
      description: 'Create 3 impressive projects showcasing different skills',
      status: 'completed',
      completedAt: '2025-01-10',
      note: 'Finished my e-commerce site, chat app, and data visualization dashboard.',
      dueDate: '2025-01-15'
    },
    {
      id: 3,
      title: 'Get AWS Certification',
      description: 'Pass AWS Solutions Architect Associate exam',
      status: 'in_progress',
      progress: 80,
      note: 'Scheduled exam for next Friday. Been studying 2 hours daily.',
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
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Total Clients</p>
              <p className="text-3xl font-bold text-emerald-700">24</p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Active Paths</p>
              <p className="text-3xl font-bold text-blue-700">47</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Completion Rate</p>
              <p className="text-3xl font-bold text-purple-700">89%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold text-amber-700">$2,847</p>
            </div>
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800">Recent Client Activity</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {mockClients.map((client) => (
            <div key={client.id} className="p-6 hover:bg-slate-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={client.avatar} 
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">{client.name}</h4>
                    <p className="text-slate-600 text-sm">{client.goal}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">{client.progress}%</div>
                    <div className="text-xs text-slate-500">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{client.streak}</div>
                    <div className="text-xs text-slate-500">Day Streak</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.engagement === 'high' ? 'bg-emerald-100 text-emerald-700' :
                    client.engagement === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {client.engagement} engagement
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
    <div className="space-y-8">
      {/* Client Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <img 
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
            alt="Sarah Chen"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-xl"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Sarah Chen</h2>
            <p className="text-emerald-100 text-lg">Senior Software Engineer Path</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">12-day streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-emerald-200" />
                <span className="text-sm">75% complete</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">75%</div>
            <div className="text-emerald-100">Complete</div>
          </div>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800">Milestone Progress</h3>
        </div>
        <div className="p-6 space-y-6">
          {sarahMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {index < sarahMilestones.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-200"></div>
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
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{milestone.title}</h4>
                    <span className="text-sm text-slate-500">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 mb-3">{milestone.description}</p>
                  
                  {milestone.status === 'in_progress' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
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
                  
                  {milestone.note && (
                    <div className="bg-slate-50 rounded-lg p-3 mt-3">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
                        <p className="text-sm text-slate-700">{milestone.note}</p>
                      </div>
                      {milestone.completedAt && (
                        <p className="text-xs text-slate-500 mt-2">
                          Completed on {new Date(milestone.completedAt).toLocaleDateString()}
                        </p>
                      )}
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

  const renderPathBuilder = () => (
    <div className="space-y-8">
      {/* Path Builder Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-slate-800">Create New Goal Path</h3>
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
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
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
            <Plus className="w-5 h-5" />
            <span>Add Another Milestone</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderClientView = () => (
    <div className="space-y-8">
      {/* Client Welcome */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h2>
          <p className="text-emerald-100 text-lg mb-4">You're making incredible progress on your Senior Engineer path</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>12-day streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span>6 milestones completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Focus */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Your Current Focus</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-blue-800">Get AWS Certification</h4>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">In Progress</span>
          </div>
          <p className="text-blue-700 mb-4">Pass AWS Solutions Architect Associate exam</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-blue-700 mb-2">
              <span>Progress</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                {isTyping ? (
                  <p className="text-slate-700 text-sm">{typedText}<span className="animate-pulse">|</span></p>
                ) : (
                  <p className="text-slate-700 text-sm">Just passed my AWS exam with 847/1000! 🎉 The practice tests really helped. Already feeling more confident about cloud architecture discussions in interviews.</p>
                )}
                <p className="text-slate-500 text-xs mt-1">Updated 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Focus */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Your Current Focus</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-blue-800">Get AWS Certification</h4>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">In Progress</span>
          </div>
          <p className="text-blue-700 mb-4">Pass AWS Solutions Architect Associate exam</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-blue-700 mb-2">
              <span>Progress</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <div>
                  <p className="text-slate-700 text-sm">Scheduled exam for next Friday. Been studying 2 hours daily.</p>
                  <p className="text-slate-500 text-xs mt-1">Updated 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
            Update Progress
          </button>
        </div>
      </div>

      {/* All Milestones */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Your Complete Path</h3>
        
        <div className="space-y-4">
          {sarahMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {index < sarahMilestones.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-200"></div>
              )}
              <div className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-200 ${
                milestone.status === 'completed' ? 'bg-emerald-50 border border-emerald-200' :
                milestone.status === 'in_progress' ? 'bg-blue-50 border border-blue-200' :
                'bg-slate-50 border border-slate-200'
              }`}>
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
                  <h4 className="font-semibold text-slate-800 mb-1">{milestone.title}</h4>
                  <p className="text-slate-600 text-sm mb-2">{milestone.description}</p>
                  
                  {milestone.status === 'in_progress' && milestone.progress && (
                    <div className="mb-3">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{width: `${milestone.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Due: {new Date(milestone.dueDate).toLocaleDateString()}
                    </span>
                    {milestone.status === 'completed' && (
                      <span className="text-xs text-emerald-600 font-medium">
                        ✓ Completed {new Date(milestone.completedAt!).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgressUpdate = () => (
    <div className="space-y-8">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        {celebrationVisible && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
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
          <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl font-bold mb-2">Milestone Completed! 🎉</h2>
          <p className="text-emerald-100 text-lg">Sarah just finished her AWS certification!</p>
        </div>
      </div>

      {/* Progress Update Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Sarah's Update</h3>
        
        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <h4 className="font-semibold text-emerald-800">AWS Certification - PASSED! ✅</h4>
            </div>
            <p className="text-emerald-700 mb-4">
              Just got my results - I passed with a score of 847/1000! The practice exams really helped. 
              Already feeling more confident talking about cloud architecture in interviews.
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <p className="text-sm text-slate-600 mb-2">📸 Proof of completion:</p>
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-4 text-white text-center">
                <div className="text-lg font-bold">AWS Certified Solutions Architect</div>
                <div className="text-sm opacity-90">Associate Level • Score: 847/1000</div>
                <div className="text-xs opacity-75 mt-2">Valid until January 2028</div>
              </div>
            </div>
          </div>

          {/* Coach Response */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <img 
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Coach"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h5 className="font-semibold text-blue-800">Coach Jennifer</h5>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">2 min ago</span>
                </div>
                <p className="text-blue-700">
                  AMAZING work Sarah! 🎉 That's an excellent score - you're clearly ready for those senior-level conversations. 
                  Let's schedule a mock interview session this week to practice talking about your new AWS knowledge. 
                  You're so close to landing that dream role!
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-3">🎯 What's Next?</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 text-sm">Update LinkedIn with AWS certification</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 text-sm">Start networking milestone (5 senior engineers)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 text-sm">Schedule mock interview with Jennifer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-slate-800">Client Analytics</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">Last 30 days</button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium">This quarter</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">94%</div>
            <div className="text-sm text-slate-600">Milestone Completion Rate</div>
            <div className="text-xs text-emerald-600 mt-1">↗ +12% vs last quarter</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">8.2</div>
            <div className="text-sm text-slate-600">Avg Days per Milestone</div>
            <div className="text-xs text-blue-600 mt-1">↗ 15% faster</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">87%</div>
            <div className="text-sm text-slate-600">Client Satisfaction</div>
            <div className="text-xs text-purple-600 mt-1">↗ +5% this month</div>
          </div>
        </div>
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Top Performers This Month</h3>
        
        <div className="space-y-4">
          {[
            { name: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', completed: 3, streak: 12, rank: 1 },
            { name: 'Marcus Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', completed: 2, streak: 8, rank: 2 },
            { name: 'Emily Johnson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', completed: 2, streak: 5, rank: 3 }
          ].map((client) => (
            <div key={client.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  client.rank === 1 ? 'bg-yellow-500' :
                  client.rank === 2 ? 'bg-slate-400' :
                  'bg-amber-600'
                }`}>
                  {client.rank}
                </div>
                <img 
                  src={client.avatar}
                  alt={client.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-slate-800">{client.name}</span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{client.completed}</div>
                  <div className="text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{client.streak}</div>
                  <div className="text-slate-500">Day Streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Insights */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Engagement Insights</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
            <h4 className="font-semibold text-emerald-800 mb-3">Most Active Times</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 text-sm">Tuesday evenings</span>
                <div className="w-20 bg-emerald-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 text-sm">Sunday mornings</span>
                <div className="w-20 bg-emerald-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <h4 className="font-semibold text-blue-800 mb-3">Completion Patterns</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-700 text-sm">Technical skills</span>
                <div className="w-20 bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700 text-sm">Networking goals</span>
                <div className="w-20 bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
              </div>
            </div>
          </div>
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
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
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
        </div>
      </header>

      {/* Demo Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-1">
              {steps.map((step, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentStep === index
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
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-500 ease-in-out">
          {getCurrentView()}
        </div>
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in zoom-in-95 duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                  {modalContent?.type === 'celebration' ? (
                    <Trophy className="w-5 h-5 text-white" />
                  ) : modalContent?.type === 'path-builder' ? (
                    <Plus className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{modalContent?.title}</h3>
              </div>
              <p className="text-slate-600 mb-6">{modalContent?.content}</p>
              
              {modalContent?.type === 'celebration' && (
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                      alt="Sarah"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-emerald-800">Sarah Chen</span>
                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Just now</span>
                  </div>
                  {isTyping ? (
                    <p className="text-emerald-700 text-sm">{typedText}<span className="animate-pulse">|</span></p>
                  ) : (
                    <p className="text-emerald-700 text-sm">Just passed my AWS exam with 847/1000! 🎉 The practice tests really helped. Already feeling more confident about cloud architecture discussions in interviews.</p>
                  )}
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="opacity-0 pointer-events-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DemoPage;