import { useForm } from 'react-hook-form';
import cn from 'classnames';

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
      <div className="relative">
        <input
          type="password"
          className={
            'peer ' +
            cn({ error: !!errors.password || !!errors.confirmPassword })
          }
          placeholder=""
          id="password-input"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be longer than 7 characters'
            },
            maxLength: {
              value: 50,
              message: 'Password must be shorter than 50 characters'
            }
          })}
        />
        <label htmlFor="password-input">Password</label>
      </div>
      <div className="relative">
        <input
          type="password"
          className={'peer ' + cn({ error: !!errors.confirmPassword })}
          placeholder=""
          id="confirm-password-input"
          {...register('confirmPassword', {
            validate: value => value === password || 'Passwords do not match'
          })}
        />
        <label htmlFor="confirm-password-input">Confirm password</label>
      </div>
      <p className="text-red-500 text-xs font-bold h-3">
        {errors.password?.message ?? errors.confirmPassword?.message}
      </p>

      <button className="py-3.5 mt-2">Create account</button>
    </form>
  );
};

export default RegisterPasswordForm;
