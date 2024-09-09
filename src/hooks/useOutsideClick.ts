import { useCallback, useEffect, useRef, useState } from 'react';

const useOutsideClick = (initialValue: boolean) => {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (isActive && ref.current && !ref.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    },
    [ref, isActive]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return { ref, isActive, setIsActive };
};

export default useOutsideClick;
