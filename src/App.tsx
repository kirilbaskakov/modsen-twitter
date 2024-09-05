import Router from './components/Router';
import { CurrentUserProvider } from './context/currentUserContext';

const App = () => {
  return (
    <CurrentUserProvider>
      <Router />
    </CurrentUserProvider>
  );
};

export default App;
