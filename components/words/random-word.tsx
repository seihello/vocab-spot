import { Word } from "@/lib/types";
import React from "react";

type Props = {
  word: Word;
  isDetailHidden: boolean;
};

export default function RandomWord({ word, isDetailHidden }: Props) {
  return (
    <div className="space-y-2 whitespace-pre-line grow w-full">
      <div className="font-bold text-2xl text-primary-700">{word.names}</div>
      {!isDetailHidden && (
        <>
          <div className="text-gray-500">{word.meanings}</div>
          <div>{word.sentences}</div>
        </>
      )}
    </div>
  );
}
