import maskPhone from './maskPhone';

test('mask phone from only country code', () => {
  const result = maskPhone('123');
  expect(result).toBe('+123');
});

test('mask 6 digit phone', () => {
  const result = maskPhone('123123');
  expect(result).toBe('+123 12 3');
});

test('mask 12 digit phone', () => {
  const result = maskPhone('123123123123');
  expect(result).toBe('+123 12 312-31-23');
});

test('mask 12 digit phone with +', () => {
  const result = maskPhone('+123123123123');
  expect(result).toBe('+123 12 312-31-23');
});
