import { Link, useNavigate } from 'react-router-dom';

import BackTwitter from '@/assets/back-twitter.png';
import GoogleLogo from '@/assets/google-icon.svg';
import TwitterLogo from '@/assets/twitter-logo.svg';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase';

const SignupForm = () => {
  const navigate = useNavigate();

  const onGoogleClicked = () => {
    const provider = new GoogleAuthProvider();
    console.log(auth);
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage);
      });
  };
  const onSignupClicked = () => {
    navigate('/register');
  };

  return (
    <div className="flex gap-10 items-center flex-1 overflow-hidden">
      <img
        src={BackTwitter}
        alt="Twitter image"
        className="hidden lg:block h-full w-1/2"
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
