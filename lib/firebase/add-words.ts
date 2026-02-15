"use server";

import { firestore } from "@/lib/firebase/get-client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function addWords() {
  try {
    const docRef = await addDoc(collection(firestore, "words"), {
      title: "test title 1",
      content: "test content 1",
      createdAt: serverTimestamp(), // サーバー側の日時を使用
    });
    console.log("追加されたドキュメントID:", docRef.id);
  } catch (e) {
    console.error("エラーが発生しました: ", e);
  }
}
