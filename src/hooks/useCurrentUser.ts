import { userContext } from '@/context/userContext';
import { useContext } from 'react';

const useCurrentUser = () => {
  return useContext(userContext);
};

export default useCurrentUser;
