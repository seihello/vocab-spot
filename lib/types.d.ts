export type Word = {
  id: string;
  names: string;
  meanings: string;
  sentences: string;
  collocations: string;
  pronunciations: string;
  level: number;
  tags: string[]; // 配列にする
};
