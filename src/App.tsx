import { useEffect } from 'react';

import Router from './components/Router';
import { AlertProvider } from './context/alertContext';
import { CurrentUserProvider } from './context/currentUserContext';

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (!theme) return;
    document.documentElement.classList.toggle(
      'dark',
      JSON.parse(theme) === 'dark'
    );
  }, []);

  return (
    <AlertProvider>
      <CurrentUserProvider>
        <Router />
      </CurrentUserProvider>
    </AlertProvider>
  );
};

export default App;
