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

  const { messages, append, setMessages } = useChat();

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

  const onClickGenerateExplanation = async () => {
    const prompt = `"${words[currentIndex].names}"という英語の解説をしてください。単語である場合は、接頭辞や語根、接尾辞などの分析や語源の解説、効果的な意味の覚え方などを解説してください。熟語やイディオムである場合は、使用するシーンやカジュアル度、他の言い方などを説明してください。ただしここで列挙した以外の情報を加えても問題ありません。回答は日本語で、マークダウン形式の記号は絶対に含めないでください。`;
    await append({ role: "user", content: prompt });
  };

  const isReady = words.length > 0 && currentIndex >= 0;

  const answers = messages.filter((message) => message.role === "assistant");

  return (
    <div className="max-h-screen flex flex-col items-end justify-center w-full max-w-256 mx-auto pt-8 sm:px-8 min-h-dvh sm:min-h-auto">
      <div className="w-full grow overflow-y-scroll px-2 space-y-2">
        {isReady && <RandomWord word={words[currentIndex]} isDetailHidden={isDetailHidden} />}
        {answers.length > 0 && (
          <div className="w-full bg-green-50 p-2 sm:p-4 rounded-2xl text-sm sm:text-base">
            {answers.map((answer) => (
              <div key={answer.id}>
                <span className="mr-1">💡</span>
                {answer.parts
                  .filter((part) => part.type === "text")
                  .map((part, index) => (
                    <span key={index}>{part.text}</span>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`w-full px-2 bg-white sm:w-auto flex flex-col sm:flex-row gap-2 sm:-order-1 items-end sm:items-center pt-2 shadow-[0px_0px_16px_6px_#EEEEEE] sm:shadow-none ${
          isPwa ? "pb-16" : "pb-4"
        }`}
      >
        <Menu tagOptions={tags} defaultSelectedTags={selectedTags} onUpdate={onUpdateSelectedTags} />
        <Button variant="outline" onClick={onClickGenerateExplanation} disabled={!isReady}>
          Explain word
        </Button>
        <Button variant="outline" onClick={onClickShowAnswer} disabled={!isReady || !isDetailHidden}>
          Show Answer
        </Button>
        <div className="flex w-full sm:w-auto gap-x-2">
          <Button onClick={onClickPrev} disabled={!isReady || currentIndex === 0} className="flex-1">
            Prev
          </Button>
          <Button
            onClick={onClickNext}
            disabled={!isReady || isFetchingWord || (currentIndex === words.length - 1 && isFinalWord)}
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
