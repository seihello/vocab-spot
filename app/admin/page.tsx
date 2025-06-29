"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { syncWords } from "@/lib/sync-words";
import { validatePasscode } from "@/lib/validate-passcode";
import { useEffect, useState } from "react";

export default function Home() {
  const [passcode, setPasscode] = useState("");
  const [isPasscodePassed, setIsPasscodePassed] = useState(false);

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
              await syncWords(passcode);
            }}
          >
            Sync Words
          </Button>
        </div>
      )}
    </div>
  );
}
