import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function supabaseAuth(token) {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: { Authorization: `Bearer ${token}` }
    }
  });
}