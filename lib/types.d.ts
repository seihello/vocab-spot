export type WordSummary = {
  id: string;
  level: number;
  tags: string[];
};

export type Word = {
  id: string;
  names: string;
  meanings: string;
  sentences: string;
  collocations: string;
  pronunciations: string;
  synonyms: string;
  level: number;
  tags: string[];
};

export type SearchOptions = { excludeIds?: string[]; tags?: string[]; levels?: string[] };

export type Settings = {
  shouldShowMeanings: boolean;
  shouldShowSentences: boolean;
  shouldShowTags: boolean;
  shouldShowLevel: boolean;
};
