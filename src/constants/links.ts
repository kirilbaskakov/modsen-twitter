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

const links = (userId: string | undefined) => [
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
    link: '/search'
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
    link: `/profile/${userId}`
  },
  {
    title: 'More',
    icon: More,
    iconActive: ProfileFilled,
    link: '/'
  }
];

export default links;
