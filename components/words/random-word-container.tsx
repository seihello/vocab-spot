"use client";

import { Button } from "@/components/ui/button";
import RandomWord from "@/components/words/random-word";
import { getWordById } from "@/lib/csv/get-word-by-id";
import { Word } from "@/lib/types";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  wordIds: string[];
};

export default function RandomWordContainer({ wordIds }: Props) {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFetchingWord, setIsFetchingWord] = useState(false);

  const onClickPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onClickNext = useCallback(async () => {
    setIsFetchingWord(true);

    const randomId = wordIds[Math.floor(Math.random() * wordIds.length)];
    const word = await getWordById(randomId);
    setWords((prev) => [...prev, word]);
    setCurrentIndex((prev) => prev + 1);

    setIsFetchingWord(false);
  }, [wordIds]);

  useEffect(() => {
    onClickNext();
  }, [onClickNext]);

  if (words.length <= 0) return;

  return (
    <div className="flex flex-col sm:flex-row gap-x-16 items-center justify-center w-full m-auto pt-8 sm:pt-16 pb-4 px-2 sm:px-8 gap-y-2 min-h-screen sm:min-h-auto">
      <Button onClick={onClickPrev} className="order-1 sm:order-0">
        Prev
      </Button>
      <RandomWord word={words[currentIndex]} />
      <Button onClick={onClickNext} className="order-last">
        Next
      </Button>
    </div>
  );
}
