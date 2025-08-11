import { Settings } from "@/lib/types";

export function getSettings(): Settings {
  return {
    shouldShowMeanings: localStorage.getItem("shouldShowMeanings") === "on",
    shouldShowSentences: localStorage.getItem("shouldShowSentences") === "on",
    shouldShowTags: localStorage.getItem("shouldShowTags") === "on",
    shouldShowLevel: localStorage.getItem("shouldShowLevel") === "on",
  };
}
