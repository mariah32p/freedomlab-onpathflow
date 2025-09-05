import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutseta } from '../contexts/OutsetaContext';

export const useOutsetaRouteGuard = () => {
  const { user, subscription, loading, hasActiveSubscription } = useOutseta();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🛡️ Outseta Route Guard Check:', {
      loading,
      user: user?.email,
      subscriptionStatus: subscription?.status,
      hasActive: hasActiveSubscription()
    });

    // Don't redirect while loading
    if (loading) return;

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
  }, [user, subscription, loading, hasActiveSubscription, navigate]);

  return {
    loading
  };
};