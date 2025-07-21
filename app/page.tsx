export const dynamic = "force-dynamic";

import { getIds } from "@/lib/csv/get-ids";
import { use } from "react";
export default function Page() {
  const ids = use(getIds());

  return (
    <div className="w-216 p-4 mx-auto bg-primary-100">
      <div className="space-y-4">
        <div className="space-y-2 whitespace-pre-line">
          <p>{ids.join(", ")}</p>
          {/* <p>{word.names}</p>
          <p>{word.meanings}</p>
          <p>{word.sentences}</p> */}
        </div>
      </div>
    </div>
  );
}
