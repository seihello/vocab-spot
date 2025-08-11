"use client";

import { selectedLevelsState, selectedTagsState } from "@/lib/jotai/random-word/state";
import { getSelectedLevels } from "@/lib/local-storage/get-selected-levels";
import { getSelectedTags } from "@/lib/local-storage/get-selected-tags";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { setSelectedTags as setSelectedTagsToLocalStorage } from "@/lib/local-storage/set-selected-tags";
import { setSelectedLevels as setSelectedLevelsToLocalStorage } from "@/lib/local-storage/set-selected-levels";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);

  useEffect(() => {
    setSelectedTags(getSelectedTags());
    setSelectedLevels(getSelectedLevels());
    setIsLoading(false);
  }, [setSelectedTags, setSelectedLevels]);

  useEffect(() => {
    setSelectedTagsToLocalStorage(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    setSelectedLevelsToLocalStorage(selectedLevels);
  }, [selectedLevels]);

  return {
    isLoading,
  };
}
