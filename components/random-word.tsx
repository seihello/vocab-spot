import { settingsState } from "@/jotai/random-word/state";
import { Word } from "@/lib/types";
import { useAtom } from "jotai";
import React from "react";

type Props = {
  word: Word;
  isDetailHidden: boolean;
};

export default function RandomWord({ word, isDetailHidden }: Props) {
  const [settings] = useAtom(settingsState);

  return (
    <div className="space-y-2 whitespace-pre-line w-full">
      <div className="font-bold text-2xl text-primary-700">{word.names}</div>

      {(settings.shouldShowMeanings || !isDetailHidden) && <div className="text-gray-500">{word.meanings}</div>}
      {(settings.shouldShowSentences || !isDetailHidden) && <div>{word.sentences}</div>}
      <div className="flex flex-wrap gap-2 justify-end">
        {(settings.shouldShowLevel || !isDetailHidden) && word.level && (
          <div className="border border-gray-300 rounded-md px-2 py-1 text-xs flex items-center justify-center">
            Level {word.level}
          </div>
        )}
        {(settings.shouldShowTags || !isDetailHidden) && (
          <>
            {word.tags.map((tag, index) => (
              <div
                key={index}
                className="tag bg-orange-300 text-xs border shadow pl-2 pr-1 py-1 min-w-14 flex items-center justify-center"
              >
                {tag}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
