import displayDate from './displayDate';

test('display now', () => {
  const display = displayDate(new Date());
  expect(display).toBe('now');
});

test('display minutes', () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - 5);
  const display = displayDate(date);
  expect(display).toBe('5m');
});

test('display hours', () => {
  const date = new Date();
  date.setHours(date.getHours() - 5);
  const display = displayDate(date);
  expect(display).toBe('5h');
});

test('display date', () => {
  const date = new Date();
  date.setMonth(0);
  date.setDate(1);
  const display = displayDate(date);
  expect(display).toBe('Jan 1');
});

test('display date with year', () => {
  const date = new Date(Date.UTC(2021, 7, 24));
  const display = displayDate(date);
  expect(display).toBe('Aug 24, 2021');
});
