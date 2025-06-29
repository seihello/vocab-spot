"use server";

import { validatePasscode } from "@/lib/validate-passcode";

export async function syncWords(passcode: string) {
  if (!validatePasscode(passcode)) {
    throw new Error("INVALID_PASSCODE");
  }
  console.log("Synchronized!");
  return;
}
