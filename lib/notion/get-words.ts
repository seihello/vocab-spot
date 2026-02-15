import { Client, PageObjectResponse } from "@notionhq/client";

export type Word = {
  id: string;
  names: string;
  meanings: string | null;
  sentences: string | null;
  collocations: string | null;
  synonyms: string | null;
  pronunciations: string | null;
  tags: string | null;
  level: number | null;
};

export async function getWords() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  let hasMoreWords = true;
  let nextCursor: string | null = null;

  const words: Word[] = [];

  while (hasMoreWords) {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_WORDS ?? "",
      start_cursor: nextCursor ?? undefined,
    });
    hasMoreWords = response.has_more;
    nextCursor = response.next_cursor;
    console.log("nextCursor", nextCursor);

    const results = response.results as PageObjectResponse[];

    results.forEach((result) => {
      const names = result.properties.Names;
      const meanings = result.properties.Meanings;
      const sentences = result.properties.Sentences;
      const collocations = result.properties.Collocations;
      const tags = result.properties.Tags;
      const synonyms = result.properties.Synonyms;
      const pronunciations = result.properties.Pronunciations;
      const level = result.properties.Level;
      if (
        names.type === "rich_text" &&
        meanings.type === "rich_text" &&
        sentences.type === "rich_text" &&
        collocations.type === "rich_text" &&
        tags.type === "multi_select" &&
        synonyms.type === "rich_text" &&
        pronunciations.type === "rich_text" &&
        level.type === "number" &&
        names.rich_text.length > 0
      ) {
        const word = {
          id: result.id,
          names: names.rich_text
            .map((richTextItem) => richTextItem.plain_text)
            .filter((richTextItem) => richTextItem !== "")
            .join("\n"),
          meanings: meanings.rich_text
            .map((richTextItem) => richTextItem.plain_text)
            .filter((richTextItem) => richTextItem !== "")
            .join("\n"),
          sentences: sentences.rich_text.length > 0 ? sentences.rich_text[0].plain_text : "",
          collocations: collocations.rich_text
            .map((richTextItem) => richTextItem.plain_text)
            .filter((richTextItem) => richTextItem !== "")
            .join("\n"),
          synonyms: synonyms.rich_text
            .map((richTextItem) => richTextItem.plain_text)
            .filter((richTextItem) => richTextItem !== "")
            .join("\n"),
          pronunciations: pronunciations.rich_text
            .map((richTextItem) => richTextItem.plain_text)
            .filter((richTextItem) => richTextItem !== "")
            .join("\n"),
          tags: tags.multi_select.map((tag) => tag.name).join(", "),
          level: level.number,
        };

        if (word.names) {
          words.push(word);
        }
      }
    });
  }

  return words;
}
