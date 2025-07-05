"use server";

import { validatePasscode } from "@/lib/validate-passcode";
import createClient from "@/lib/supabase/server";
import { getArrayedWords } from "@/lib/notion/get-arrayed-words";

export async function syncWords(passcode: string) {
  if (!validatePasscode(passcode)) {
    throw new Error("INVALID_PASSCODE");
  }

  const words = await getArrayedWords();

  const supabase = await createClient();

  const { error } = await supabase.from("notion_english_words").insert(words);
  console.error(error?.message);

  console.log("Synchronized!");

  return;
}
