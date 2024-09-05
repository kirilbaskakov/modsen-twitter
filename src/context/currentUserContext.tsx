import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useState } from 'react';

import { getUser } from '@/api/users';
import { auth } from '@/firebase';
import { UserType } from '@/types/UserType';

export const currentUserContext = createContext<UserType | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  onAuthStateChanged(auth, async (newUser: User | null) => {
    if (!newUser) {
      setUser(null);
      return;
    }
    if (!user) {
      const userData = await getUser(newUser.uid);
      setUser(userData);
    }
  });

  return (
    <currentUserContext.Provider value={user}>
      {children}
    </currentUserContext.Provider>
  );
};
