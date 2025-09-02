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

    // Not authenticated - redirect to signup
    if (!user) {
      navigate('/signup', { replace: true });
      return;
    }

    // No profile yet - shouldn't happen but handle gracefully
    if (!profile) {
      console.warn('User authenticated but no profile found');
      return;
    }

    const currentPath = location.pathname;

    // Route logic based on subscription status
    if (isNotStarted()) {
      // User signed up but never completed checkout
      if (currentPath !== '/get-started') {
        navigate('/get-started', { replace: true });
      }
    } else if (isTrialing() || isActive()) {
      // Full access - allow dashboard
      if (currentPath === '/get-started') {
        navigate('/dashboard', { replace: true });
      }
    } else if (isPastDue() && isInGracePeriod()) {
      // Payment issue but within grace period - allow dashboard with banner
      if (currentPath === '/get-started') {
        navigate('/dashboard', { replace: true });
      }
    } else if (isPastDue() && !isInGracePeriod()) {
      // Grace period expired - redirect to get started
      if (currentPath !== '/get-started') {
        navigate('/get-started', { replace: true });
      }
    } else if (isCanceled()) {
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