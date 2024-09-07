import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';
import Header from '../Header/Header';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="md:hidden">
        <Header />
      </div>
      <div className="flex max-w-screen-2xl mx-auto mt-6 items-start gap-6 px-8">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
        {pathname !== '/search' && (
          <div className="w-96 hidden lg:block">
            <Search />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
