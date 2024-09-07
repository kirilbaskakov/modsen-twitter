import Router from './components/Router';
import { ConfirmProvider } from './context/confirmContext';
import { CurrentUserProvider } from './context/currentUserContext';

const App = () => {
  return (
    <ConfirmProvider>
      <CurrentUserProvider>
        <Router />
      </CurrentUserProvider>
    </ConfirmProvider>
  );
};

export default App;
