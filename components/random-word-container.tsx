"use client";

import TagFilterDialog from "@/components/tag-filter-dialog";
import { Button } from "@/components/ui/button";
import RandomWord from "@/components/random-word";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { getRandomWord } from "@/lib/csv/get-random-word";
import { Word } from "@/lib/types";
import React, { useCallback, useEffect, useState } from "react";
import LevelFilterDialog from "@/components/level-filter-dialog";
import SettingsDialog from "@/components/settings-dialog";
import { useAtom } from "jotai";
import { selectedLevelsState, selectedTagsState } from "@/lib/jotai/random-word/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useAiExplanation } from "@/hooks/use-ai-explanation";

type Props = {
  tags: string[];
};

export default function RandomWordContainer({ tags }: Props) {
  const { isPwa } = useDisplayMode();

  const [words, setWords] = useState<Word[]>([]);
  const [selectedTags] = useAtom(selectedTagsState);
  const [selectedLevels] = useAtom(selectedLevelsState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFetchingWord, setIsFetchingWord] = useState(false);
  const [isDetailHidden, setIsDetailHidden] = useState(true);
  const [isFinalWord, setIsFinalWord] = useState(false);

  const { isLoading: isLoadingLocalStorage } = useLocalStorage();

  const { messages, status, setMessages, run: generateExplanation } = useAiExplanation();

  const onClickShowAnswer = () => {
    setIsDetailHidden(false);
  };

  const onClickPrev = () => {
    setIsDetailHidden(true);
    setMessages([]);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onClickNext = useCallback(async () => {
    if (isFetchingWord) return;
    if (currentIndex + 1 < words.length) {
      setIsDetailHidden(true);
      setMessages([]);
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setIsFetchingWord(true);

    const word = await getRandomWord({
      tags: selectedTags,
      excludeIds: words.map((word) => word.id),
      levels: selectedLevels,
    });

    if (word) {
      setWords((prev) => [...prev, word]);
      setIsDetailHidden(true);
      setMessages([]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinalWord(true);
    }

    setIsFetchingWord(false);
  }, [currentIndex, isFetchingWord, selectedTags, selectedLevels, words, setMessages]);

  useEffect(() => {
    if (words.length === 0 && !isFinalWord && !isLoadingLocalStorage) {
      onClickNext();
    }
  }, [words, isFinalWord, isLoadingLocalStorage, onClickNext]);

  useEffect(() => {
    setCurrentIndex(-1);
    setIsFinalWord(false);
    setIsDetailHidden(false);
    setMessages([]);
    setWords([]);
  }, [selectedTags, selectedLevels, setMessages]);

  const isReady = words.length > 0 && currentIndex >= 0;

  const answers = messages.filter((message) => message.role === "assistant");

  return (
    <div className="max-h-screen flex flex-col items-end justify-center w-full max-w-256 mx-auto pt-2 sm:px-8 min-h-dvh sm:min-h-auto">
      <div className="flex items-center justify-evenly gap-x-2 sm:order-1 px-2">
        <TagFilterDialog tagOptions={tags} />
        <LevelFilterDialog />
        <SettingsDialog />
      </div>
      <div className="w-full grow overflow-y-scroll px-2 space-y-2 sm:order-3">
        {isReady && <RandomWord word={words[currentIndex]} isDetailHidden={isDetailHidden} />}
        {answers.length > 0 && (
          <div className="w-full bg-green-50 p-2 sm:p-4 rounded-2xl text-sm sm:text-base">
            {answers.map((answer) => (
              <div key={answer.id} className="whitespace-pre-wrap">
                {answer.parts
                  .filter((part) => part.type === "text")
                  .map((part, index) => (
                    <span
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: part.text.replaceAll("\n", "<br />").replaceAll("**", ""),
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`w-full px-2 bg-white sm:w-auto flex flex-col sm:flex-row gap-2 sm:order-2 items-end sm:items-center shadow-[0px_0px_16px_6px_#EEEEEE] sm:shadow-none pt-4 sm:pt-2 ${
          isPwa ? "pb-16" : "pb-4 sm:pb-2"
        }`}
      >
        <Button variant="green" onClick={onClickShowAnswer} disabled={!isReady || !isDetailHidden}>
          Show Answer
        </Button>
        <Button
          variant="outline"
          onClick={() => generateExplanation(words[currentIndex].names)}
          disabled={!isReady || status === "submitted" || status === "streaming"}
        >
          Explain Word
        </Button>
        <div className="flex w-full sm:w-auto gap-x-2">
          <Button
            onClick={onClickPrev}
            disabled={!isReady || currentIndex === 0 || status === "submitted" || status === "streaming"}
            className="flex-1"
          >
            Prev
          </Button>
          <Button
            onClick={onClickNext}
            disabled={
              !isReady ||
              isFetchingWord ||
              (currentIndex === words.length - 1 && isFinalWord) ||
              status === "submitted" ||
              status === "streaming"
            }
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
