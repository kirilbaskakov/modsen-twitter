import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import createUser from '@/api/users/createUser';
import TwitterLogo from '@/assets/twitter-logo.svg';
import { auth } from '@/firebase';

import Alert from '../Alert/Alert';
import RegisterNameForm, {
  NameFormInputs
} from '../RegisterNameForm/RegisterNameForm';
import RegisterPasswordForm, {
  PasswordFormInputs
} from '../RegisterPasswordForm/RegisterPasswordForm';

const RegisterForm = () => {
  const [nameData, setNameData] = useState<NameFormInputs | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onFirstSubmit: SubmitHandler<NameFormInputs> = data => {
    setStep(1);
    setNameData(data);
  };

  const onSecondSubmit: SubmitHandler<PasswordFormInputs> = async data => {
    if (!nameData) {
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        nameData!.email!,
        data.password
      );
      createUser({
        name: nameData.name,
        mail: nameData.email,
        uid: user.uid,
        gender: 'Unknown',
        tg: '',
        status: '',
        birthDate: ''
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    }
  };

  const onAlertClose = () => setError(null);
  return (
    <div className="mx-auto mt-16 w-1/3 min-w-96">
      <img src={TwitterLogo} className="mx-auto" alt="Twitter logo" />
      <h1 className="text-3xl font-bold mt-8">Create an account</h1>
      {step == 0 ? (
        <RegisterNameForm onSubmit={onFirstSubmit} />
      ) : (
        <RegisterPasswordForm onSubmit={onSecondSubmit} />
      )}
      {error && <Alert text={error} type="error" onClose={onAlertClose} />}
    </div>
  );
};

export default RegisterForm;
