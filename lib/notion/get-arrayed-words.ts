import { ArrayedWord } from "@/lib/types";
import { Client, PageObjectResponse } from "@notionhq/client";

export async function getArrayedWords() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  let hasMore = true;
  const words: ArrayedWord[] = [];
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_WORDS ?? "",
      start_cursor: startCursor ?? undefined,
    });

    const results = response.results as PageObjectResponse[];

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
        const splitNames = names.rich_text.flatMap((name) => name.plain_text.split("\n")).filter((name) => name !== "");
        const splitMeanings = meanings.rich_text
          .flatMap((meaning) => meaning.plain_text.split("\n"))
          .filter((meaning) => meaning !== "");
        const splitSentences = sentences.rich_text
          .flatMap((sentence) => sentence.plain_text.split("\n"))
          .filter((sentence) => sentence !== "");
        const splitCollocations = collocations.rich_text
          .flatMap((collocation) => collocation.plain_text.split("\n"))
          .filter((collocation) => collocation !== "");
        const splitPronunciations = pronunciations.rich_text
          .flatMap((pronunciation) => pronunciation.plain_text.split("\n"))
          .filter((pronunciation) => pronunciation !== "");
        const splitTags = tags.multi_select.map((tag) => tag.name);

        const word = {
          id: result.id,
          names: splitNames,
          meanings: splitMeanings.length > 0 ? splitMeanings : null,
          sentences: splitSentences.length > 0 ? splitSentences : null,
          collocations: splitCollocations.length > 0 ? splitCollocations : null,
          pronunciations: splitPronunciations.length > 0 ? splitPronunciations : null,
          tags: splitTags.length > 0 ? splitTags : null,
          level: level.number,
        };
        words.push(word);
      }
    });

    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }
  // console.log(words);
  return words;
}
