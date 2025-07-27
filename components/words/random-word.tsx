import { Word } from "@/lib/types";
import React from "react";

type Props = {
  word: Word;
  isDetailHidden: boolean;
};

export default function RandomWord({ word, isDetailHidden }: Props) {
  return (
    <div className="space-y-2 whitespace-pre-line w-full">
      <div className="font-bold text-2xl text-primary-700">{word.names}</div>
      {!isDetailHidden && (
        <>
          <div className="text-gray-500">{word.meanings}</div>
          <div>{word.sentences}</div>
          <div className="flex flex-wrap gap-1 justify-end">
            {word.tags.map((tag, index) => (
              <div
                key={index}
                className="tag bg-orange-300 text-xs border shadow pl-2 pr-1 py-1 min-w-14 flex items-center justify-center"
              >
                {tag}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
