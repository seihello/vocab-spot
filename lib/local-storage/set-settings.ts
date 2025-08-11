import { Settings } from "@/lib/types";

export function setSettings(settings: Settings) {
  localStorage.setItem("shouldShowMeanings", settings.shouldShowMeanings ? "on" : "off");
  localStorage.setItem("shouldShowSentences", settings.shouldShowSentences ? "on" : "off");
  localStorage.setItem("shouldShowTags", settings.shouldShowTags ? "on" : "off");
  localStorage.setItem("shouldShowLevel", settings.shouldShowLevel ? "on" : "off");
}
