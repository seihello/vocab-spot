export const dynamic = "force-dynamic";

import RandomWordContainer from "@/components/random-word-container";
import { getWordSummaries } from "@/lib/firebase/get-word-summaries";
import { RandomWordProvider } from "@/lib/jotai/random-word/provider";
import { use } from "react";
export default function Page() {
  const wordSummaries = use(getWordSummaries());

  return (
    <RandomWordProvider>
      <RandomWordContainer wordSummaries={wordSummaries} />
    </RandomWordProvider>
  );
}
