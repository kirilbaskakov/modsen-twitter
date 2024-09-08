import { useEffect } from 'react';
import Router from './components/Router';
import { ConfirmProvider } from './context/confirmContext';
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
    <ConfirmProvider>
      <CurrentUserProvider>
        <Router />
      </CurrentUserProvider>
    </ConfirmProvider>
  );
};

export default App;
