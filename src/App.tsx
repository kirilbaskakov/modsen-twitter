import Router from './components/Router';
import { UserProvider } from './context/userContext';

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
