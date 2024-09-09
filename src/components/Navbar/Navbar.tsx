import cn from 'classnames';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ImagePlaceholder from '@/assets/image-placeholder.svg';
import Logout from '@/assets/logout.png';
import TwitterLogo from '@/assets/twitter-logo.svg';
import links from '@/constants/links';
import { auth } from '@/firebase';
import useAlert from '@/hooks/useAlert';
import useCurrentUser from '@/hooks/useCurrentUser';

import CreateTweetModal from '../CreateTweetModal/CreateTweetModal';
import UserInfo from '../UserInfo/UserInfo';

const Navbar = () => {
  const { showConfirm } = useAlert();
  const currentUser = useCurrentUser();
  const { pathname } = useLocation();
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);

  const onLogoutClicked = () => {
    showConfirm('Are you sure you want to log out of your account?', () => {
      signOut(auth);
    });
  };

  const onTweetClicked = () => {
    setIsTweetModalOpen(true);
  };

  const onTweetModalClose = () => {
    setIsTweetModalOpen(false);
  };

  return (
    <div className="w-52 md:w-auto xl:w-52">
      <img src={TwitterLogo} alt="Twitter logo" className="w-10 h-10" />
      <nav className="mt-6 md:flex md:flex-col md:items-center xl:block">
        {links(currentUser?.id).map(({ title, icon, link, iconActive }) => (
          <Link
            to={link}
            className="flex items-center gap-4 py-2 xl:pr-2 rounded-md hover:bg-gray-100 cursor-pointer text-black dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <img
              src={pathname === link ? iconActive : icon}
              alt={title}
              className="dark:filter dark:invert aspect-square"
            />
            <span
              className={
                'text-lg block md:hidden xl:block ' +
                cn({ 'font-bold': pathname === link })
              }
            >
              {title}
            </span>
          </Link>
        ))}
      </nav>
      <button className="mt-2 mb-10" onClick={onTweetClicked}>
        <span className="md:hidden xl:inline">Tweet</span>
        <span className="hidden md:inline xl:hidden text-2xl">+</span>
      </button>
      <div className="md:hidden xl:block">
        <UserInfo userId={currentUser?.id} showFollow={false} />
      </div>
      <img
        className="w-12 h-12 rounded-full object-cover hidden md:block xl:hidden"
        src={currentUser?.photoUrl ?? ImagePlaceholder}
        title={currentUser?.name}
      />
      <button className="mt-5 secondary" onClick={onLogoutClicked}>
        <span className="md:hidden xl:inline">Log out</span>
        <img
          className="hidden md:block xl:hidden w-8 h-8 mx-auto"
          src={Logout}
          alt="Log out"
          title="Log out"
        />
      </button>
      {isTweetModalOpen && (
        <CreateTweetModal
          isOpen={isTweetModalOpen}
          onClose={onTweetModalClose}
        />
      )}
    </div>
  );
};

export default Navbar;
