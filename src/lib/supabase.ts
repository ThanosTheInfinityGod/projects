import { createServerClient, createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    // Lazy import to avoid breaking client-side
    const { cookies } = require('next/headers');
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookies().get(name)?.value;
          },
          set() {},    // noop for safety
          remove() {}, // noop for safety
        },
      }
    );
  }

  // Browser-safe client
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
