import { supabase } from './supabase';

export const signInAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      data: {
        role: 'admin'
      }
    }
  });

  if (error) throw error;
  return data;
};

export const signInTeam = async (teamId: string, password: string) => {
  const { data, error } = await supabase
    .from('teams')
    .select()
    .eq('team_id', teamId)
    .eq('password', password)
    .single();

  if (error) throw error;
  return data;
};

export const checkAdminAccess = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    throw new Error('Admin access required');
  }
  return session;
};