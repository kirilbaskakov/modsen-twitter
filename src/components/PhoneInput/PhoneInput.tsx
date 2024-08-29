import { ChangeEvent, useState } from 'react';

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
    <div className="relative">
      <input
        id="phone-input"
        placeholder=""
        className="peer"
        type="text"
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
      <label htmlFor="phone-input">Phone number</label>
    </div>
  );
};

export default PhoneInput;
