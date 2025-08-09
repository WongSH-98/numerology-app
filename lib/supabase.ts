import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://tcrgcmtstwppdqmchkrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcmdjbXRzdHdwcGRxbWNoa3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MjAzMzgsImV4cCI6MjA3MDI5NjMzOH0.10XDKX7s-Jkx3T9E4Q95UJojecuYXEv2_agJqLnAgR4';

console.log('Supabase: Creating client with URL:', supabaseUrl);
console.log('Supabase: Using anon key:', supabaseAnonKey.substring(0, 20) + '...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

console.log('Supabase: Client created successfully');

// Authentication functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, fullName?: string) => {
    console.log('Auth: Attempting signup for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    console.log('Auth: Signup result:', error ? 'error' : 'success');
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    console.log('Auth: Attempting signin for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Auth: Signin result:', error ? 'error' : 'success');
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    console.log('Auth: Attempting signout');
    const { error } = await supabase.auth.signOut();
    console.log('Auth: Signout result:', error ? 'error' : 'success');
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    console.log('Auth: Getting current user');
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('Auth: Current user result:', user ? 'exists' : 'none', error ? 'error' : '');
    return { user, error };
  },

  // Get current session
  getCurrentSession: async () => {
    console.log('Auth: Getting current session');
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log('Auth: Current session result:', session ? 'exists' : 'none', error ? 'error' : '');
    return { session, error };
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'numerology-app://reset-password',
    });
    return { data, error };
  },

  // Update password
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    return { data, error };
  },
};

// Profile functions
export const profiles = {
  // Get user profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },
};

// Numerology functions
export const numerology = {
  // Save numerology calculation
  saveCalculation: async (calculationData: any) => {
    const { data, error } = await supabase
      .from('numerology_calculations')
      .insert(calculationData)
      .select()
      .single();
    return { data, error };
  },

  // Get user's numerology calculations
  getUserCalculations: async (userId: string) => {
    const { data, error } = await supabase
      .from('numerology_calculations')
      .select('*')
      .eq('user_id', userId)
      .order('calculated_at', { ascending: false });
    return { data, error };
  },

  // Save compatibility match
  saveCompatibilityMatch: async (matchData: any) => {
    const { data, error } = await supabase
      .from('compatibility_matches')
      .insert(matchData)
      .select()
      .single();
    return { data, error };
  },

  // Get user's compatibility matches
  getUserCompatibilityMatches: async (userId: string) => {
    const { data, error } = await supabase
      .from('compatibility_matches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};
