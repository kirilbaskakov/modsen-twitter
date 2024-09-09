import cn from 'classnames';
import { useForm } from 'react-hook-form';

import { validatePassword } from '@/constants/validation';

import LabeledInput from '../LabeledInput/LabeledInput';

export interface PasswordFormInputs {
  password: string;
  confirmPassword: string;
}

const RegisterPasswordForm = ({
  onSubmit
}: {
  onSubmit: (data: PasswordFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PasswordFormInputs>();

  const password = watch('password');

  return (
    <form
      className="mt-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LabeledInput
        type="password"
        className={cn({
          error: !!errors.password || !!errors.confirmPassword
        })}
        placeholder="Password"
        id="password-input"
        register={() => register('password', validatePassword)}
      />

      <LabeledInput
        type="password"
        className={cn({ error: !!errors.confirmPassword })}
        placeholder="Confirm password"
        id="confirm-password-input"
        register={() =>
          register('confirmPassword', {
            validate: value => value === password || 'Passwords do not match'
          })
        }
      />
      <p className="text-red-500 text-xs font-bold h-3">
        {errors.password?.message ?? errors.confirmPassword?.message}
      </p>

      <button className="py-3.5 mt-2">Create account</button>
    </form>
  );
};

export default RegisterPasswordForm;
