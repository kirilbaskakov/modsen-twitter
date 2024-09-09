import { reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { EmailAuthProvider } from 'firebase/auth/web-extension';

import { auth } from '@/firebase';

const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    return;
  }

  const providerData = user.providerData;
  const isGoogleUser = providerData.some(
    provider => provider.providerId === 'google.com'
  );

  if (isGoogleUser) {
    return;
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
};

export default changePassword;
