import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import AppLayout from '../components/AppLayout';

const AnalyticsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">Track your coaching performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-slate-900">89%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Active Clients</p>
                <p className="text-2xl font-bold text-slate-900">24</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Goals Achieved</p>
                <p className="text-2xl font-bold text-slate-900">47</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Top Performers This Month</h2>
          
          <div className="space-y-4">
            {[
              { name: 'Sarah Chen', completed: 3, rank: 1 },
              { name: 'Marcus Rodriguez', completed: 2, rank: 2 },
              { name: 'Emily Johnson', completed: 2, rank: 3 }
            ].map((client) => (
              <div key={client.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    client.rank === 1 ? 'bg-yellow-500' :
                    client.rank === 2 ? 'bg-slate-400' :
                    'bg-amber-600'
                  }`}>
                    {client.rank}
                  </div>
                  <span className="font-medium text-slate-800">{client.name}</span>
                </div>
                <div className="text-emerald-600 font-bold">{client.completed} completed</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;