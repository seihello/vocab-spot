import { Word } from "@/lib/types";
import { Client, PageObjectResponse } from "@notionhq/client";

export async function getWords() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID_WORDS ?? "",
  });

  const results = response.results as PageObjectResponse[];

  const words: Word[] = [];

  results.forEach((result) => {
    const names = result.properties.Names;
    const meanings = result.properties.Meanings;
    const sentences = result.properties.Sentences;
    const collocations = result.properties.Collocations;
    const tags = result.properties.Tags;
    const pronunciations = result.properties.Pronunciations;
    const level = result.properties.Level;
    if (
      names.type === "rich_text" &&
      meanings.type === "rich_text" &&
      sentences.type === "rich_text" &&
      collocations.type === "rich_text" &&
      tags.type === "multi_select" &&
      pronunciations.type === "rich_text" &&
      level.type === "number" &&
      names.rich_text.length > 0
    ) {
      const word = {
        id: result.id,
        names: names.rich_text.flatMap((name) => name.plain_text.split("\n")).filter((name) => name !== ""),
        meanings: meanings.rich_text
          .flatMap((meaning) => meaning.plain_text.split("\n"))
          .filter((meaning) => meaning !== ""),
        sentences: sentences.rich_text
          .flatMap((sentence) => sentence.plain_text.split("\n"))
          .filter((sentence) => sentence !== ""),
        collocations: collocations.rich_text
          .flatMap((collocation) => collocation.plain_text.split("\n"))
          .filter((collocation) => collocation !== ""),
        pronunciations: pronunciations.rich_text
          .flatMap((pronunciation) => pronunciation.plain_text.split("\n"))
          .filter((pronunciation) => pronunciation !== ""),
        level: level.number,
        tags: tags.multi_select.map((tag) => tag.name),
      };
      words.push(word);
    }
  });
  console.log(words);
  return words;
}
