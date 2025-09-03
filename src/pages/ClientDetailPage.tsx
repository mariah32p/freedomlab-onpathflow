import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Settings, MessageSquare, Calendar, Target, TrendingUp, Star } from 'lucide-react';
import Header from '../components/Header';
import MilestoneCard from '../components/MilestoneCard';
import { Client, GoalPath, Milestone } from '../types';

const ClientDetailPage: React.FC = () => {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'progress'>('overview');

  // Mock data - replace with real data from Supabase
  const mockClient: Client = {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    goal_title: 'Become Senior Software Engineer',
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    user_id: 'user-1'
  };

  const mockGoalPaths: GoalPath[] = [
    {
      id: '1',
      client_id: '1',
      title: 'Senior Software Engineer Path',
      description: 'Complete technical skills and leadership development',
      target_date: '2025-06-01',
      status: 'active',
      created_at: '2024-12-01T00:00:00Z',
      updated_at: '2024-12-01T00:00:00Z'
    }
  ];

  const mockMilestones: Milestone[] = [
    {
      id: '1',
      goal_path_id: '1',
      title: 'Master React & TypeScript',
      description: 'Complete advanced React course and build 2 TypeScript projects',
      due_date: '2024-12-20',
      status: 'completed',
      order_index: 0,
      completed_at: '2024-12-15T00:00:00Z',
      notes: 'Built a task manager and weather app. Feeling confident with hooks and TypeScript!',
      created_at: '2024-12-01T00:00:00Z',
      updated_at: '2024-12-15T00:00:00Z'
    },
    {
      id: '2',
      goal_path_id: '1',
      title: 'Get AWS Certification',
      description: 'Pass AWS Solutions Architect Associate exam',
      due_date: '2025-01-25',
      status: 'in_progress',
      order_index: 1,
      notes: 'Scheduled exam for next Friday. Been studying 2 hours daily.',
      created_at: '2024-12-01T00:00:00Z',
      updated_at: '2024-12-01T00:00:00Z'
    },
    {
      id: '3',
      goal_path_id: '1',
      title: 'Network with Senior Engineers',
      description: 'Connect with 5 senior engineers at target companies',
      due_date: '2025-02-01',
      status: 'pending',
      order_index: 2,
      created_at: '2024-12-01T00:00:00Z',
      updated_at: '2024-12-01T00:00:00Z'
    }
  ];

  const handleMilestoneStatusChange = (milestoneId: string, status: Milestone['status']) => {
    // TODO: Update milestone status in Supabase
    console.log('Updating milestone status:', milestoneId, status);
  };

  const handleAddNote = (milestoneId: string) => {
    // TODO: Open note modal
    console.log('Adding note to milestone:', milestoneId);
  };

  const getProgressPercentage = () => {
    const completed = mockMilestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / mockMilestones.length) * 100);
  };

  const getStreak = () => {
    // Mock streak calculation
    return 12;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/clients"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div className="flex items-center space-x-4">
                <img 
                  src={mockClient.avatar_url} 
                  alt={mockClient.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{mockClient.name}</h1>
                  <p className="text-slate-600">{mockClient.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors duration-200 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>
              <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors duration-200">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Progress</p>
                <p className="text-3xl font-bold text-emerald-700">{getProgressPercentage()}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Active Paths</p>
                <p className="text-3xl font-bold text-blue-700">{mockGoalPaths.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Milestones</p>
                <p className="text-3xl font-bold text-purple-700">
                  {mockMilestones.filter(m => m.status === 'completed').length}/{mockMilestones.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Day Streak</p>
                <p className="text-3xl font-bold text-amber-700">{getStreak()}</p>
              </div>
              <Star className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Goal Path Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Current Goal</h2>
            <Link
              to={`/clients/${clientId}/paths/new`}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Path</span>
            </Link>
          </div>

          {mockGoalPaths.map((path) => (
            <div key={path.id} className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">{path.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  path.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  path.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {path.status}
                </span>
              </div>
              
              {path.description && (
                <p className="text-slate-700 mb-4">{path.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      Target: {path.target_date ? new Date(path.target_date).toLocaleDateString() : 'No date set'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{getProgressPercentage()}%</div>
                    <div className="text-sm text-slate-500">Complete</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
                    style={{width: `${getProgressPercentage()}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Milestones</h2>
          
          <div className="space-y-6">
            {mockMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {index < mockMilestones.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-slate-200"></div>
                )}
                <MilestoneCard
                  milestone={milestone}
                  onStatusChange={handleMilestoneStatusChange}
                  onAddNote={handleAddNote}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailPage;