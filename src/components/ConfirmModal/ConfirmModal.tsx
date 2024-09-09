import { ModalProps } from '@/types/ModalProps';

import Modal from '../Modal/Modal';

const ConfirmModal = ({
  text,
  onConfirm,
  isOpen,
  onClose
}: {
  text: string;
  onConfirm: () => void;
} & ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-72 text-center">
        <h1 className="text-3xl font-bold">{text}</h1>
        <div className="flex gap-4 mt-6">
          <button onClick={onConfirm}>Ok</button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
