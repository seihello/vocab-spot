export const dynamic = "force-dynamic";

import { getWords } from "@/lib/csv/get-words";
import { use } from "react";
export default function Page() {
  const words = use(getWords());

  return (
    <div className="w-216 p-4 mx-auto bg-primary-100">
      <div className="space-y-4">
        {words.map((word, index) => (
          <div key={index} className="space-y-2 whitespace-pre-line">
            <p>{word.names}</p>
            <p>{word.meanings}</p>
            <p>{word.sentences}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
