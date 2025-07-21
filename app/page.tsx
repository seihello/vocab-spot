export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import RandomWordContainer from "@/components/words/random-word-container";
import { getIds } from "@/lib/csv/get-ids";
import { use } from "react";
export default function Page() {
  const wordIds = use(getIds());

  return <RandomWordContainer wordIds={wordIds} />;
}
