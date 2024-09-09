import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import createUser from '@/api/users/createUser';
import TwitterLogo from '@/assets/twitter-logo.svg';
import { auth } from '@/firebase';
import useAlert from '@/hooks/useAlert';
import phoneToEmail from '@/utils/phoneToEmail';

import errorsMessages from '../../constants/errorsMessages';
import RegisterNameForm, {
  NameFormInputs
} from '../RegisterNameForm/RegisterNameForm';
import RegisterPasswordForm, {
  PasswordFormInputs
} from '../RegisterPasswordForm/RegisterPasswordForm';

const RegisterForm = () => {
  const [nameData, setNameData] = useState<NameFormInputs | null>(null);
  const [step, setStep] = useState(0);
  const { showAlert } = useAlert();

  const onFirstSubmit: SubmitHandler<NameFormInputs> = data => {
    setStep(1);
    setNameData(data);
  };

  const onSecondSubmit: SubmitHandler<PasswordFormInputs> = async data => {
    if (!nameData) {
      return;
    }
    const mail =
      nameData.email ||
      (nameData.phoneNumber && phoneToEmail(nameData.phoneNumber));
    if (!mail) {
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        mail,
        data.password
      );
      createUser({
        name: nameData.name,
        uid: user.uid,
        gender: 'Unknown',
        tg: '',
        status: '',
        birthDate: ''
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        showAlert(errorsMessages[error.code] ?? 'Some error occured', 'error');
      }
    }
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
