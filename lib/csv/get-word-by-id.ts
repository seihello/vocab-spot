"use server";

import { getWords } from "@/lib/csv/get-words";
import { Word } from "@/lib/types";

export async function getWordById(id: string): Promise<Word> {
  const words = await getWords();
  const index = Number(id);
  if (words.length <= index) {
    throw new Error("INVALID_ID");
  }

  return words[index];
}
