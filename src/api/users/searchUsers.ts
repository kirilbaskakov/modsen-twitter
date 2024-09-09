import { collection, getDocs, limit, query, where } from 'firebase/firestore';

import { db } from '@/firebase';
import { UserType } from '@/types/UserType';

const searchUsers = async (
  search: string,
  lim: number
): Promise<Array<string>> => {
  const usersRef = collection(db, 'users');

  const nameQuery = query(
    usersRef,
    where('name', '>=', search),
    where('name', '<=', search + '\uf8ff'),
    limit(lim)
  );

  const tgQuery = query(
    usersRef,
    where('tg', '>=', search),
    where('tg', '<=', search + '\uf8ff'),
    limit(lim)
  );

  const nameSnapshot = await getDocs(nameQuery);
  const tgSnapshot = await getDocs(tgQuery);

  let users = [
    ...nameSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    ...tgSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  ] as Array<UserType>;

  users = users.filter(
    user => user.name.includes(search) || user.tg.includes(search)
  );

  const ids = users.map(user => user.id);

  const uniqueIds = Array.from(new Set(ids));

  return uniqueIds.slice(0, lim);
};

export default searchUsers;
