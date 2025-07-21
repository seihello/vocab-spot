import { Word } from "@/lib/types";
import React from "react";

type Props = {
  word: Word;
};

export default function RandomWord({ word }: Props) {
  console.log("word", word);

  return (
    <div className="space-y-2 whitespace-pre-line">
      <div>{word.names}</div>
      <div>{word.meanings}</div>
      <div>{word.sentences}</div>
    </div>
  );
}
