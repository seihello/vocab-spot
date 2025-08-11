export function getSelectedTags() {
  const selectedTagsStr = localStorage.getItem("selectedTags");
  return selectedTagsStr ? selectedTagsStr.split(",") : [];
}
