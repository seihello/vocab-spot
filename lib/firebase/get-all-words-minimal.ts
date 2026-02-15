"use server";

import { firestore } from "@/lib/firebase/server";
import { getWords } from "@/lib/notion/get-words";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export async function getAllWordsMinimal() {
  const snapshot = await firestore.collection("words").select("names").get();

  const hoge = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("hoge.length", hoge.length);
  console.log("hoge", hoge);
}
