export const removeUndefinedFromName = (names: string[]) => {
  if (names?.length < 1 || !names) return;
  return names?.filter((name) => name).join(', ');
};
