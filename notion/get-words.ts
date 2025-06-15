import { Client } from "@notionhq/client";

export async function getWords() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const response = await notion.databases.query({ database_id: process.env.NOTION_DATABSE_ID_WORDS });
  console.log(response);
}
