"use client";

import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import RandomWord from "@/components/words/random-word";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { getRandomWord } from "@/lib/csv/get-random-word";
import { Word } from "@/lib/types";
import React, { useCallback, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
// import { useCompletion } from "@ai-sdk/react";

type Props = {
  tags: string[];
};

export default function RandomWordContainer({ tags }: Props) {
  const { isPwa } = useDisplayMode();

  const [words, setWords] = useState<Word[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFetchingWord, setIsFetchingWord] = useState(false);
  const [isDetailHidden, setIsDetailHidden] = useState(true);
  const [isFinalWord, setIsFinalWord] = useState(false);

  const { messages, status, append, setMessages } = useChat();

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

    const word = await getRandomWord({ tags: selectedTags, excludeIds: words.map((word) => word.id) });

    if (word) {
      setWords((prev) => [...prev, word]);
      setIsDetailHidden(true);
      setMessages([]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinalWord(true);
    }

    setIsFetchingWord(false);
  }, [currentIndex, isFetchingWord, selectedTags, words, setMessages]);

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
    setMessages([]);
    setWords([]);
  };

  const onClickGenerateSentence = async () => {
    const prompt = `Generate sentence(s) using the word(s) "${words[currentIndex].names}".`;
    await append({ role: "user", content: prompt });
  };

  const isReady = words.length > 0 && currentIndex >= 0;

  return (
    <div
      className={`flex flex-col items-end justify-center w-full max-w-256 mx-auto pt-8 px-2 sm:px-8 gap-y-2 min-h-dvh sm:min-h-auto ${
        isPwa ? "pb-16" : "pb-4"
      }`}
    >
      <div className="w-full grow">
        {isReady && <RandomWord word={words[currentIndex]} isDetailHidden={isDetailHidden} />}
      </div>
      <div>
        {messages
          .filter((message) => message.role === "assistant")
          .map((message) => (
            <div key={message.id}>
              {message.parts
                .filter((part) => part.type === "text")
                .map((part, index) => (
                  <span key={index}>{part.text}</span>
                ))}
            </div>
          ))}
      </div>
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:-order-1 items-end sm:items-center">
        <Menu tagOptions={tags} defaultSelectedTags={selectedTags} onUpdate={onUpdateSelectedTags} />
        <Button variant="outline" onClick={onClickGenerateSentence} disabled={!isReady}>
          Generate Sentence
        </Button>
        <Button variant="outline" onClick={onClickShowAnswer} disabled={!isReady || !isDetailHidden}>
          Show Answer
        </Button>
        <Button onClick={onClickPrev} disabled={!isReady || currentIndex === 0}>
          Prev
        </Button>
        <Button
          onClick={onClickNext}
          disabled={!isReady || isFetchingWord || (currentIndex === words.length - 1 && isFinalWord)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
