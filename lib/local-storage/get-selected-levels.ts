export function getSelectedLevels() {
  const selectedLevelsStr = localStorage.getItem("selectedLevels");
  return selectedLevelsStr?.split(",") ?? [];
}
