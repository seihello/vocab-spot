"use server";

import { db } from "@/lib/firebase/db";
import { getWords } from "@/lib/notion/get-words";
import { doc, setDoc } from "firebase/firestore";

export async function syncAllWords() {
  try {
    // const docRef = await addDoc(collection(firestore, "words"), {
    //   title: "test title 1",
    //   content: "test content 1",
    //   createdAt: serverTimestamp(), // サーバー側の日時を使用
    // });
    // console.log("追加されたドキュメントID:", docRef.id);

    const words = await getWords();
    let count = 0;

    for (const word of words) {
      console.log("count", count);
      count += 1;

      const docRef = doc(db, "words", word.id);
      await setDoc(docRef, {
        names: word.names,
        meanings: word.meanings,
        sentences: word.sentences,
        collocations: word.collocations,
        synonyms: word.synonyms,
        pronunciations: word.pronunciations,
        tags: word.tags,
        level: word.level,
      });
    }
  } catch (e) {
    console.error("エラーが発生しました: ", e);
  }
}
