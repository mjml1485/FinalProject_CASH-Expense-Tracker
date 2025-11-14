import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Updated signUp to include user profile
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: ''
      }
    }
  });
  
  if (data.user) {
    // Create user profile
    await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id, 
          email: email,
          full_name: fullName 
        }
      ]);
  }
  
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};