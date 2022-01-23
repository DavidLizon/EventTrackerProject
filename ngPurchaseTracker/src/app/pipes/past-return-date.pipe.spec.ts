import { PastReturnDatePipe } from './past-return-date.pipe';

describe('PastReturnDatePipe', () => {
  it('create an instance', () => {
    const pipe = new PastReturnDatePipe();
    expect(pipe).toBeTruthy();
  });
});
