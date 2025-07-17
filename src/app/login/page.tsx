'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback', // ✅ Use your deployed domain in prod
      },
    });

    if (!error) {
      setSent(true);
    } else {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Login to CodeSage AI</h1>
      {sent ? (
        <p className="text-green-500">Check your email for the magic link!</p>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
          >
            Send Magic Link
          </button>
        </form>
      )}
    </main>
  );
}
