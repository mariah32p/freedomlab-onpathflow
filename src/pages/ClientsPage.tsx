import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, ArrowLeft, X } from 'lucide-react';
import Header from '../components/Header';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      goal: 'Become Senior Software Engineer',
      progress: 75
    },
    {
      id: '2', 
      name: 'Marcus Rodriguez',
      email: 'marcus@example.com',
      goal: 'Launch Tech Startup',
      progress: 45
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    goal: ''
  });

  const handleAddClient = () => {
    if (newClient.name && newClient.email && newClient.goal) {
      const client = {
        id: Date.now().toString(),
        name: newClient.name,
        email: newClient.email,
        goal: newClient.goal,
        progress: 0
      };
      setClients([...clients, client]);
      setNewClient({ name: '', email: '', goal: '' });
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
              <p className="text-slate-600">Manage your coaching clients</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </button>
        </div>

        {/* Clients Grid */}
        {clients.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No clients yet</h3>
            <p className="text-slate-600 mb-6">Add your first client to get started</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Client</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Link
                key={client.id}
                to={`/clients/${client.id}`}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 block"
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-slate-900 text-lg">{client.name}</h3>
                  <p className="text-slate-600 text-sm">{client.email}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-slate-700 font-medium">{client.goal}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Progress</span>
                    <span className="text-sm font-medium text-slate-900">{client.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                      style={{width: `${client.progress}%`}}
                    ></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Add Client Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Add New Client</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Goal
                  </label>
                  <input
                    type="text"
                    value={newClient.goal}
                    onChange={(e) => setNewClient({...newClient, goal: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="What's their main goal?"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClient}
                  disabled={!newClient.name || !newClient.email || !newClient.goal}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Client
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;