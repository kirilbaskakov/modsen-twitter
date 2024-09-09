import daysInMonth from './daysInMonth';

test('31 day in month', () => {
  const days = daysInMonth(11, 2024);
  expect(days).toBe(31);
});

test('30 days in month', () => {
  const days = daysInMonth(10, 2024);
  expect(days).toBe(30);
});

test('28 days in february', () => {
  const days = daysInMonth(1, 2023);
  expect(days).toBe(28);
});

test('29 days in february', () => {
  const days = daysInMonth(1, 2024);
  expect(days).toBe(29);
});
