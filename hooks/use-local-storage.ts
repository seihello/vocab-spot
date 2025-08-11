"use client";

import { selectedLevelsState, selectedTagsState, settingsState } from "@/lib/jotai/random-word/state";
import { getSelectedLevels } from "@/lib/local-storage/get-selected-levels";
import { getSelectedTags } from "@/lib/local-storage/get-selected-tags";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { setSelectedTags as setSelectedTagsToLocalStorage } from "@/lib/local-storage/set-selected-tags";
import { setSelectedLevels as setSelectedLevelsToLocalStorage } from "@/lib/local-storage/set-selected-levels";
import { getSettings } from "@/lib/local-storage/get-settings";
import { setSettings as setSettingsToLocalStorage } from "@/lib/local-storage/set-settings";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);
  const [settings, setSettings] = useAtom(settingsState);

  useEffect(() => {
    setSelectedTags(getSelectedTags());
    setSelectedLevels(getSelectedLevels());
    setSettings(getSettings());
    setIsLoading(false);
  }, [setSelectedTags, setSelectedLevels, setSettings]);

  useEffect(() => {
    setSelectedTagsToLocalStorage(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    setSelectedLevelsToLocalStorage(selectedLevels);
  }, [selectedLevels]);

  useEffect(() => {
    setSettingsToLocalStorage(settings);
  }, [settings]);

  return {
    isLoading,
  };
}
