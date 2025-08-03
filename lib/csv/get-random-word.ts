"use server";

import { getWords } from "@/lib/csv/get-words";
import { Word } from "@/lib/types";

type Options = { excludeIds?: string[]; tags?: string[]; levels?: number[] };

export async function getRandomWord(options: Options): Promise<Word | null> {
  const words = await getWords();

  const filteredWords = words.filter((word) => matchCondition(word, options));

  if (filteredWords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
}

function matchCondition(word: Word, options: Options): boolean {
  if ((options.excludeIds ?? []).includes(word.id)) {
    return false;
  }
  if (options.tags && options.tags.length > 0 && !word.tags.some((tag) => options.tags?.includes(tag))) {
    return false;
  }
  if (options.levels && options.levels.length > 0 && !options.levels.includes(word.level)) {
    return false;
  }

  return true;
}
