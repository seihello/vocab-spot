export const dynamic = "force-dynamic";

import RandomWordContainer from "@/components/words/random-word-container";
import { getTags } from "@/lib/csv/get-tags";
import { use } from "react";
export default function Page() {
  const tags = use(getTags());

  return <RandomWordContainer tags={tags} />;
}
