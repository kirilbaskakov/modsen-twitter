import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import PhoneInput from '../PhoneInput/PhoneInput';
import DateInput from '../DateInput/DateInput';

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
      <div className="relative">
        <input
          id="name-input"
          className={'peer ' + cn({ error: !!errors.name })}
          placeholder=""
          type="text"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 5,
              message: 'Name must be longer than 5 characters'
            },
            maxLength: {
              value: 50,
              message: 'Name must be shorter than 50 characters'
            }
          })}
        />
        <label htmlFor="name-input">Name</label>
      </div>
      <p className="text-red-500 text-xs font-bold h-3">
        {errors.name?.message}
      </p>
      {authType == 'phone' ? (
        <PhoneInput />
      ) : (
        <div className="relative">
          <input
            id="email-input"
            className={'peer ' + cn({ error: !!errors.email })}
            placeholder=""
            type="text"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email'
              }
            })}
          />
          <label htmlFor="email-input">Email</label>
        </div>
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
      <p className="text-sm text-gray-600">
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
