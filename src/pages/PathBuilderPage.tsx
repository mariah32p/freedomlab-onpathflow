import React, { useState } from 'react';
import { Plus, Save, Target, Calendar, ArrowLeft, Trash2, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GoalPath, Milestone } from '../types';

const PathBuilderPage: React.FC = () => {
  const [goalPath, setGoalPath] = useState<Partial<GoalPath>>({
    title: '',
    description: '',
    target_date: '',
    status: 'active'
  });

  const [milestones, setMilestones] = useState<Partial<Milestone>[]>([
    {
      title: '',
      description: '',
      due_date: '',
      status: 'pending',
      order_index: 0
    }
  ]);

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
        order_index: milestones.length
      }
    ]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      const newMilestones = milestones.filter((_, i) => i !== index);
      // Reorder indices
      newMilestones.forEach((milestone, i) => {
        milestone.order_index = i;
      });
      setMilestones(newMilestones);
    }
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: any) => {
    const newMilestones = [...milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setMilestones(newMilestones);
  };

  const handleSave = () => {
    // TODO: Save to Supabase
    console.log('Saving goal path:', goalPath);
    console.log('Saving milestones:', milestones);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/paths"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Goal Path Builder</h1>
                <p className="text-slate-600 mt-1">Create a structured path to help your client achieve their goal</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Path</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Goal Path Details */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Goal Details</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Goal Title *
              </label>
              <input
                type="text"
                value={goalPath.title}
                onChange={(e) => setGoalPath({ ...goalPath, title: e.target.value })}
                placeholder="e.g., Become a Senior Software Engineer"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={goalPath.description}
                onChange={(e) => setGoalPath({ ...goalPath, description: e.target.value })}
                placeholder="Describe the goal and what success looks like..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={goalPath.target_date}
                  onChange={(e) => setGoalPath({ ...goalPath, target_date: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={goalPath.status}
                  onChange={(e) => setGoalPath({ ...goalPath, status: e.target.value as GoalPath['status'] })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Milestones</h2>
            <button
              onClick={addMilestone}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-6 relative">
                {/* Drag Handle */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                </div>

                {/* Remove Button */}
                {milestones.length > 1 && (
                  <button
                    onClick={() => removeMilestone(index)}
                    className="absolute right-4 top-4 p-1 text-slate-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="ml-8 mr-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-medium">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Milestone {index + 1}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        placeholder="e.g., Complete React Advanced Course"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                        placeholder="Describe what needs to be accomplished..."
                        rows={2}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={milestone.due_date}
                        onChange={(e) => updateMilestone(index, 'due_date', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Path Preview */}
          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Path Preview</h3>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
                    {index + 1}
                  </div>
                  <span className="text-slate-700">
                    {milestone.title || `Milestone ${index + 1}`}
                  </span>
                  {milestone.due_date && (
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">
                        {new Date(milestone.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathBuilderPage;