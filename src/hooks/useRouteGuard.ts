import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from './useSubscription';

export const useRouteGuard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't redirect while loading
    if (authLoading || profileLoading) return;

    // Not logged in? Go to signup
    if (!user) {
      navigate('/signup', { replace: true });
      return;
    }

    // Logged in but no subscription? Go to get-started
    if (!hasActiveSubscription()) {
      navigate('/get-started', { replace: true });
      return;
    }

    // Logged in with subscription? Stay on dashboard (do nothing)
  }, [user, profile, authLoading, profileLoading, hasActiveSubscription, navigate]);

  return {
    loading: authLoading || profileLoading
  };
};