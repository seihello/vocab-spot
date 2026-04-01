"use server";

import { adminDb } from "@/lib/firebase/admin-db";
import { WordSummary } from "@/lib/types";

export async function getWordSummaries(): Promise<WordSummary[]> {
  const snapshot = await adminDb.collection("words").select("tags", "level").get();

  const wordSummaries = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      level: data.level ?? 0,
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  });

  console.log("wordSummaries", wordSummaries.slice(0, 10));

  return wordSummaries as WordSummary[];
}
