import { useEffect } from 'react';

import { ModalProps } from '@/types/ModalProps';

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div
        className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-100"
        style={{ animation: 'fadeIn 0.3s' }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
