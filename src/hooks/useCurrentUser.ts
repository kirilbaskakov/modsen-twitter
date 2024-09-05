import { useContext } from 'react';

import { currentUserContext } from '@/context/currentUserContext';

const useCurrentUser = () => {
  return useContext(currentUserContext);
};

export default useCurrentUser;
