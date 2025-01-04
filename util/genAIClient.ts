import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY as string);

type ModelType = 'google' | 'groq';
type GroqModel = 'llama-3.3-70b-versatile' | 'mixtral-8x7b-32768';

export async function createContent(
  content: string,
  provider: ModelType,
  model?: GroqModel
) {
  try {
    if (provider === 'google') {
      const googleModel = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const result = await googleModel.generateContent(content);
      return result.response.text();
    } else if (provider === 'groq' && model) {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: content,
          },
        ],
        model: model,
      });

      return response.choices[0].message.content;
    } else {
      throw new Error('Invalid provider or model');
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
