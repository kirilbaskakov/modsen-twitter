import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { validatePhoneNumber } from '@/constants/validation';
import maskPhone from '@/utils/maskPhone/maskPhone';

import LabeledInput from '../LabeledInput/LabeledInput';

const PhoneInput = ({ defaultValue = '' }: { defaultValue?: string }) => {
  const { register, setValue } = useFormContext();

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('phoneNumber', maskPhone(event.target.value));
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
