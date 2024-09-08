import { useContext } from 'react';

import { confirmContext } from '@/context/confirmContext';

const useConfirm = () => {
  return useContext(confirmContext);
};

export default useConfirm;
