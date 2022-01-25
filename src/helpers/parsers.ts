export const parseDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
