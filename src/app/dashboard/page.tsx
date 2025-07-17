'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else {
        router.replace('/login');
      }

      setLoading(false);
    };

    getUser();
  }, [supabase, router]);

  const handleGenerate = async () => {
    setGenerating(true);
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const generatedCode = data.result || 'No result returned.';
setResult(generatedCode);

// Save to Supabase
const { error } = await supabase.from('projects').insert([
  {
    user_id: user.id,
    prompt,
    code: generatedCode,
  }
]);

if (error) {
  console.error('❌ Failed to save project to Supabase:', error.message);
}

    } catch (e) {
      setResult('❌ Failed to fetch result.');
    }

    setGenerating(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (loading) {
    return <p className="p-10 text-center">Checking authentication...</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.email}</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Describe your app (e.g. 'Build a blog with login and markdown')"
        className="w-full p-4 rounded border mb-4 resize-none"
      />

      <button
        onClick={handleGenerate}
        disabled={generating || !prompt}
        className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition disabled:opacity-50"
      >
        {generating ? 'Generating...' : 'Generate App'}
      </button>

      {result && (
        <pre className="bg-gray-900 text-green-400 text-left p-4 mt-6 rounded w-full overflow-auto">
          {result}
        </pre>
      )}
<button
  onClick={() => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-app.txt';
    a.click();
    URL.revokeObjectURL(url);
  }}
  className="mt-4 text-blue-600 underline"
>
  Download Code
</button>

      <button onClick={handleLogout} className="mt-8 text-red-500 underline">
        Logout
      </button>
    </main>
  );
}
