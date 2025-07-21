"use server";

import { WORDS_FILE_PATH } from "@/constants";
import csvParser from "csv-parser";
import * as fs from "fs";
import path from "path";

type Row = {
  names: string;
  meanings: string;
  sentences: string;
  collocations: string;
  pronunciation: string;
  level: number;
  tags: string[]; // 配列にする
};

export async function getWords(): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    const results: Row[] = [];

    fs.createReadStream(path.join(process.cwd(), WORDS_FILE_PATH))
      .pipe(csvParser())
      .on("data", (data) => {
        const tagsArray = data.Tags
          ? data.Tags.split("、")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : [];

        const row: Row = {
          names: data.Names ?? "",
          meanings: data.Meanings ?? "",
          sentences: data.Sentences ?? "",
          collocations: data.Collocations ?? "",
          pronunciation: data.Pronunciation ?? "",
          level: Number(data.Level),
          tags: tagsArray,
        };
        results.push(row);
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}
