import cn from 'classnames';
import { useEffect } from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';

const ThemeButton = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  const onClick = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
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
            'translate-x-[calc(50%+2px)]': theme === 'dark',
            'translate-x-0]': theme === 'light'
          })
        }
      />
    </div>
  );
};

export default ThemeButton;
