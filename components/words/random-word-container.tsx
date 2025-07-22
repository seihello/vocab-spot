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
  const [isDetailHidden, setIsDetailHidden] = useState(true);

  const onClickShowAnswer = () => {
    setIsDetailHidden(false);
  };

  const onClickPrev = () => {
    setIsDetailHidden(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onClickNext = useCallback(async () => {
    if (isFetchingWord) return;
    if (currentIndex + 1 < words.length) {
      setIsDetailHidden(true);
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setIsFetchingWord(true);

    const randomId = wordIds[Math.floor(Math.random() * wordIds.length)];
    const word = await getWordById(randomId);
    setWords((prev) => [...prev, word]);
    setIsDetailHidden(true);
    setCurrentIndex((prev) => prev + 1);

    setIsFetchingWord(false);
  }, [currentIndex, isFetchingWord, wordIds, words.length]);

  useEffect(() => {
    if (words.length === 0) {
      onClickNext();
    }
  }, [words, onClickNext]);

  if (words.length <= 0) return;

  return (
    <div className="flex flex-col items-end justify-center w-full max-w-256 mx-auto pt-8 pb-4 px-2 sm:px-8 gap-y-2 min-h-dvh sm:min-h-auto">
      <RandomWord word={words[currentIndex]} isDetailHidden={isDetailHidden} />
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:-order-1">
        <Button variant="outline" onClick={onClickShowAnswer} disabled={!isDetailHidden}>
          Show Answer
        </Button>
        <Button onClick={onClickPrev} disabled={currentIndex === 0}>
          Prev
        </Button>
        <Button onClick={onClickNext} disabled={isFetchingWord}>
          Next
        </Button>
      </div>
    </div>
  );
}
