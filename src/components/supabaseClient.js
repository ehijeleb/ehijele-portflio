import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL and anon key are not set — Supabase features will be unavailable.");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
