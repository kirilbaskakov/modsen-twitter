import { doc, setDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { UserType } from '@/types/UserType';

const updateUser = async (
  id: string,
  userData: Partial<UserType>
): Promise<void> => {
  const userRef = doc(db, 'users', id);
  await setDoc(userRef, userData, { merge: true });
};

export default updateUser;
