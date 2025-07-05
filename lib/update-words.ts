"use server";

import { validatePasscode } from "@/lib/validate-passcode";
import { getWords } from "@/lib/notion/get-words";

export async function updateWords(passcode: string) {
  if (!validatePasscode(passcode)) {
    throw new Error("INVALID_PASSCODE");
  }

  const words = await getWords();

  console.log("words", words);

  return words;
}
