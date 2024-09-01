import { ChangeEvent, useState } from 'react';

import LabeledInput from '../LabeledInput/LabeledInput';

const PhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    if (!value) {
      return setPhoneNumber(event.target.value.startsWith('+') ? '+' : '');
    }
    let mask = '+___ __ ___-__-__';
    Array.from(value).forEach(sym => {
      mask = mask.replace('_', sym);
    });
    mask = mask
      .replace(/-(?!\d)/g, '')
      .replace(/_/g, '')
      .trim();

    setPhoneNumber(mask);
  };

  return (
    <LabeledInput
      id="phone-input"
      placeholder="Phone number"
      type="text"
      value={phoneNumber}
      onChange={handlePhoneChange}
    />
  );
};

export default PhoneInput;
