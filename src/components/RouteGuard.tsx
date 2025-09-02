import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, shouldRedirectToGetStarted, fetchProfile } = useProfile();
  
  console.log('🛡️ RouteGuard - Current state:', {
    user: user?.id,
    authLoading,
    profileLoading,
    profile: profile ? {
      plan: profile.plan,
      subscription_status: profile.subscription_status,
      trial_ends_at: profile.trial_ends_at
    } : null,
    shouldRedirectToGetStarted: shouldRedirectToGetStarted()
  });

  // Force refresh profile data when component mounts (for post-checkout scenarios)
  React.useEffect(() => {
    console.log('🔄 RouteGuard useEffect - checking if profile refresh needed');
    if (user && !profileLoading) {
      console.log('🔄 Fetching fresh profile data');
      fetchProfile();
    }
  }, [user, fetchProfile]);

  // Show loading while auth or profile is loading, OR while we have a user but no profile yet
  if (authLoading || profileLoading || (user && !profile)) {
    console.log('⏳ RouteGuard - Showing loading state');
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
    console.log('🚫 RouteGuard - No user, redirecting to signup');
    return <Navigate to="/signup" replace />;
  }

  // User exists but needs to set up subscription
  if (shouldRedirectToGetStarted()) {
    console.log('🚫 RouteGuard - Should redirect to get-started');
    return <Navigate to="/get-started" replace />;
  }

  // User has active subscription or is in trial/grace period
  console.log('✅ RouteGuard - User has access, rendering children');
  return <>{children}</>;
};

export default RouteGuard;