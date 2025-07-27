import { getWords } from "@/lib/csv/get-words";

export async function getTags() {
  const words = await getWords();
  const tags = new Set<string>();
  words.forEach((word) => word.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags);
}
