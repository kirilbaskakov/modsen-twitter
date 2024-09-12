import { Link, useNavigate } from 'react-router-dom';

import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

import { createUser } from '@/api/users';
import BackTwitter from '@/assets/back-twitter.png';
import GoogleLogo from '@/assets/google-icon.svg';
import TwitterLogo from '@/assets/twitter-logo.svg';
import { auth } from '@/firebase';

const SignupForm = () => {
  const navigate = useNavigate();

  const onGoogleClicked = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      await createUser({
        gender: 'Unknown',
        name: user.displayName ?? '',
        status: '',
        tg: '',
        uid: user.uid,
        birthDate: ''
      });
    }
  };

  const onSignupClicked = () => {
    navigate('/register');
  };

  return (
    <div className="flex gap-10 items-center flex-1 overflow-hidden">
      <img
        fetchPriority="high"
        src={BackTwitter}
        alt="Twitter image"
        className="hidden lg:block h-full w-1/2 max-w-6xl"
      />
      <div className="mx-auto px-4 lg:mx-0 lg:px-0">
        <img src={TwitterLogo} alt="Twitter logo" />
        <h1 className="text-7xl mt-14 font-extrabold">Happening now</h1>
        <div className="w-3/4">
          <h3 className="text-4xl mt-7 font-extrabold">Join Twitter now</h3>
          <button
            onClick={onGoogleClicked}
            className="flex items-center justify-center gap-1 py-2.5 mt-5 w-full outlined"
          >
            <img src={GoogleLogo} />
            Sign up with Google
          </button>
          <button onClick={onSignupClicked} className="py-2.5 mt-5 outlined">
            Sign up with email
          </button>
          <p className="text-sm mt-5">
            By singing up you agree to the <Link to="/">Terms of Service</Link>{' '}
            and <Link to="/">Privacy Policy</Link>, including{' '}
            <Link to="/">Cookie Use</Link>.
          </p>
          <p className="text-lg mt-4">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
