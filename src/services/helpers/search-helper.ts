export const buildSearchPattern = (keyword?: string) => {
  if (!keyword) return "%";
  return `%${keyword}%`;
};
