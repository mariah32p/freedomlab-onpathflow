import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from './useSubscription';

export const useRouteGuard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🛡️ Route Guard Check:', {
      authLoading,
      profileLoading,
      user: user?.email,
      profile: profile?.subscription_status,
      hasActive: hasActiveSubscription()
    });

    // Don't redirect while loading
    if (authLoading || profileLoading) return;

    // Not logged in? Go to signup
    if (!user) {
      console.log('❌ No user, redirecting to signup');
      navigate('/signup', { replace: true });
      return;
    }

    // Check subscription status
    if (!hasActiveSubscription()) {
      console.log('❌ No active subscription, redirecting to get-started');
      navigate('/get-started', { replace: true });
      return;
    }

    console.log('✅ Route guard passed - user has access');
    // Logged in with active subscription? Allow access
  }, [user, profile, authLoading, profileLoading, hasActiveSubscription, navigate]);

  return {
    loading: authLoading || profileLoading
  };
};