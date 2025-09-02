import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from './useSubscription';

export const useRouteGuard = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    profile, 
    loading: profileLoading, 
    isTrialing, 
    isActive, 
    isPastDue, 
    isCanceled, 
    isNotStarted,
    isInGracePeriod 
  } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while loading
    if (authLoading || profileLoading) return;

    console.log('🛡️ Route guard check:', {
      user: !!user,
      profile: !!profile,
      currentPath,
      subscriptionStatus: profile?.subscription_status
    });
    // Not authenticated - redirect to signup
    if (!user) {
      console.log('🚫 No user, redirecting to signup');
      navigate('/signup', { replace: true });
      return;
    }

    // No profile yet - shouldn't happen but handle gracefully
    if (!profile) {
      console.warn('⚠️ User authenticated but no profile found');
      console.warn('User authenticated but no profile found');
      return;
    }

    const currentPath = location.pathname;

    // Route logic based on subscription status
    if (isNotStarted()) {
      console.log('🚀 Subscription not started, checking route');
      // User signed up but never completed checkout
      if (currentPath !== '/get-started') {
        console.log('📍 Redirecting to get-started');
        navigate('/get-started', { replace: true });
      }
    } else if (isTrialing() || isActive()) {
      console.log('✅ Active subscription, allowing dashboard access');
      // Full access - allow dashboard
      if (currentPath === '/get-started') {
        console.log('📍 Redirecting to dashboard');
        navigate('/dashboard', { replace: true });
      }
    } else if (isPastDue() && isInGracePeriod()) {
      console.log('⚠️ Past due but in grace period');
      // Payment issue but within grace period - allow dashboard with banner
      if (currentPath === '/get-started') {
        navigate('/dashboard', { replace: true });
      }
    } else if (isPastDue() && !isInGracePeriod()) {
      console.log('🚫 Past due and grace period expired');
      // Grace period expired - redirect to get started
      if (currentPath !== '/get-started') {
        navigate('/get-started', { replace: true });
      }
    } else if (isCanceled()) {
      console.log('🚫 Subscription canceled');
      // Subscription canceled - redirect to get started
      if (currentPath !== '/get-started') {
        navigate('/get-started', { replace: true });
      }
    }
  }, [
    user, 
    profile, 
    authLoading, 
    profileLoading, 
    navigate, 
    location.pathname,
    isNotStarted,
    isTrialing,
    isActive,
    isPastDue,
    isCanceled,
    isInGracePeriod
  ]);

  return {
    loading: authLoading || profileLoading,
    user,
    profile
  };
};