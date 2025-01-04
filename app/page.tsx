'use server';

import { LLMEvaluator } from '@/components/llm-evaluator';

export default async function Home() {
  return <LLMEvaluator />;
}
