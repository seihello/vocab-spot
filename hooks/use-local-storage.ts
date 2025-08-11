"use client";

import { selectedTagsState } from "@/lib/jotai/random-word/state";
import { getSelectedTags } from "@/lib/local-storage/get-selected-tags";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [, setSelectedTags] = useAtom(selectedTagsState);

  useEffect(() => {
    setSelectedTags(getSelectedTags());
    setIsLoading(false);
  }, [setSelectedTags]);

  return {
    isLoading,
  };
}
