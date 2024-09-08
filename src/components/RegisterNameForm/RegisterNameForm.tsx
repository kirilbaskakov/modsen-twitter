import cn from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { validateEmail, validateName } from '@/constants/validation';

import DateInput from '../DateInput/DateInput';
import LabeledInput from '../LabeledInput/LabeledInput';
import PhoneInput from '../PhoneInput/PhoneInput';

export interface NameFormInputs {
  name: string;
  email: string;
  phone: string;
}

const RegisterNameForm = ({
  onSubmit
}: {
  onSubmit: (data: NameFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NameFormInputs>();
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const onAuthTypeClick = () => {
    setAuthType(authType => (authType == 'email' ? 'phone' : 'email'));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-2"
    >
      <LabeledInput
        type="text"
        id="name-input"
        className={cn({ error: !!errors.name })}
        placeholder="Name"
        register={() => register('name', validateName)}
      />
      <p className="text-red-500 text-xs font-bold h-3">
        {errors.name?.message}
      </p>
      {authType == 'phone' ? (
        <PhoneInput />
      ) : (
        <LabeledInput
          type="text"
          id="email-input"
          className={cn({ error: !!errors.email })}
          placeholder="Email"
          register={() => register('email', validateEmail)}
        />
      )}
      <p className="text-red-500 text-xs font-bold h-3">
        {errors.email?.message}
      </p>
      <div
        className="cursor-pointer select-none text-blue-500"
        onClick={onAuthTypeClick}
      >
        Use {authType === 'email' ? 'phone' : 'email'}
      </div>
      <h3 className="text-lg font-bold">Date of birth</h3>
      <p className="text-sm text-gray-500">
        Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit.
        Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim
        nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
        dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
      </p>
      <DateInput />
      <button className="mt-4 py-3.5">Next</button>
    </form>
  );
};

export default RegisterNameForm;
