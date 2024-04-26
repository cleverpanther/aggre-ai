import { SUPERBASE_URL } from '@/config/api';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = SUPERBASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the Supabase URL and Anon Key are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
