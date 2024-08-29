import { useState } from 'react';

import TwitterLogo from '@/assets/twitter-logo.svg';
import { SubmitHandler } from 'react-hook-form';
import RegisterPasswordForm, {
  PasswordFormInputs
} from '../RegisterPasswordForm/RegisterPasswordForm';
import RegisterNameForm, {
  NameFormInputs
} from '../RegisterNameForm/RegisterNameForm';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase';

const RegisterForm = () => {
  const [nameData, setNameData] = useState<NameFormInputs | null>(null);
  const [step, setStep] = useState(0);

  const onFirstSubmit: SubmitHandler<NameFormInputs> = data => {
    setStep(1);
    setNameData(data);
  };

  const onSecondSubmit: SubmitHandler<PasswordFormInputs> = data => {
    createUserWithEmailAndPassword(auth, nameData!.email!, data.password)
      .then(({ user }) => updateProfile(user, { displayName: nameData?.name }))
      .catch(reason => console.log(reason));
    console.log(nameData, data);
  };

  return (
    <div className="mx-auto mt-16 w-1/3 min-w-96">
      <img src={TwitterLogo} className="mx-auto" alt="Twitter logo" />
      <h1 className="text-3xl font-bold mt-8">Create an account</h1>
      {step == 0 ? (
        <RegisterNameForm onSubmit={onFirstSubmit} />
      ) : (
        <RegisterPasswordForm onSubmit={onSecondSubmit} />
      )}
    </div>
  );
};

export default RegisterForm;
