import { parseDate } from './parsers';

export const START_DATE = Date.parse('1995-06-15');

export const END_DATE = Date.now();

export const randomDate = (
  randomNum: number = Math.random(),
  startDate: number = START_DATE,
  endDate: number = END_DATE
): number => {
  return Math.round((endDate - startDate) * randomNum + startDate);
};

export const isDateAlreadyUsed = (inputDate: string, usedDates: string[]) => {
  return usedDates.some((date) => date === inputDate);
};

export const generateUniqueDate = (usedDates: string[]) => {
  let date = null;
  do {
    date = parseDate(new Date(randomDate()));
  } while (isDateAlreadyUsed(date, usedDates));
  return date;
};
