import { useEffect } from 'react';

import cn from 'classnames';

import useLocalStorage from '@/hooks/useLocalStorage';
import { ThemeTypes } from '@/types/ThemeTypes';

const ThemeButton = () => {
  const [theme, setTheme] = useLocalStorage<ThemeTypes>(
    'theme',
    ThemeTypes.LIGHT
  );

  const onClick = () => {
    setTheme(theme =>
      theme === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === ThemeTypes.DARK
    );
  }, [theme]);

  return (
    <div
      className="relative w-12 h-7 rounded-3xl border-2 border-gray-400 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={
          'absolute top-[-2px] w-7 h-7 rounded-full border-2 border-gray-400 transition-transform duration-300 ease-in-out ' +
          cn({
            'translate-x-[calc(50%+2px)]': theme === ThemeTypes.DARK,
            'translate-x-0]': theme === ThemeTypes.LIGHT
          })
        }
      />
    </div>
  );
};

export default ThemeButton;
