import { createContext, ReactNode, useState } from 'react';

import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

export const confirmContext = createContext<{
  showConfirm: (text: string, onConfirm: () => void) => void;
}>({ showConfirm: () => {} });

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    text: '',
    onConfirm: () => {}
  });

  const showConfirm = (text: string, onConfirm: () => void) => {
    setIsOpen(true);
    setModalOptions({
      text,
      onConfirm: () => {
        setIsOpen(false);
        onConfirm();
      }
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <confirmContext.Provider value={{ showConfirm }}>
      {children}
      <ConfirmModal isOpen={isOpen} onClose={onClose} {...modalOptions} />
    </confirmContext.Provider>
  );
};
