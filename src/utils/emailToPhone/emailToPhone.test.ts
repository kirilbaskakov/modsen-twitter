import emailToPhone from './emailToPhone';

test('email to phone', () => {
  const result = emailToPhone('111111111111@modsen-twitter.com');
  expect(result).toBe('+111 11 111-11-11');
});
