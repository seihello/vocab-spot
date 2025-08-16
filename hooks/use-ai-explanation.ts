"use client";

import { useChat } from "@ai-sdk/react";

export function useAiExplanation() {
  const chat = useChat();

  const run = async (word: string) => {
    const prompt = `"${word}"という英語の解説をしてください。単語である場合は、接頭辞や語根、接尾辞などの分析や語源の解説、効果的な意味の覚え方などを解説してください。熟語やイディオムである場合は、どういう成り立ちでこの表現が生まれたのか説明してください。例文は含めてはいけません。回答は日本語で、**などマークダウン形式の記号は絶対に含めてはいけません。`;
    await chat.append({ role: "user", content: prompt });
  };

  return { ...chat, run };
}
