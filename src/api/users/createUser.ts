import { addDoc, collection } from 'firebase/firestore';

import { db } from '@/firebase';
import { UserType } from '@/types/UserType';

const createUser = async (userData: Omit<UserType, 'id'>): Promise<void> => {
  const usersRef = collection(db, 'users');
  await addDoc(usersRef, userData);
};

export default createUser;
