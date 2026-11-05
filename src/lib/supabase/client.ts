import { createBrowserClient } from '@supabase/ssr';

export const isSupabaseConfigured = () => {
  return (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'string' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.trim() !== '' &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'string' &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() !== '' &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your-anon-key')
  );
};

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || !isSupabaseConfigured()) {
    return null;
  }

  return createBrowserClient(url, anonKey);
};
