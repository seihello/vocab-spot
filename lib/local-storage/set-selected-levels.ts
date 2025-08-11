export function setSelectedLevels(selectedLevels: string[]) {
  localStorage.setItem("selectedLevels", selectedLevels.join(","));
}
