import { useEffect } from 'react';

import { ModalProps } from '@/types/ModalProps';
import { createPortal } from 'react-dom';

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

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div
        className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 scale-100 p-4"
        style={{ animation: 'fadeIn 0.3s' }}
      >
        <div className="p-4">{children}</div>
        <button
          className="absolute top-2 right-2 rounded-full w-7 h-7 flex items-center justify-center bg-black opacity-80 text-white font-bold"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
