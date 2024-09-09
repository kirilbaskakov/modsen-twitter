import { ChangeEventHandler, useState } from 'react';

import { ModalProps } from '@/types/ModalProps';

import LabeledInput from '../LabeledInput/LabeledInput';
import Modal from '../Modal/Modal';

const ConfirmPasswordModal = ({
  onConfirm,
  isOpen,
  onClose
}: {
  onConfirm: (password: string) => void;
} & ModalProps) => {
  const [password, setPassword] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value);
  };

  const onConfirmClick = () => {
    onConfirm(password);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-72 text-center">
        <h1 className="text-3xl font-bold mb-4">Confirm your password</h1>
        <LabeledInput
          type="password"
          id="new-password-input"
          placeholder="New password"
          onChange={onChange}
        />
        <div className="flex gap-4 mt-6">
          <button onClick={onConfirmClick}>Ok</button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPasswordModal;
