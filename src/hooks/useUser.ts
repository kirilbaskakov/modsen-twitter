import { useContext } from 'react';

import { userContext } from '@/context/userContext';

const useUser = () => {
  return useContext(userContext);
};

export default useUser;
