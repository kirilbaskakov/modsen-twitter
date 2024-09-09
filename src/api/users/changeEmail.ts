import { reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth/web-extension';

import { auth } from '@/firebase';

async function changeEmail(currentPassword: string, newEmail: string) {
  const user = auth.currentUser;

  if (!user || !user.email) {
    return;
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  await reauthenticateWithCredential(user, credential);

  await updateEmail(user, newEmail);
}

export default changeEmail;
