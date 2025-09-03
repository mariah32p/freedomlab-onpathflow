import React from 'react';
import { CheckCircle, Clock, Calendar, MessageSquare, AlertCircle } from 'lucide-react';
import { Milestone } from '../types';

interface MilestoneCardProps {
  milestone: Milestone;
  onStatusChange: (milestoneId: string, status: Milestone['status']) => void;
  onAddNote: (milestoneId: string) => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ 
  milestone, 
  onStatusChange, 
  onAddNote 
}) => {
  const getStatusIcon = () => {
    switch (milestone.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      case 'in_progress':
        return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
      default:
        return <div className="w-6 h-6 border-2 border-slate-300 rounded-full"></div>;
    }
  };

  const getStatusColor = () => {
    switch (milestone.status) {
      case 'completed':
        return 'bg-emerald-50 border-emerald-200';
      case 'in_progress':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const isOverdue = () => {
    if (!milestone.due_date || milestone.status === 'completed') return false;
    return new Date(milestone.due_date) < new Date();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`rounded-xl p-6 border-2 transition-all duration-200 ${getStatusColor()}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
            {isOverdue() && (
              <div className="flex items-center space-x-1 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Overdue</span>
              </div>
            )}
          </div>
          
          {milestone.description && (
            <p className="text-slate-600 text-sm mb-3">{milestone.description}</p>
          )}
          
          {milestone.due_date && (
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className={`text-sm ${isOverdue() ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                Due: {formatDate(milestone.due_date)}
              </span>
            </div>
          )}
          
          {milestone.completed_at && (
            <div className="text-sm text-emerald-600 mb-3">
              ✓ Completed on {formatDate(milestone.completed_at)}
            </div>
          )}
          
          {milestone.notes && (
            <div className="bg-white rounded-lg p-3 border border-slate-200 mb-3">
              <div className="flex items-start space-x-2">
                <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
                <p className="text-sm text-slate-700">{milestone.notes}</p>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 mt-4">
            {milestone.status === 'pending' && (
              <button
                onClick={() => onStatusChange(milestone.id, 'in_progress')}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Start
              </button>
            )}
            
            {milestone.status === 'in_progress' && (
              <button
                onClick={() => onStatusChange(milestone.id, 'completed')}
                className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors duration-200"
              >
                Complete
              </button>
            )}
            
            <button
              onClick={() => onAddNote(milestone.id)}
              className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors duration-200"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;