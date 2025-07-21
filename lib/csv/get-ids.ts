import { getWords } from "@/lib/csv/get-words";

export async function getIds() {
  const words = await getWords();
  return words.map((word) => word.id);
}
