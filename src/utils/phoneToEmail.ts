const phoneToEmail = (phone: string): string => {
  return phone.replace(/[+-\s]/g, '') + '@modsen-twitter.com';
};

export default phoneToEmail;
