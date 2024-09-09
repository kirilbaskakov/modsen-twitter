const emailToPhone = (email: string): string => {
  let mask = '+___ __ ___-__-__';
  Array.from(email).forEach(sym => {
    mask = mask.replace('_', sym);
  });
  return mask;
};

export default emailToPhone;
