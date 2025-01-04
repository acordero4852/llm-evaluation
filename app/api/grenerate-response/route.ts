import { NextResponse } from 'next/server';
import { createContent } from '@/util/genAIClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    const prompt = `Please answer the following question in Markdown:
  ${text}`;

    const llama = await createContent(
      prompt,
      'groq',
      'llama-3.3-70b-versatile'
    );
    const mixtral = await createContent(prompt, 'groq', 'mixtral-8x7b-32768');
    const gemini = await createContent(prompt, 'google');

    console.log('Generated content:', { llama, mixtral, gemini });

    return NextResponse.json(
      {
        success: true,
        content: {
          llama,
          mixtral,
          gemini,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Error: ${error}` },
      { status: 500 }
    );
  }
}
