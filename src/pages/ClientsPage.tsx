import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Users, Target, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import ClientCard from '../components/ClientCard';
import { Client } from '../types';

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Mock data - replace with real data from Supabase
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      goal_title: 'Become Senior Software Engineer',
      created_at: '2024-12-01T00:00:00Z',
      updated_at: '2024-12-01T00:00:00Z',
      user_id: 'user-1'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus@example.com',
      avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      goal_title: 'Launch Tech Startup',
      created_at: '2024-11-15T00:00:00Z',
      updated_at: '2024-11-15T00:00:00Z',
      user_id: 'user-1'
    },
    {
      id: '3',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      goal_title: 'Start Consulting Business',
      created_at: '2024-11-01T00:00:00Z',
      updated_at: '2024-11-01T00:00:00Z',
      user_id: 'user-1'
    }
  ];

  // Mock progress data
  const clientProgress = {
    '1': { progress: 75, activePaths: 2, streak: 12 },
    '2': { progress: 45, activePaths: 1, streak: 8 },
    '3': { progress: 30, activePaths: 1, streak: 3 }
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.goal_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              className="text-emerald-600 border-b-2 border-emerald-600 pb-2 px-1 text-sm font-medium"
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
              className="text-slate-500 hover:text-slate-700 pb-2 px-1 text-sm font-medium transition-colors duration-200"
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
            <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
            <p className="text-slate-600 mt-1">Manage your coaching clients and their progress</p>
          </div>
          <Link
            to="/clients/new"
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-slate-900">{mockClients.length}</p>
              </div>
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active Goals</p>
                <p className="text-3xl font-bold text-slate-900">
                  {Object.values(clientProgress).reduce((sum, client) => sum + client.activePaths, 0)}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Avg Progress</p>
                <p className="text-3xl font-bold text-slate-900">
                  {Math.round(Object.values(clientProgress).reduce((sum, client) => sum + client.progress, 0) / Object.values(clientProgress).length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Clients</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed Goals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No clients found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first client.'}
            </p>
            <Link
              to="/clients/new"
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Client</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() => {/* Navigate to client detail */}}
                progress={clientProgress[client.id]?.progress || 0}
                activePaths={clientProgress[client.id]?.activePaths || 0}
                streak={clientProgress[client.id]?.streak || 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;