import React from 'react';
import { User, Target, Calendar, TrendingUp } from 'lucide-react';
import { Client } from '../types';

interface ClientCardProps {
  client: Client;
  onClick: () => void;
  progress?: number;
  activePaths?: number;
  streak?: number;
}

const ClientCard: React.FC<ClientCardProps> = ({ 
  client, 
  onClick, 
  progress = 0, 
  activePaths = 0, 
  streak = 0 
}) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-emerald-600 bg-emerald-100';
    if (progress >= 60) return 'text-blue-600 bg-blue-100';
    if (progress >= 40) return 'text-amber-600 bg-amber-100';
    return 'text-slate-600 bg-slate-100';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Client Header */}
      <div className="flex items-center space-x-4 mb-4">
        {client.avatar_url ? (
          <img 
            src={client.avatar_url} 
            alt={client.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {getInitials(client.name)}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-lg">{client.name}</h3>
          <p className="text-slate-600 text-sm">{client.email}</p>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-slate-700">Current Goal</span>
        </div>
        <p className="text-slate-900 font-medium">{client.goal_title}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-600">Overall Progress</span>
          <span className="text-sm font-medium text-slate-900">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
            style={{width: `${progress}%`}}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getProgressColor(progress)} mb-1`}>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500">Progress</div>
          <div className="font-bold text-slate-900">{progress}%</div>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mb-1">
            <Target className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500">Active Paths</div>
          <div className="font-bold text-slate-900">{activePaths}</div>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 mb-1">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-500">Day Streak</div>
          <div className="font-bold text-slate-900">{streak}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;