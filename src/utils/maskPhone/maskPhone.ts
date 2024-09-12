const maskPhone = (value: string): string => {
  const valueCleared = value.replace(/\D/g, '');
  if (!valueCleared) {
    return value.startsWith('+') ? '+' : '';
  }
  let mask = '+___ __ ___-__-__';
  Array.from(valueCleared).forEach(sym => {
    mask = mask.replace('_', sym);
  });
  mask = mask
    .replace(/-(?!\d)/g, '')
    .replace(/_/g, '')
    .trim();
  return mask;
};

export default maskPhone;
