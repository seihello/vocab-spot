import { getWords } from "@/lib/csv/get-words";

export async function getRandomWord(excludeIds: string[] = []) {
  const words = await getWords();
  const filteredWords = words.filter((word) => !excludeIds.includes(word.id));

  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
}
