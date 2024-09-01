import { onAuthStateChanged,User } from 'firebase/auth';
import { useState } from 'react';

import { auth } from '@/firebase';

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (newUser: User | null) => {
    if (!user) setUser(newUser);
  });

  return user;
};

export default useCurrentUser;
