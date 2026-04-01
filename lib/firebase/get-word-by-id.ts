"use server";

import { adminDb } from "@/lib/firebase/admin-db";
import { Word } from "@/lib/types";

export async function getWordById(id: string): Promise<Word | null> {
  const doc = await adminDb.collection("words").doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...doc.data() } as Word;
}
