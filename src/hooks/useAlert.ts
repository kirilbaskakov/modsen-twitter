import { useContext } from 'react';

import { alertContext } from '@/context/alertContext';

const useAlert = () => {
  return useContext(alertContext);
};

export default useAlert;
