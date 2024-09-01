import cn from 'classnames';
import { useEffect } from 'react';

interface AlertProps {
  onClose: () => void;
  text: string;
  type: 'error' | 'success';
}

const Alert = ({ onClose, text, type }: AlertProps) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, [onClose]);

  return (
    <div
      className={
        'fixed top-6 left-1/2 -translate-x-1/2 rounded-lg px-6 py-1 opacity-60 font-semibold text-lg ' +
        cn({
          'bg-green-200 text-green-900': type == 'success',
          'bg-red-200 text-red-900': type == 'error'
        })
      }
    >
      {text}
    </div>
  );
};

export default Alert;
