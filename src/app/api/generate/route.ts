import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ result: 'Prompt is missing.' }, { status: 400 });
  }

  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || '❌ No result from Gemini.';
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ result: '❌ Gemini API call failed.' }, { status: 500 });
  }
}
