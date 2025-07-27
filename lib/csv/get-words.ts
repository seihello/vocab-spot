"use server";

import { Word } from "@/lib/types";
import csvParser from "csv-parser";
import * as fs from "fs";
import path from "path";

export async function getWords(): Promise<Word[]> {
  return new Promise((resolve, reject) => {
    const words: Word[] = [];

    fs.createReadStream(path.join(process.cwd(), "public/words.csv"))
      .pipe(
        csvParser({
          mapHeaders: ({ header }) =>
            header
              .trim()
              .replace(/\uFEFF/g, "")
              .replace(/^['"]|['"]$/g, ""),
        })
      )
      .on("data", (data) => {
        const tagsArray = data.Tags
          ? data.Tags.split(", ")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : [];

        const word: Word = {
          id: words.length.toString(),
          names: data.Names ?? "",
          meanings: data.Meanings ?? "",
          sentences: data.Sentences ?? "",
          collocations: data.Collocations ?? "",
          pronunciations: data.Pronunciation ?? "",
          level: Number(data.Level),
          tags: tagsArray,
        };
        words.push(word);
      })
      .on("end", () => resolve(words))
      .on("error", (err) => reject(err));
  });
}
