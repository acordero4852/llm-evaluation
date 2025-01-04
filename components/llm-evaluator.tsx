'use client';

import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { generateResponse } from '@/actions/generateResponse';

interface IContent {
  llama: string | null;
  mixtral: string | null;
  gemini: string | null;
}

export function LLMEvaluator() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<IContent>({
    llama: null,
    mixtral: null,
    gemini: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const result = await generateResponse(input);

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate image');
      }

      if (result.content) {
        setOutput(result.content);
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-slate-100">
      <main className="max-w-[1500px] mx-auto p-4">
        <header className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <label className="text-lg font-semibold">LLM Evaluator</label>
            <input
              placeholder="Enter your prompt here..."
              className="p-2 bg-white flex-grow border border-black rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(
                    e as unknown as React.FormEvent<HTMLFormElement>
                  );
                }
              }}
            />
          </form>
        </header>
        <section className="mt-4 flex space-x-4 h-full">
          <div className="flex flex-col w-full h-full">
            <label className="text-lg font-semibold mb-2">
              Meta Llama 3.3-70B Versatile
            </label>
            <div className="flex-grow p-2 bg-white border border-black rounded overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full w-full">
                  <Spinner />
                </div>
              ) : (
                <ReactMarkdown>{output.llama}</ReactMarkdown>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-full">
            <label className="text-lg font-semibold mb-2">
              Mistral Mixtral 8x7B-32768
            </label>
            <div className="flex-grow p-2 bg-white border border-black rounded overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full w-full">
                  <Spinner />
                </div>
              ) : (
                <ReactMarkdown>{output.mixtral}</ReactMarkdown>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-full">
            <label className="text-lg font-semibold mb-2">
              Google Gemini 1.5 Flash-8B
            </label>
            <div className="flex-grow p-2 bg-white border border-black rounded overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full w-full">
                  <Spinner />
                </div>
              ) : (
                <ReactMarkdown>{output.gemini}</ReactMarkdown>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Spinner() {
  return (
    <div className="loading-container flex items-center justify-center h-full w-full">
      <div className="loading-dot" />
    </div>
  );
}
