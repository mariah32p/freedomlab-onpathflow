import React from 'react';
import { TrendingUp, Users, Target, Calendar, Star, Trophy, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const AnalyticsPage: React.FC = () => {
  // Mock analytics data
  const analyticsData = {
    totalClients: 24,
    activeGoals: 47,
    completionRate: 89,
    avgTimePerMilestone: 8.2,
    clientSatisfaction: 87,
    monthlyRevenue: 2847,
    topPerformers: [
      { name: 'Sarah Chen', completed: 3, streak: 12, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Marcus Rodriguez', completed: 2, streak: 8, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Emily Johnson', completed: 2, streak: 5, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
    ],
    recentActivity: [
      { client: 'Sarah Chen', action: 'Completed AWS Certification', time: '2 hours ago', type: 'milestone' },
      { client: 'Marcus Rodriguez', action: 'Started new goal path', time: '1 day ago', type: 'goal' },
      { client: 'Emily Johnson', action: 'Updated progress on Business Plan', time: '2 days ago', type: 'progress' },
      { client: 'David Kim', action: 'Completed Leadership Course', time: '3 days ago', type: 'milestone' }
    ],
    engagementPatterns: {
      mostActiveTime: 'Tuesday evenings',
      bestCompletionType: 'Technical skills',
      avgSessionLength: '45 minutes'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex space-x-8 py-4">
            <Link 
              to="/dashboard" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/clients" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Clients
            </Link>
            <Link 
              to="/paths" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Goal Paths
            </Link>
            <Link 
              to="/analytics" 
              className="text-emerald-600 border-b-2 border-emerald-600 pb-2 px-1 text-sm font-medium"
            >
              Analytics
            </Link>
            <Link 
              to="/settings" 
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-600 mt-1">Track your coaching performance and client progress</p>
          </div>
          <div className="flex items-center space-x-2">
            <select className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
              <option>Last 30 days</option>
              <option>This quarter</option>
              <option>This year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-emerald-700">{analyticsData.completionRate}%</p>
                <p className="text-emerald-600 text-xs mt-1">↗ +12% vs last quarter</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Avg Days/Milestone</p>
                <p className="text-3xl font-bold text-blue-700">{analyticsData.avgTimePerMilestone}</p>
                <p className="text-blue-600 text-xs mt-1">↗ 15% faster</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Client Satisfaction</p>
                <p className="text-3xl font-bold text-purple-700">{analyticsData.clientSatisfaction}%</p>
                <p className="text-purple-600 text-xs mt-1">↗ +5% this month</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Monthly Revenue</p>
                <p className="text-3xl font-bold text-amber-700">${analyticsData.monthlyRevenue.toLocaleString()}</p>
                <p className="text-amber-600 text-xs mt-1">↗ +8% this month</p>
              </div>
              <Trophy className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performers */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Performers This Month</h2>
            
            <div className="space-y-4">
              {analyticsData.topPerformers.map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-slate-400' :
                      'bg-amber-600'
                    }`}>
                      {index + 1}
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
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Engagement Insights</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                <h3 className="font-semibold text-emerald-800 mb-3">Most Active Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700 text-sm">Tuesday evenings</span>
                    <div className="w-24 bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700 text-sm">Sunday mornings</span>
                    <div className="w-24 bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700 text-sm">Wednesday lunch</span>
                    <div className="w-24 bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Completion Patterns</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 text-sm">Technical skills</span>
                    <div className="w-24 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 text-sm">Leadership goals</span>
                    <div className="w-24 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 text-sm">Networking goals</span>
                    <div className="w-24 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-xl transition-colors duration-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'milestone' ? 'bg-emerald-100 text-emerald-600' :
                  activity.type === 'goal' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'milestone' ? <CheckCircle className="w-5 h-5" /> :
                   activity.type === 'goal' ? <Target className="w-5 h-5" /> :
                   <TrendingUp className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    <span className="text-emerald-600">{activity.client}</span> {activity.action}
                  </p>
                  <p className="text-slate-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;