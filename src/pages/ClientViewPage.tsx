import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Target, CheckCircle, Clock, MessageSquare, Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Client, Milestone } from '../types';

const ClientViewPage: React.FC = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatingMilestone, setUpdatingMilestone] = useState<string | null>(null);
  const [noteUpdates, setNoteUpdates] = useState<Record<string, string>>({});

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    try {
      setLoading(true);
      setError('');

      // Check if client exists and password matches
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .eq('client_password', password.trim())
        .single();

      if (clientError || !clientData) {
        setError('Invalid password. Please check with your coach.');
        return;
      }

      setClient(clientData);
      setAuthenticated(true);

      // Load milestones
      const { data: milestonesData, error: milestonesError } = await supabase
        .from('milestones')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: true });

      if (milestonesError) throw milestonesError;
      setMilestones(milestonesData || []);

      // Initialize note updates with existing descriptions
      const initialNotes: Record<string, string> = {};
      (milestonesData || []).forEach(milestone => {
        initialNotes[milestone.id] = milestone.description || '';
      });
      setNoteUpdates(initialNotes);

    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestoneComplete = async (milestone: Milestone) => {
    try {
      setUpdatingMilestone(milestone.id);
      const newCompleted = !milestone.completed;
      
      const updateData: any = {
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null,
        description: noteUpdates[milestone.id] || milestone.description
      };

      const { error } = await supabase
        .from('milestones')
        .update(updateData)
        .eq('id', milestone.id);

      if (error) throw error;

      // Update local state
      setMilestones(milestones.map(m => 
        m.id === milestone.id 
          ? { ...m, completed: newCompleted, completed_at: updateData.completed_at, description: updateData.description }
          : m
      ));
    } catch (err: any) {
      setError('Failed to update milestone. Please try again.');
    } finally {
      setUpdatingMilestone(null);
    }
  };

  const updateMilestoneNote = async (milestoneId: string) => {
    try {
      setUpdatingMilestone(milestoneId);
      
      const { error } = await supabase
        .from('milestones')
        .update({ description: noteUpdates[milestoneId] || null })
        .eq('id', milestoneId);

      if (error) throw error;

      // Update local state
      setMilestones(milestones.map(m => 
        m.id === milestoneId 
          ? { ...m, description: noteUpdates[milestoneId] }
          : m
      ));
    } catch (err: any) {
      setError('Failed to update note. Please try again.');
    } finally {
      setUpdatingMilestone(null);
    }
  };

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercentage = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  // Password entry screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">OnPathFlow</h1>
            <p className="text-slate-600 mb-1">by Freedom Lab</p>
            <p className="text-slate-500 text-sm">Access your goal progress</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-6 h-6 text-slate-400" />
              <h2 className="text-xl font-semibold text-slate-900">Enter Access Code</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Access Code
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 pr-12 text-slate-900 placeholder-slate-500"
                    placeholder="Enter the code from your coach"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-slate-500 text-sm mt-2">
                  Your coach provided this access code to view your progress
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Accessing...</span>
                  </div>
                ) : (
                  'Access My Progress'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main client dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">Welcome back, {client?.name}! <span className="text-3xl">🤚</span></h1>
              <p className="text-slate-600">Track your progress and celebrate your wins</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Goal Overview */}
        <div className="bg-gradient-to-br from-white/95 via-yellow-50/90 to-orange-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/30 p-8 mb-8 relative overflow-hidden">
          {/* Sparkle Effects */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="absolute top-8 right-12 w-2 h-2 bg-orange-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-6 right-20 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-12 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-2 right-16 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-sm">🎯 Your Goal</h2>
            <p className="text-2xl text-slate-800 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{client?.goal}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">{progressPercentage}%</div>
              <div className="text-slate-600 font-semibold text-lg">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">{completedCount}</div>
              <div className="text-slate-600 font-semibold text-lg">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 bg-clip-text text-transparent drop-shadow-lg">{milestones.length}</div>
              <div className="text-slate-600 font-semibold text-lg">Total</div>
            </div>
          </div>
          
          <div className="w-full bg-gradient-to-r from-slate-200 to-slate-300 rounded-full h-6 shadow-inner relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 to-purple-500 h-6 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden" 
              style={{width: `${progressPercentage}%`}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-200/30 p-8 relative overflow-hidden">
          {/* Floating sparkles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">✨ Your Milestones ✨</h3>
          
          {milestones.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Your coach will add milestones for you to track</p>
            </div>
          ) : (
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.id} className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                  milestone.completed 
                    ? 'border-green-300 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 shadow-xl transform scale-105' 
                    : 'border-blue-200 bg-gradient-to-r from-white/80 via-blue-50/50 to-purple-50/50 hover:border-purple-300 hover:shadow-xl hover:bg-gradient-to-r hover:from-white/90 hover:via-blue-50/70 hover:to-purple-50/70 hover:scale-102'
                }`}>
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleMilestoneComplete(milestone)}
                      disabled={updatingMilestone === milestone.id}
                      className="flex-shrink-0 mt-1 transition-all duration-200 disabled:opacity-50"
                    >
                      {milestone.completed ? (
                        <CheckCircle className="w-8 h-8 text-green-500 drop-shadow-lg animate-pulse" />
                      ) : (
                        <div className="w-8 h-8 border-3 border-blue-300 rounded-full hover:border-purple-500 hover:shadow-lg transition-all duration-200 hover:scale-110 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100"></div>
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h4 className={`text-lg font-semibold mb-2 ${
                        milestone.completed ? 'text-green-700 line-through' : 'text-slate-900'
                      }`}>
                        {milestone.title}
                      </h4>
                      
                      {milestone.due_date && (
                        <p className="text-slate-500 text-sm mb-3">
                          Due: {new Date(milestone.due_date).toLocaleDateString()}
                        </p>
                      )}
                      
                      {milestone.completed_at && (
                        <p className="text-emerald-600 text-sm mb-3 font-medium">
                          🎉 Completed {new Date(milestone.completed_at).toLocaleDateString()}
                        </p>
                      )}
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            <MessageSquare className="w-5 h-5 inline mr-2 text-blue-500" />
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Your notes & progress updates:</span>
                          </label>
                          <textarea
                            value={noteUpdates[milestone.id] || ''}
                            onChange={(e) => setNoteUpdates({
                              ...noteUpdates,
                              [milestone.id]: e.target.value
                            })}
                            className="w-full px-4 py-3 bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-slate-900 placeholder-slate-500 transition-all duration-200 hover:border-blue-300 shadow-lg hover:shadow-xl"
                            placeholder="Add notes about your progress, challenges, or achievements..."
                            rows={3}
                          />
                        </div>
                        
                        {noteUpdates[milestone.id] !== (milestone.description || '') && (
                          <button
                            onClick={() => updateMilestoneNote(milestone.id)}
                            disabled={updatingMilestone === milestone.id}
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-2xl transform hover:scale-105 animate-pulse"
                          >
                            {updatingMilestone === milestone.id ? '💾 Saving...' : '💾 Save Note'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 via-pink-500 via-purple-500 to-blue-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden animate-pulse">
            {/* Animated sparkles */}
            <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-4 left-8 w-3 h-3 bg-yellow-200 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-pink-200 rounded-full animate-bounce" style={{animationDelay: '0.9s'}}></div>
            <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute bottom-8 left-12 w-2.5 h-2.5 bg-orange-200 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            
            <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">Keep Going! 🚀✨</h3>
            <p className="text-white/95 text-xl font-medium drop-shadow-md">
              {progressPercentage === 100 
                ? "🎉 AMAZING! You've completed your goal! You're a superstar! 🌟" 
                : progressPercentage >= 75 
                ? "🔥 You're almost there! Incredible progress! Keep pushing! 💪" 
                : progressPercentage >= 50 
                ? "⚡ Halfway there! You're crushing it! Keep the momentum! 🎯" 
                : progressPercentage >= 25 
                ? "🌟 Great start! You're building amazing momentum! 🚀" 
                : "✨ Every journey begins with a single step. You've got this! Believe in yourself! 💫"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientViewPage;