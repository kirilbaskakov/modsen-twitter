import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import cn from 'classnames';

import { validateEmail, validateName } from '@/constants/validation';
import { AuthTypes } from '@/types/AuthTypes';

import DateInput from '../DateInput/DateInput';
import LabeledInput from '../LabeledInput/LabeledInput';
import PhoneInput from '../PhoneInput/PhoneInput';

export interface NameFormInputs {
  name: string;
  phone: string;
  birthday: Date;
  email?: string;
  phoneNumber?: string;
}

const RegisterNameForm = ({
  onSubmit
}: {
  onSubmit: (data: NameFormInputs) => void;
}) => {
  const form = useForm<NameFormInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = form;
  const [authType, setAuthType] = useState<AuthTypes>(AuthTypes.EMAIL);
  const onAuthTypeClick = () => {
    setAuthType(authType =>
      authType == AuthTypes.EMAIL ? AuthTypes.PHONE : AuthTypes.EMAIL
    );
  };

  const sumbitHandler = (data: NameFormInputs) => {
    if (data.birthday > new Date()) {
      setError('birthday', {
        type: 'manual',
        message: 'Birthday must be less than the current date.'
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(sumbitHandler)}
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
        {authType == AuthTypes.PHONE ? (
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
          {errors.email?.message || errors.phoneNumber?.message}
        </p>
        <div
          className="cursor-pointer select-none text-blue-500"
          onClick={onAuthTypeClick}
        >
          Use {AuthTypes.EMAIL ? 'phone' : 'email'}
        </div>
        <h3 className="text-lg font-bold">Date of birth</h3>
        <p className="text-sm text-gray-500">
          Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit.
          Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim
          nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
          dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
        </p>
        <DateInput />
        <p className="text-red-500 text-xs font-bold h-3">
          {errors.birthday?.message}
        </p>
        <button className="mt-4 py-3.5">Next</button>
      </form>
    </FormProvider>
  );
};

export default RegisterNameForm;
