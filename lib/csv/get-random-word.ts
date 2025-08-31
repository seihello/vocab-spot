"use server";

import { getWords } from "@/lib/csv/get-words";
import { Word } from "@/lib/types";

type Options = { excludeIds?: string[]; tags?: string[]; levels?: string[] };

export async function getRandomWord(options: Options): Promise<{ word: Word | null; count: number }> {
  const words = await getWords();

  const filteredWords = words.filter((word) => matchCondition(word, options));

  const remainingWords = filteredWords.filter((word) => !(options.excludeIds ?? []).includes(word.id));

  if (remainingWords.length === 0) {
    return { word: null, count: 0 };
  }

  const randomIndex = Math.floor(Math.random() * remainingWords.length);
  return { word: remainingWords[randomIndex], count: filteredWords.length };
}

function matchCondition(word: Word, options: Options): boolean {
  if (options.tags && options.tags.length > 0 && !word.tags.some((tag) => options.tags?.includes(tag))) {
    return false;
  }
  if (options.levels && options.levels.length > 0 && !options.levels.includes(word.level.toString())) {
    return false;
  }

  return true;
}
