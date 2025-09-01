import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, shouldRedirectToGetStarted } = useProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not signed in - redirect to signup
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  // User exists but needs to set up subscription
  if (shouldRedirectToGetStarted()) {
    return <Navigate to="/get-started" replace />;
  }

  // User has active subscription or is in trial/grace period
  return <>{children}</>;
};

export default RouteGuard;