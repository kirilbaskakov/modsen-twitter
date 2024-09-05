import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex max-w-screen-2xl mx-auto mt-6 items-start gap-6 px-8">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      {pathname !== '/search' && <Search />}
    </div>
  );
};

export default Layout;
