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

  console.log("words", words);
  console.log("currentIndex", currentIndex);

  return (
    <div className="space-x-4">
      <Button onClick={onClickPrev}>Prev</Button>
      <RandomWord word={words[currentIndex]} />
      <Button onClick={onClickNext}>Next</Button>
    </div>
  );
}
