import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Plus, ArrowLeft, X, AlertCircle } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Client, Milestone } from '../types';

const ClientDetailPage: React.FC = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [client, setClient] = useState<Client | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingMilestone, setAddingMilestone] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    due_date: ''
  });
  const [editMilestone, setEditMilestone] = useState({
    title: '',
    description: '',
    due_date: ''
  });

  // Load client and milestones
  useEffect(() => {
    if (user && clientId) {
      loadClientData();
    }
  }, [user, clientId]);

  const loadClientData = async () => {
    try {
      setLoading(true);
      setError('');

      // Load client
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .eq('user_id', user!.id)
        .single();

      if (clientError) throw clientError;
      if (!clientData) {
        setError('Client not found');
        return;
      }

      setClient(clientData);

      // Load milestones
      const { data: milestonesData, error: milestonesError } = await supabase
        .from('milestones')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: true });

      if (milestonesError) throw milestonesError;
      setMilestones(milestonesData || []);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestone = async () => {
    if (!newMilestone.title.trim()) return;
    
    try {
      setAddingMilestone(true);
      setError('');
      
      const milestoneData: any = {
        client_id: clientId,
        title: newMilestone.title.trim(),
        description: newMilestone.description.trim() || null,
        due_date: newMilestone.due_date || null
      };

      const { data, error } = await supabase
        .from('milestones')
        .insert(milestoneData)
        .select()
        .single();

      if (error) throw error;
      
      setMilestones([...milestones, data]);
      setNewMilestone({ title: '', description: '', due_date: '' });
      setShowAddModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingMilestone(false);
    }
  };

  const handleEditMilestone = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setEditMilestone({
      title: milestone.title,
      description: milestone.description || '',
      due_date: milestone.due_date || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateMilestone = async () => {
    if (!editMilestone.title.trim() || !editingMilestone) return;
    
    try {
      setAddingMilestone(true);
      setError('');
      
      const updateData: any = {
        title: editMilestone.title.trim(),
        description: editMilestone.description.trim() || null,
        due_date: editMilestone.due_date || null
      };

      const { error } = await supabase
        .from('milestones')
        .update(updateData)
        .eq('id', editingMilestone.id);

      if (error) throw error;
      
      // Update local state
      setMilestones(milestones.map(m => 
        m.id === editingMilestone.id 
          ? { ...m, ...updateData }
          : m
      ));
      
      setEditMilestone({ title: '', description: '', due_date: '' });
      setEditingMilestone(null);
      setShowEditModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingMilestone(false);
    }
  };

  const toggleMilestoneComplete = async (milestone: Milestone) => {
    try {
      const newCompleted = !milestone.completed;
      const updateData: any = {
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('milestones')
        .update(updateData)
        .eq('id', milestone.id);

      if (error) throw error;

      // Update local state
      setMilestones(milestones.map(m => 
        m.id === milestone.id 
          ? { ...m, completed: newCompleted, completed_at: updateData.completed_at }
          : m
      ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading client...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error && !client) {
    return (
      <AppLayout>
        <div className="p-6 lg:p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => navigate('/clients')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{client?.name}</h1>
            {client?.email && <p className="text-slate-600">{client?.email}</p>}
          </div>
        </div>

        {/* Goal Overview */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Client Goal Details</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-slate-900">{client?.goal}</h3>
              <p className="text-slate-600 text-sm">
                {completedCount} of {milestones.length} milestones completed
              </p>
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
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>
          
          {milestones.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No milestones yet</h3>
              <p className="text-slate-600 mb-4">Add the first milestone to start tracking progress</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
              >
                Add First Milestone
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                  <button
                    onClick={() => toggleMilestoneComplete(milestone)}
                    className="flex-shrink-0 transition-colors duration-200"
                  >
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-slate-300 rounded-full hover:border-emerald-500"></div>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${milestone.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                      {milestone.title}
                    </h4>
                    {milestone.description && (
                      <p className="text-slate-600 text-sm mt-1">{milestone.description}</p>
                    )}
                    {milestone.due_date && (
                      <p className="text-slate-500 text-sm mt-1">
                        Due: {new Date(milestone.due_date).toLocaleDateString()}
                      </p>
                    )}
                    {milestone.completed_at && (
                      <p className="text-emerald-600 text-sm mt-1">
                        ✓ Completed {new Date(milestone.completed_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleEditMilestone(milestone)}
                    className="text-slate-400 hover:text-slate-600 text-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Milestone Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Add New Milestone</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="What needs to be accomplished?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="Additional details..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={newMilestone.due_date}
                    onChange={(e) => setNewMilestone({...newMilestone, due_date: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    min={new Date().toISOString().split('T')[0]}
                    placeholder=""
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
                  onClick={handleAddMilestone}
                  disabled={!newMilestone.title.trim() || addingMilestone}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingMilestone ? 'Adding...' : 'Add Milestone'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Milestone Modal */}
        {showEditModal && editingMilestone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Edit Milestone</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMilestone(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    value={editMilestone.title}
                    onChange={(e) => setEditMilestone({...editMilestone, title: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="What needs to be accomplished?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={editMilestone.description}
                    onChange={(e) => setEditMilestone({...editMilestone, description: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="Additional details..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={editMilestone.due_date}
                    onChange={(e) => setEditMilestone({...editMilestone, due_date: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    min={new Date().toISOString().split('T')[0]}
                    placeholder=""
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMilestone(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMilestone}
                  disabled={!editMilestone.title.trim() || addingMilestone}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingMilestone ? 'Updating...' : 'Update Milestone'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ClientDetailPage;