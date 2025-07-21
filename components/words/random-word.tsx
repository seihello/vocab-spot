import { Word } from "@/lib/types";
import React from "react";

type Props = {
  word: Word;
};

export default function RandomWord({ word }: Props) {
  return (
    <div className="space-y-2 whitespace-pre-line grow w-full sm:w-auto">
      <div className="font-bold text-2xl text-primary-700">{word.names}</div>
      <div className="text-gray-500">{word.meanings}</div>
      <div className="">{word.sentences}</div>
    </div>
  );
}
