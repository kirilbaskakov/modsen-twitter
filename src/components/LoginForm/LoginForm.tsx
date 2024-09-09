import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import TwitterLogo from '@/assets/twitter-logo.svg';
import errorsMessages from '@/constants/errorsMessages';
import { auth } from '@/firebase';
import useAlert from '@/hooks/useAlert';
import phoneToEmail from '@/utils/phoneToEmail';

import LabeledInput from '../LabeledInput/LabeledInput';

const LoginForm = () => {
  const { showAlert } = useAlert();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements as HTMLFormControlsCollection & {
      login: HTMLInputElement;
      password: HTMLInputElement;
    };
    let login = elements.login.value;
    if (!login.includes('@')) {
      login = phoneToEmail(login);
    }
    const password = elements.password.value;
    signInWithEmailAndPassword(auth, login, password).catch(err =>
      showAlert(errorsMessages[err.code] ?? 'Some error occured', 'error')
    );
  };

  return (
    <div className="mx-auto w-1/4 mt-12 min-w-96">
      <img src={TwitterLogo} alt="Twitter logo" />
      <h1 className="text-4xl font-extrabold my-8">Log in to Twitter</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <LabeledInput
          id="login-input"
          placeholder="Phone number, email address"
          type="text"
          name="login"
        />
        <LabeledInput
          id="password-input"
          placeholder="Password"
          type="password"
          name="password"
        />
        <button className="mt-2 py-3.5 " type="submit">
          Log In
        </button>
      </form>
      <Link to="/" className="block text-end mt-7">
        Sign up to Twitter
      </Link>
    </div>
  );
};

export default LoginForm;
