export type ArrayedWord = {
  id: string;
  names: string[];
  meanings: string[] | null;
  sentences: string[] | null;
  collocations: string[] | null;
  pronunciations: string[] | null;
  tags: string[] | null;
  level: number | null;
};

export type Word = {
  id: string;
  names: string;
  meanings: string | null;
  sentences: string | null;
  collocations: string | null;
  pronunciations: string | null;
  tags: string | null;
  level: number | null;
};
