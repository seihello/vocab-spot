"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Word } from "@/lib/types";
import { updateWords } from "@/lib/update-words";
import { validatePasscode } from "@/lib/validate-passcode";
import { useEffect, useState } from "react";

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [isPasscodePassed, setIsPasscodePassed] = useState(false);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    (async () => {
      if (passcode.length === 4) {
        const isPasscodePassed = await validatePasscode(passcode);
        if (isPasscodePassed) {
          setIsPasscodePassed(true);
        }
      }
    })();
  }, [passcode]);

  return (
    <div className="max-w-4xl w-full p-4 mx-auto space-y-4 flex flex-col items-center sm:items-start">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <Input type="password" placeholder="Enter passcode" onChange={(e) => setPasscode(e.target.value)} />
      {isPasscodePassed && (
        <div className="fade-in flex gap-x-2 w-full">
          <Button
            onClick={async () => {
              const words = await updateWords(passcode);
              setWords(words);
            }}
          >
            Sync Words
          </Button>
        </div>
      )}
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
