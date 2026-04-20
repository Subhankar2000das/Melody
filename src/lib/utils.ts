export const cn = (...classes: Array<string | false | null | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

export const getPublicFileName = (fileName?: string | null) => {
  if (!fileName) return "";
  return `${Date.now()}-${fileName.replace(/\s+/g, "-").toLowerCase()}`;
};
