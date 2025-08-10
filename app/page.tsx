export const dynamic = "force-dynamic";

import RandomWordContainer from "@/components/random-word-container";
import { RandomWordProvider } from "@/jotai/random-word/provider";
import { getTags } from "@/lib/csv/get-tags";
import { use } from "react";
export default function Page() {
  const tags = use(getTags());

  return (
    <RandomWordProvider>
      <RandomWordContainer tags={tags} />
    </RandomWordProvider>
  );
}
