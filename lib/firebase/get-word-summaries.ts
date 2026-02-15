"use server";

import { adminDb } from "@/lib/firebase/admin-db";

export async function getWordSummaries() {
  const snapshot = await adminDb.collection("words").select("names").get();

  const wordSummaries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("wordSummaries", wordSummaries);
}
