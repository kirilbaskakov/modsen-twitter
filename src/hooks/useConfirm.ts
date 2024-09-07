import { confirmContext } from '@/context/confirmContext';
import { useContext } from 'react';

const useConfirm = () => {
  return useContext(confirmContext);
};

export default useConfirm;
