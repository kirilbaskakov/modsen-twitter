import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import TwitterLogo from '@/assets/twitter-logo.svg';
import { auth } from '@/firebase';

import Alert from '../Alert/Alert';
import LabeledInput from '../LabeledInput/LabeledInput';

const LoginForm = () => {
  const [error, setError] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    const login = e.target.login.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, login, password)
      .then(() => console.log('ok'))
      .catch(err => setError(err.code));
  };

  const onAlertClose = () => setError(null);

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
      {error && <Alert text={error} type="error" onClose={onAlertClose} />}
    </div>
  );
};

export default LoginForm;
