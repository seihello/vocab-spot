"use client";

import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import RandomWord from "@/components/words/random-word";
import { getRandomWord } from "@/lib/csv/get-random-word";
import { Word } from "@/lib/types";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  tags: string[];
};

export default function RandomWordContainer({ tags }: Props) {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFetchingWord, setIsFetchingWord] = useState(false);
  const [isDetailHidden, setIsDetailHidden] = useState(true);
  const [isFinalWord, setIsFinalWord] = useState(false);

  const onClickShowAnswer = () => {
    setIsDetailHidden(false);
  };

  const onClickPrev = () => {
    setIsDetailHidden(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onClickNext = useCallback(async () => {
    console.log("onClickNext");

    if (isFetchingWord) return;
    if (currentIndex + 1 < words.length) {
      setIsDetailHidden(true);
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setIsFetchingWord(true);

    const word = await getRandomWord({ tags: selectedTags, excludeIds: words.map((word) => word.id) });

    if (word) {
      setWords((prev) => [...prev, word]);
      setIsDetailHidden(true);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinalWord(true);
    }

    setIsFetchingWord(false);
  }, [currentIndex, isFetchingWord, selectedTags, words]);

  useEffect(() => {
    if (words.length === 0) {
      onClickNext();
    }
  }, [words, onClickNext]);

  const onUpdateSelectedTags = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
    setCurrentIndex(-1);
    setIsFinalWord(false);
    setIsDetailHidden(false);
    setWords([]);
  };

  if (words.length <= 0 || currentIndex < 0) return;

  return (
    <div className="flex flex-col items-end justify-center w-full max-w-256 mx-auto pt-8 pb-4 px-2 sm:px-8 gap-y-2 min-h-dvh sm:min-h-auto">
      <RandomWord word={words[currentIndex]} isDetailHidden={isDetailHidden} />
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:-order-1 items-end sm:items-center">
        <Menu tagOptions={tags} defaultSelectedTags={selectedTags} onUpdate={onUpdateSelectedTags} />
        <Button variant="outline" onClick={onClickShowAnswer} disabled={!isDetailHidden}>
          Show Answer
        </Button>
        <Button onClick={onClickPrev} disabled={currentIndex === 0}>
          Prev
        </Button>
        <Button onClick={onClickNext} disabled={isFetchingWord || (currentIndex === words.length - 1 && isFinalWord)}>
          Next
        </Button>
      </div>
    </div>
  );
}
