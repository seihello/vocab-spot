import { atom } from "jotai";
import { Settings } from "@/lib/types";

export const settingsState = atom<Settings>({
  shouldShowTags: false,
  shouldShowLevel: false,
});
