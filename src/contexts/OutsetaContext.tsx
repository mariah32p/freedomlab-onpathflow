import React, { createContext, useContext, useEffect, useState } from 'react';
import { outseta, outsetaHelpers } from '../lib/outseta';

interface User {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface Subscription {
  uid: string;
  planUid: string;
  planName: string;
  status: string;
  trialEndDate?: string;
  renewalDate?: string;
}

interface OutsetaContextType {
  user: User | null;
  subscription: Subscription | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  openSignUp: (planUid?: string) => void;
  openSignIn: () => void;
  openBillingPortal: () => void;
  isPremium: () => boolean;
  isTrialing: () => boolean;
  hasActiveSubscription: () => boolean;
}

const OutsetaContext = createContext<OutsetaContextType | undefined>(undefined);

export const OutsetaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeOutseta();
  }, []);

  const initializeOutseta = async () => {
    try {
      console.log('🔄 Initializing Outseta...');
      
      // Check if user is authenticated
      const currentUser = await outsetaHelpers.getCurrentUser();
      if (currentUser) {
        console.log('✅ Found authenticated user:', currentUser.email);
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName
        });

        // Get subscription
        const currentSubscription = await outsetaHelpers.getCurrentSubscription();
        if (currentSubscription) {
          console.log('✅ Found subscription:', currentSubscription.status);
          setSubscription({
            uid: currentSubscription.uid,
            planUid: currentSubscription.plan?.uid,
            planName: currentSubscription.plan?.name,
            status: currentSubscription.status,
            trialEndDate: currentSubscription.trialEndDate,
            renewalDate: currentSubscription.renewalDate
          });
        }
      } else {
        console.log('❌ No authenticated user found');
      }
    } catch (error) {
      console.error('❌ Error initializing Outseta:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      console.log('📝 Signing up user:', email);
      
      const newUser = await outseta.auth.register({
        email,
        password,
        firstName,
        lastName
      });

      console.log('✅ User registered successfully');
      await initializeOutseta(); // Refresh user data
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔑 Signing in user:', email);
      
      await outseta.auth.login({
        username: email,
        password
      });

      console.log('✅ User signed in successfully');
      await initializeOutseta(); // Refresh user data
    } catch (error: any) {
      console.error('❌ Signin error:', error);
      throw new Error(error.message || 'Invalid email or password');
    }
  };

  const signOut = async () => {
    try {
      console.log('👋 Signing out user');
      await outsetaHelpers.signOut();
      setUser(null);
      setSubscription(null);
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  const openSignUp = (planUid?: string) => {
    console.log('🚀 Opening signup modal for plan:', planUid);
    outseta.auth.open({
      tab: 'register',
      planUid
    });
  };

  const openSignIn = () => {
    console.log('🔑 Opening signin modal');
    outseta.auth.open({
      tab: 'login'
    });
  };

  const openBillingPortal = () => {
    console.log('💳 Opening billing portal');
    outseta.billing.open();
  };

  // Helper functions
  const isPremium = () => subscription?.planName?.toLowerCase().includes('premium') || false;
  
  const isTrialing = () => subscription?.status === 'Trialing';
  
  const hasActiveSubscription = () => {
    if (!subscription) return false;
    return ['Active', 'Trialing'].includes(subscription.status);
  };

  const value = {
    user,
    subscription,
    loading,
    signUp,
    signIn,
    signOut,
    openSignUp,
    openSignIn,
    openBillingPortal,
    isPremium,
    isTrialing,
    hasActiveSubscription
  };

  return (
    <OutsetaContext.Provider value={value}>
      {children}
    </OutsetaContext.Provider>
  );
};

export const useOutseta = () => {
  const context = useContext(OutsetaContext);
  if (context === undefined) {
    throw new Error('useOutseta must be used within an OutsetaProvider');
  }
  return context;
};