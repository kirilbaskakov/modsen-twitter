import cn from 'classnames';
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';

import Bookmarks from '@/assets/bookmarks.svg';
import Explore from '@/assets/explore.svg';
import Home from '@/assets/home.svg';
import HomeFilled from '@/assets/home-filled.svg';
import Lists from '@/assets/lists.svg';
import Messages from '@/assets/messages.svg';
import More from '@/assets/more.svg';
import Notifications from '@/assets/notification.svg';
import Profile from '@/assets/profile.svg';
import ProfileFilled from '@/assets/profile-filled.svg';
import TwitterLogo from '@/assets/twitter-logo.svg';
import { auth } from '@/firebase';

import UserInfo from '../UserInfo/UserInfo';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import getUser from '@/api/getUser';
import { UserType } from '@/types/UserType';

const links = [
  {
    title: 'Home',
    icon: Home,
    iconActive: HomeFilled,
    link: '/feed'
  },
  {
    title: 'Explore',
    icon: Explore,
    iconActive: Explore,
    link: '/'
  },
  {
    title: 'Notifications',
    icon: Notifications,
    iconActive: Notifications,
    link: '/'
  },
  {
    title: 'Messages',
    icon: Messages,
    iconActive: Messages,
    link: '/'
  },
  {
    title: 'Bookmarks',
    icon: Bookmarks,
    iconActive: Bookmarks,
    link: '/'
  },
  {
    title: 'Lists',
    icon: Lists,
    iconActive: Lists,
    link: '/'
  },
  {
    title: 'Profile',
    icon: Profile,
    iconActive: ProfileFilled,
    link: '/profile'
  },
  {
    title: 'More',
    icon: More,
    iconActive: ProfileFilled,
    link: '/'
  }
];
const Navbar = () => {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<UserType | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentUser) getUser(currentUser.uid).then(setUser);
  }, [currentUser]);

  const onLogoutClicked = () => {
    signOut(auth);
  };

  return (
    <div className="w-52">
      <img src={TwitterLogo} alt="Twitter logo" />
      <nav className="mt-6">
        {links.map(({ title, icon, link, iconActive }) => (
          <Link
            to={link}
            className="flex items-center gap-4 py-2 pr-2 rounded-md hover:bg-gray-100 cursor-pointer text-black"
          >
            <img src={pathname === link ? iconActive : icon} alt={title} />
            <span
              className={'text-lg ' + cn({ 'font-bold': pathname === link })}
            >
              {title}
            </span>
          </Link>
        ))}
      </nav>
      <button className="mt-2 mb-10">Tweet</button>
      <UserInfo userId={user?.id} showFollow={false} />
      <button className="mt-5 secondary" onClick={onLogoutClicked}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
