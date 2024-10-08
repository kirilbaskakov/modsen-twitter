import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState} from 'react';

import { getUserById } from '@/api/users';
import { UserType } from '@/types/UserType';

export const userContext = createContext<UserType | null>(null);

export const UserProvider = ({
  id,
  children
}: {
  id: string | undefined;
  children: ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = useCallback(async () => {
    if (!id) return;
    const user = await getUserById(id);
    setUser(user);
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};
