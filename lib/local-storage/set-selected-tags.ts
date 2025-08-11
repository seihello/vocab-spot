export function setSelectedTags(selectedTags: string[]) {
  localStorage.setItem("selectedTags", selectedTags.join(","));
}
