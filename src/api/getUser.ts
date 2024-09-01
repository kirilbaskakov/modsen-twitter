import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/firebase';
import { UserType } from '@/types/UserType';

const getUser = async (uid: string): Promise<UserType> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('uid', '==', uid));
  const response = await getDocs(q);
  const doc = response.docs[0];
  return { id: doc.id, ...doc.data() } as UserType;
};

export default getUser;
