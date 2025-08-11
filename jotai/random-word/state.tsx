import { atom } from "jotai";
import { Settings } from "@/lib/types";

export const selectedTagsState = atom<string[]>([]);

export const settingsState = atom<Settings>({
  shouldShowMeanings: false,
  shouldShowSentences: false,
  shouldShowTags: false,
  shouldShowLevel: false,
});
