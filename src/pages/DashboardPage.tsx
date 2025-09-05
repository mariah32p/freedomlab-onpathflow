import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, Users, Plus, TrendingUp } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useSubscription } from '../hooks/useSubscription';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Client, Milestone } from '../types';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, isTrialing, isPremium } = useSubscription();
  const [clients, setClients] = useState<Client[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // Load dashboard stats
  useEffect(() => {
    if (user) {
      loadDashboardStats();
    }
  }, [user]);

  const loadDashboardStats = async () => {
    try {
      setStatsLoading(true);
      
      // Load clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user!.id);

      if (clientsError) throw clientsError;
      setClients(clientsData || []);
      
      // Load milestones if we have clients
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
      console.error('Error loading dashboard stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const activeMilestones = milestones.filter(m => !m.completed).length;
  const completedMilestones = milestones.filter(m => m.completed).length;
  const completionRate = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Trial Banner */}
        {isTrialing() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 lg:hidden">
            <p className="text-blue-800">
              🎉 You're on a free trial! {isPremium() ? 'Premium' : 'Standard'} plan active.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome to your coaching platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Goals</p>
                <p className="text-2xl font-bold text-slate-900">
                  {statsLoading ? '...' : clients.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Active Milestones</p>
                <p className="text-2xl font-bold text-slate-900">
                  {statsLoading ? '...' : activeMilestones}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-slate-900">
                  {statsLoading ? '...' : `${completionRate}%`}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Getting Started */}
        {!statsLoading && clients.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:p-8">
            <div className="text-center">
              <Target className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Started</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Ready to start tracking client goals? Create your first client goal to get started.
              </p>
              
              <Link 
                to="/clients" 
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Client Goal</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DashboardPage;