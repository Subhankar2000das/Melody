export const formatDuration = (seconds?: number | null) => {
  if (seconds === null || seconds === undefined) return "0:00";

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${min}:${sec.toString().padStart(2, "0")}`;
};
