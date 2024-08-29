import { Link } from 'react-router-dom';

import TwitterLogo from '@/assets/twitter-logo.svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useState } from 'react';

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

  return (
    <div className="mx-auto w-1/4 mt-12 min-w-96">
      <img src={TwitterLogo} alt="Twitter logo" />
      <h1 className="text-4xl font-extrabold my-8">Log in to Twitter</h1>
      <form onSubmit={onSubmit}>
        <div className="relative">
          <input
            id="login-input"
            className="peer"
            placeholder=""
            type="text"
            name="login"
          />
          <label htmlFor="login-input">Phone number, email address</label>
        </div>
        <div className="relative mt-4">
          <input
            id="password-input"
            className="peer"
            placeholder=""
            type="password"
            name="password"
          />
          <label htmlFor="password-input">Password</label>
        </div>
        <p className="text-red-500 text-xs font-bold h-3 mt-2">{error}</p>
        <button className="mt-4 py-3.5 " type="submit">
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
