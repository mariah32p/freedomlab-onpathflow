import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Plus } from 'lucide-react';
import Header from '../components/Header';

const ClientDetailPage: React.FC = () => {
  const { clientId } = useParams();
  
  const [client] = useState({
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    goal: 'Become Senior Software Engineer',
    progress: 75
  });

  const [milestones] = useState([
    {
      id: '1',
      title: 'Complete React Course',
      status: 'completed' as const,
      due_date: '2024-12-20',
      completed_at: '2024-12-15'
    },
    {
      id: '2',
      title: 'Build Portfolio Project',
      status: 'completed' as const,
      due_date: '2025-01-10',
      completed_at: '2025-01-08'
    },
    {
      id: '3',
      title: 'Get AWS Certification',
      status: 'pending' as const,
      due_date: '2025-01-25'
    }
  ]);

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressPercentage = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/clients" className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{client.name}</h1>
            <p className="text-slate-600">{client.email}</p>
          </div>
        </div>

        {/* Goal Overview */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Current Goal</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-slate-900">{client.goal}</h3>
              <p className="text-slate-600 text-sm">{completedCount} of {milestones.length} milestones completed</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">{progressPercentage}%</div>
              <div className="text-slate-500 text-sm">Complete</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-emerald-500 h-3 rounded-full transition-all duration-500" 
                style={{width: `${progressPercentage}%`}}
              ></div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Milestones</h2>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                <div className="flex-shrink-0">
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Clock className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{milestone.title}</h4>
                  {milestone.due_date && (
                    <p className="text-slate-500 text-sm">
                      Due: {new Date(milestone.due_date).toLocaleDateString()}
                    </p>
                  )}
                  {milestone.completed_at && (
                    <p className="text-emerald-600 text-sm">
                      ✓ Completed {new Date(milestone.completed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                {milestone.status === 'pending' && (
                  <button className="bg-emerald-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-emerald-600 transition-colors duration-200">
                    Mark Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;