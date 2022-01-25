import { parseDate } from './parsers';

describe('date parser', () => {
  it('should be parse date correctly', () => {
    const date = new Date('2022-02-14');
    expect(parseDate(date)).toEqual('2022-02-14');
  });
});
