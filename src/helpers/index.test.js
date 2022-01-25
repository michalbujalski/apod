import { randomDate, START_DATE } from '.';

describe('random date generater', () => {
  it('should be min date if random number is 0', () => {
    const randomNum = 0;
    expect(randomDate(randomNum)).toEqual(START_DATE);
  });
  it('should be max date if random number is 1', () => {
    const randomNum = 1;
    const endDate = Date.parse('2022-01-25');
    expect(randomDate(randomNum, START_DATE, endDate)).toEqual(endDate);
  });
  it('should be return middle day if random number is 0.5', () => {
    const randomNum = 0.5;
    const startDate = Date.parse('2022-01-23');
    const endDate = Date.parse('2022-01-25');
    const resultDate = new Date(randomDate(randomNum, startDate, endDate));
    const year = resultDate.getFullYear();
    const month = resultDate.getUTCMonth();
    const day = resultDate.getDate();
    expect(year).toEqual(2022);
    expect(month).toEqual(0);
    expect(day).toEqual(24);
  });
});
