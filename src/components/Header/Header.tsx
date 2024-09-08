import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  const onOverlayClick = () => {
    setIsOpen(false);
  };

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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="pt-3 px-4">
      <div
        onClick={onClick}
        className="w-10 h-8 flex flex-col justify-between cursor-pointer"
      >
        <div className="h-1 bg-gray-400" />
        <div className="h-1 bg-gray-400" />
        <div className="h-1 bg-gray-400" />
      </div>
      <div
        className={`pt-4 px-4 fixed left-0 top-0 bg-white h-screen z-30 transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Navbar />
      </div>
      {isOpen && (
        <div
          className="h-screen w-screen fixed top-0 left-0 bg-black opacity-20 z-20"
          onClick={onOverlayClick}
        />
      )}
    </header>
  );
};

export default Header;
