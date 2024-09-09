import { createContext, ReactNode, useState } from 'react';

import Alert from '@/components/Alert/Alert';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import ConfirmPasswordModal from '@/components/ConfirmPasswordModal/ConfirmPasswordModal';

export const alertContext = createContext<{
  showConfirm: (text: string, onConfirm: () => void) => void;
  showAlert: (text: string, type: 'error' | 'success') => void;
  showPasswordConfirm: () => Promise<string>;
}>({
  showConfirm: () => {},
  showAlert: () => {},
  showPasswordConfirm: () => Promise.resolve('')
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    text: '',
    onConfirm: () => {}
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState<{
    text: string;
    type: 'success' | 'error';
  }>({
    text: '',
    type: 'success'
  });
  const [isPasswordConfirmOpen, setIsPasswordOpen] = useState(false);
  const [passwordConfirmOptions, setPasswordConfirmOptions] = useState<{
    onConfirm: (password: string) => void;
    onClose: () => void;
  }>({
    onConfirm: () => {},
    onClose: () => {}
  });

  const showConfirm = (text: string, onConfirm: () => void) => {
    setIsModalOpen(true);
    setModalOptions({
      text,
      onConfirm: () => {
        setIsModalOpen(false);
        onConfirm();
      }
    });
  };

  const showAlert = (text: string, type: 'error' | 'success') => {
    setIsAlertOpen(true);
    setAlertOptions({
      text,
      type
    });
  };

  const showPasswordConfirm = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsPasswordOpen(true);
      setPasswordConfirmOptions({
        onConfirm: (password: string) => {
          setIsPasswordOpen(false);
          resolve(password);
        },
        onClose: () => {
          setIsPasswordOpen(false);
          reject();
        }
      });
    });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <alertContext.Provider
      value={{ showConfirm, showAlert, showPasswordConfirm }}
    >
      {children}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        {...modalOptions}
      />
      {isAlertOpen && <Alert onClose={onAlertClose} {...alertOptions} />}
      {isPasswordConfirmOpen && (
        <ConfirmPasswordModal
          isOpen={isPasswordConfirmOpen}
          {...passwordConfirmOptions}
        />
      )}
    </alertContext.Provider>
  );
};
