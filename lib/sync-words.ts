"use server";

import { validatePasscode } from "@/lib/validate-passcode";
import createClient from "@/lib/supabase/server";

export async function syncWords(passcode: string) {
  if (!validatePasscode(passcode)) {
    throw new Error("INVALID_PASSCODE");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("notion_english_words").insert({
    names: ["aaa", "bbb"],
    level: 5,
  });
  console.error(error?.message);

  console.log("Synchronized!");

  return;
}
