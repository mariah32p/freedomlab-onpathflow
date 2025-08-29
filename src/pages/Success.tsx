import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Target, ArrowRight } from 'lucide-react';

export const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to OnPathFlow!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your subscription has been successfully activated. You now have full access to all OnPathFlow features to help keep your clients motivated and on track.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-left">
              <Target className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700">Create visual progress paths</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <Target className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700">Set up automated milestones</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <Target className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700">Manage unlimited clients</span>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <p className="text-sm text-gray-500 mt-6">
            Need help getting started? Check out our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              quick start guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};