import React from 'react';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Client, Milestone } from '../types';

const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAnalyticsData();
    }
  }, [user]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Load clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user!.id);

      if (clientsError) throw clientsError;
      setClients(clientsData || []);
      
      // Load milestones
      if (clientsData && clientsData.length > 0) {
        const clientIds = clientsData.map(client => client.id);
        const { data: milestonesData, error: milestonesError } = await supabase
          .from('milestones')
          .select('*')
          .in('client_id', clientIds);
        
        if (milestonesError) throw milestonesError;
        setMilestones(milestonesData || []);
      }
    } catch (err: any) {
      console.error('Error loading analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate real metrics
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  const completionRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
  const activeGoals = clients.length;

  // Calculate client performance
  const clientPerformance = clients.map(client => {
    const clientMilestones = milestones.filter(m => m.client_id === client.id);
    const completed = clientMilestones.filter(m => m.completed).length;
    return {
      ...client,
      completed,
      total: clientMilestones.length,
      percentage: clientMilestones.length > 0 ? Math.round((completed / clientMilestones.length) * 100) : 0
    };
  }).sort((a, b) => b.completed - a.completed);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading analytics...</p>
          </div>
        </div>
      </AppLayout>
    );
  }
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
                <p className="text-2xl font-bold text-slate-900">{completionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Active Goals</p>
                <p className="text-2xl font-bold text-slate-900">{activeGoals}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Milestones Completed</p>
                <p className="text-2xl font-bold text-slate-900">{completedMilestones}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Top Performers This Month</h2>
          
          {clientPerformance.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No client data yet. Add some clients to see performance metrics.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clientPerformance.slice(0, 5).map((client, index) => (
                <div key={client.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-slate-400' :
                      index === 2 ? 'bg-amber-600' :
                      'bg-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <span className="font-medium text-slate-800">{client.name}</span>
                      <p className="text-slate-500 text-sm">{client.goal}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-600 font-bold">{client.completed} completed</div>
                    <div className="text-slate-500 text-sm">{client.percentage}% progress</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;