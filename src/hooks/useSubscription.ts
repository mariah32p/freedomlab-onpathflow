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
      console.log('🔍 Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.log('❌ Profile fetch error:', error.code, error.message);
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('📝 Creating new profile for user:', user.id);
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
            console.error('❌ Error creating profile:', createError);
            throw createError;
          }
          
          console.log('✅ Created new profile:', newProfile);
          setProfile(newProfile);
        } else {
          throw error;
        }
      } else {
        console.log('✅ Found existing profile:', data);
        setProfile(data);
      }

    } catch (err: any) {
      console.error('❌ Profile fetch/create error:', err);
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
  const hasActiveSubscription = () => {
    const status = profile?.subscription_status;
    return status === 'trialing' || status === 'active';
  };

  const isPremium = () => profile?.plan === 'premium';

  // Feature gating for OnPathFlow
  const getClientLimit = () => {
    if (isPremium()) return null; // Unlimited
    return 10; // Standard limit
  };

  const getPathLimit = () => {
    if (isPremium()) return null; // Unlimited
    return 5; // Standard limit per client
  };

  // Subscription status helpers
  const isTrialing = () => profile?.subscription_status === 'trialing';
  const isActive = () => profile?.subscription_status === 'active';
  const isPastDue = () => profile?.subscription_status === 'past_due';
  const isCanceled = () => profile?.subscription_status === 'canceled';
  const isNotStarted = () => profile?.subscription_status === 'not_started';
  
  const isInGracePeriod = () => {
    if (!isPastDue() || !profile?.payment_issue_since) return false;
    const issueDate = new Date(profile.payment_issue_since);
    const now = new Date();
    const daysSinceIssue = (now.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceIssue <= 30;
  };
  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    hasActiveSubscription,
    isPremium,
    getClientLimit,
    getPathLimit,
    isTrialing,
    isActive,
    isPastDue,
    isCanceled,
    isNotStarted,
    isInGracePeriod
  };
};