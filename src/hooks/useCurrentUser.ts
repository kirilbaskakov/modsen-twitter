import { useContext } from 'react';

import { userContext } from '@/context/userContext';

const useCurrentUser = () => {
  return useContext(userContext);
};

export default useCurrentUser;
