import { Outseta } from '@outseta/outseta-js';

// Initialize Outseta client
export const outseta = new Outseta({
  domain: import.meta.env.VITE_OUTSETA_DOMAIN || 'onpathflow.outseta.com'
});

// Helper functions for common operations
export const outsetaHelpers = {
  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const user = await outseta.auth.user();
      return !!user;
    } catch {
      return false;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      return await outseta.auth.user();
    } catch {
      return null;
    }
  },

  // Get current subscription
  getCurrentSubscription: async () => {
    try {
      return await outseta.billing.subscription();
    } catch {
      return null;
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await outseta.auth.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
};