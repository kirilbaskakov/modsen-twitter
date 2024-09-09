import phoneToEmail from './phoneToEmail';

test('phone to email', () => {
  const result = phoneToEmail('+111 11 111-11-11');
  expect(result).toBe('111111111111@modsen-twitter.com');
});
