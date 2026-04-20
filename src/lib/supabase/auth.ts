import { supabase } from "./client";

export const supabaseAuth = {
  signIn: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp: async (email: string, password: string) => {
    return supabase.auth.signUp({
      email,
      password,
    });
  },

  signOut: async () => {
    return supabase.auth.signOut();
  },

  getSession: async () => {
    return supabase.auth.getSession();
  },

  getUser: async () => {
    return supabase.auth.getUser();
  },
};