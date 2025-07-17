'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    };

    handleLogin();
  }, [supabase, router]);

  return <p className="p-8 text-center">Logging you in...</p>;
}
