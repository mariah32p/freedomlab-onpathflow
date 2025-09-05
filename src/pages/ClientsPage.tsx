import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Users, X, Trash2, Edit, Key, Copy, ExternalLink } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Client, Milestone } from '../types';
import { generateClientPassword } from '../utils/passwordGenerator';

const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [clientMilestones, setClientMilestones] = useState<Record<string, Milestone[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showClientAccessModal, setShowClientAccessModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingClient, setAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    goal: ''
  });
  const [editClient, setEditClient] = useState({
    name: '',
    email: '',
    goal: ''
  });

  // Load clients from database
  useEffect(() => {
    if (user) {
      loadClients();
    }
  }, [user]);

  const loadClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
      
      // Load milestones for all clients
      if (data && data.length > 0) {
        const clientIds = data.map(client => client.id);
        const { data: milestonesData, error: milestonesError } = await supabase
          .from('milestones')
          .select('*')
          .in('client_id', clientIds);
        
        if (milestonesError) throw milestonesError;
        
        // Group milestones by client_id
        const milestonesByClient: Record<string, Milestone[]> = {};
        (milestonesData || []).forEach(milestone => {
          if (!milestonesByClient[milestone.client_id]) {
            milestonesByClient[milestone.client_id] = [];
          }
          milestonesByClient[milestone.client_id].push(milestone);
        });
        
        setClientMilestones(milestonesByClient);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email || !newClient.goal) return;
    
    try {
      setAddingClient(true);
      setError('');
      
      const { data, error } = await supabase
        .from('clients')
        .insert({
          user_id: user!.id,
          name: newClient.name,
          email: newClient.email,
          goal: newClient.goal
        })
        .select()
        .single();

      if (error) throw error;
      
      setClients([data, ...clients]);
      setNewClient({ name: '', email: '', goal: '' });
      setShowAddModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingClient(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    
    try {
      setDeleting(true);
      setError('');
      
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientToDelete.id)
        .eq('user_id', user!.id);

      if (error) throw error;
      
      setClients(clients.filter(c => c.id !== clientToDelete.id));
      setShowDeleteModal(false);
      setClientToDelete(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEditClient = async () => {
    if (!editClient.name || !editClient.goal || !clientToEdit) return;
    
    try {
      setEditing(true);
      setError('');
      
      const { error } = await supabase
        .from('clients')
        .update({
          name: editClient.name,
          email: editClient.email,
          goal: editClient.goal
        })
        .eq('id', clientToEdit.id)
        .eq('user_id', user!.id);

      if (error) throw error;
      
      // Update local state
      setClients(clients.map(c => 
        c.id === clientToEdit.id 
          ? { ...c, name: editClient.name, email: editClient.email, goal: editClient.goal }
          : c
      ));
      
      setEditClient({ name: '', email: '', goal: '' });
      setClientToEdit(null);
      setShowEditModal(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setEditing(false);
    }
  };

  const handleGenerateClientAccess = async (client: Client) => {
    try {
      setError('');
      const newPassword = generateClientPassword();
      
      const { error } = await supabase
        .from('clients')
        .update({ client_password: newPassword })
        .eq('id', client.id)
        .eq('user_id', user!.id);

      if (error) throw error;
      
      // Update local state
      setClients(clients.map(c => 
        c.id === client.id 
          ? { ...c, client_password: newPassword }
          : c
      ));
      
      setSelectedClient({ ...client, client_password: newPassword });
      setGeneratedPassword(newPassword);
      setShowClientAccessModal(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const sendClientAccessEmail = async (client: Client, password: string) => {
    if (!client.email) {
      setError('Client email is required to send access details');
      return;
    }

    try {
      setSendingEmail(true);
      setError('');
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No active session');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-client-access`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: client.id,
          clientEmail: client.email,
          clientName: client.name,
          accessUrl: getClientAccessUrl(client),
          password: password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSendingEmail(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const getClientAccessUrl = (client: Client) => {
    return `${window.location.origin}/client-view/${client.id}`;
  };

  const openEditModal = (client: Client) => {
    setClientToEdit(client);
    setEditClient({
      name: client.name,
      email: client.email || '',
      goal: client.goal
    });
    setShowEditModal(true);
  };

  const confirmDelete = (client: Client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  const calculateProgress = (client: Client) => {
    const milestones = clientMilestones[client.id] || [];
    if (milestones.length === 0) return 0;
    
    const completedCount = milestones.filter(m => m.completed).length;
    return Math.round((completedCount / milestones.length) * 100);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading clients...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Client Goals</h1>
            <p className="text-slate-600">Track and manage goals for your clients</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client Goal</span>
          </button>
        </div>

        {/* Clients Grid */}
        {clients.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No client goals yet</h3>
            <p className="text-slate-600 mb-6">Create your first client goal to start tracking progress</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Client Goal</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 relative group"
              >
                <Link
                  to={`/clients/${client.id}`}
                  className="block"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900 text-lg">{client.name}</h3>
                    <p className="text-slate-600 text-sm">{client.email}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-slate-700 font-medium">{client.goal}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm font-medium text-slate-900">{calculateProgress(client)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${calculateProgress(client)}%`}}
                      ></div>
                    </div>
                  </div>
                </Link>
                
                {/* Action Buttons - Always Visible */}
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleGenerateClientAccess(client)}
                    className="flex-1 bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-1"
                  >
                    <Key className="w-4 h-4" />
                    <span>Share with Client</span>
                  </button>
                  <button
                    onClick={() => openEditModal(client)}
                    className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(client)}
                    className="px-3 py-2 border border-slate-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Client Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Create New Client Goal</h2>
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
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="Client's name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Client Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="client@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Goal Description
                  </label>
                  <input
                    type="text"
                    value={newClient.goal}
                    onChange={(e) => setNewClient({...newClient, goal: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="What does this client want to achieve?"
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
                  disabled={!newClient.name || !newClient.goal || addingClient}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingClient ? 'Creating...' : 'Create Client Goal'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Client Modal */}
        {showEditModal && clientToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Edit Client Goal</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setClientToEdit(null);
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
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editClient.name}
                    onChange={(e) => setEditClient({...editClient, name: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="Client's name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Client Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={editClient.email}
                    onChange={(e) => setEditClient({...editClient, email: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="client@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Goal Description
                  </label>
                  <input
                    type="text"
                    value={editClient.goal}
                    onChange={(e) => setEditClient({...editClient, goal: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 placeholder-slate-500"
                    placeholder="What does this client want to achieve?"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setClientToEdit(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditClient}
                  disabled={!editClient.name || !editClient.goal || editing}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editing ? 'Updating...' : 'Update Goal'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && clientToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Delete Client Goal</h2>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete the goal "{clientToDelete.goal}" for {clientToDelete.name}? 
                This will also delete all associated milestones and cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setClientToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteClient}
                  disabled={deleting}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? 'Deleting...' : 'Delete Goal'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Client Access Modal */}
        {showClientAccessModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Client Access Generated</h2>
                <button 
                  onClick={() => {
                    setShowClientAccessModal(false);
                    setSelectedClient(null);
                    setCopySuccess(false);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-emerald-800 text-sm font-medium mb-2">
                    ✅ Access created for {selectedClient.name}
                  </p>
                  <p className="text-emerald-700 text-sm">
                    Send via email or copy the details below to share with your client.
                  </p>
                </div>

                {/* Send Email Button */}
                {selectedClient.email && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">📧 Send via Email</h4>
                        <p className="text-blue-700 text-sm">Send access details to {selectedClient.email}</p>
                      </div>
                      <button
                        onClick={() => sendClientAccessEmail(selectedClient, generatedPassword)}
                        disabled={sendingEmail}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingEmail ? 'Sending...' : 'Send Email'}
                      </button>
                    </div>
                  </div>
                )}

                {emailSent && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 text-sm font-medium">✅ Email sent successfully to {selectedClient.email}!</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Client Access Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={getClientAccessUrl(selectedClient)}
                      readOnly
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(getClientAccessUrl(selectedClient))}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors duration-200"
                      title="Copy link"
                    >
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                    <a
                      href={getClientAccessUrl(selectedClient)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors duration-200"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                    </a>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={generatedPassword}
                      readOnly
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-lg"
                    />
                    <button
                      onClick={() => copyToClipboard(generatedPassword)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors duration-200"
                      title="Copy password"
                    >
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Easy to remember and type, but secure
                  </p>
                </div>

                {copySuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm">✅ Copied to clipboard!</p>
                  </div>
                )}

              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowClientAccessModal(false);
                    setSelectedClient(null);
                    setCopySuccess(false);
                    setEmailSent(false);
                  }}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ClientsPage;