import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Profile {
  id: string;
  email: string;
  plan: 'standard' | 'premium';
  subscription_status: string;
  trial_ends_at?: string;
  current_period_end?: string;
  customer_id?: string;
  subscription_id?: string;
  payment_issue_since?: string;
  created_at: string;
  updated_at: string;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) {
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email!,
              plan: 'standard',
              subscription_status: 'not_started'
            })
            .select()
            .single();
          
          if (createError) {
            throw createError;
          }
          
          setProfile(newProfile);
        } else {
          throw error;
        }
      } else {
        setProfile(data);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user!.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  };

  // Subscription status helpers
  const isTrialing = () => profile?.subscription_status === 'trialing';
  const isActive = () => profile?.subscription_status === 'active';
  const isPastDue = () => profile?.subscription_status === 'past_due';
  const isCanceled = () => profile?.subscription_status === 'canceled';
  const isNotStarted = () => profile?.subscription_status === 'not_started';
  const hasActiveSubscription = () => isTrialing() || isActive();

  const isInGracePeriod = () => {
    if (!isPastDue() || !profile?.payment_issue_since) return false;
    
    const gracePeriodEnd = new Date(profile.payment_issue_since);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 30);
    
    return new Date() < gracePeriodEnd;
  };

  // Plan helpers
  const isPremium = () => profile?.plan === 'premium';
  const isStandard = () => profile?.plan === 'standard';

  // Feature gating for OnPathFlow
  const canCreateClients = () => {
    if (isTrialing()) return true; // Full access during trial
    if (!hasActiveSubscription()) return false;
    return true; // Both plans can create clients
  };

  const getClientLimit = () => {
    if (isTrialing() || isPremium()) return null; // Unlimited
    return 10; // Standard limit
  };

  const canCreatePaths = () => {
    if (isTrialing()) return true;
    if (!hasActiveSubscription()) return false;
    return true;
  };

  const getPathLimit = () => {
    if (isTrialing() || isPremium()) return null; // Unlimited
    return 5; // Standard limit per client
  };

  const canAccessAnalytics = () => {
    if (isTrialing()) return true;
    if (!hasActiveSubscription()) return false;
    return isPremium(); // Premium only
  };

  const canAccessLeaderboards = () => {
    if (isTrialing()) return true;
    if (!hasActiveSubscription()) return false;
    return isPremium(); // Premium only
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    // Status checks
    isTrialing,
    isActive,
    isPastDue,
    isCanceled,
    isNotStarted,
    hasActiveSubscription,
    isInGracePeriod,
    // Plan checks
    isPremium,
    isStandard,
    // Feature gating
    canCreateClients,
    getClientLimit,
    canCreatePaths,
    getPathLimit,
    canAccessAnalytics,
    canAccessLeaderboards
  };
};