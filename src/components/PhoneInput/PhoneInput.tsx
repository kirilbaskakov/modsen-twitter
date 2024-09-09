import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { validatePhoneNumber } from '@/constants/validation';

import LabeledInput from '../LabeledInput/LabeledInput';

const PhoneInput = ({ defaultValue = '' }: { defaultValue?: string }) => {
  const { register, setValue } = useFormContext();

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    if (!value) {
      return setValue(
        'phoneNumber',
        event.target.value.startsWith('+') ? '+' : ''
      );
    }
    let mask = '+___ __ ___-__-__';
    Array.from(value).forEach(sym => {
      mask = mask.replace('_', sym);
    });
    mask = mask
      .replace(/-(?!\d)/g, '')
      .replace(/_/g, '')
      .trim();

    setValue('phoneNumber', mask);
  };

  return (
    <LabeledInput
      id="phone-input"
      placeholder="Phone number"
      type="text"
      defaultValue={defaultValue}
      register={() =>
        register('phoneNumber', {
          ...validatePhoneNumber,
          onChange: handlePhoneChange
        })
      }
    />
  );
};

export default PhoneInput;
