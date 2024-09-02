import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { UserType } from '@/types/UserType';

const getUserById = async (id: string): Promise<UserType> => {
  const usersRef = doc(db, 'users', id);
  const user = await getDoc(usersRef);
  console.log(id, user.data());
  return { id: user.id, ...user.data() } as UserType;
};

export default getUserById;
