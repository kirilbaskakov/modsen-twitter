import { useLocation, useParams } from 'react-router-dom';

import FollowHeader from '@/components/FollowHeader/FollowHeader';
import FollowList from '@/components/FollowList/FollowList';
import { UserProvider } from '@/context/userContext';

const FollowingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.split('/').at(-1) as
    | 'followings'
    | 'followers';
  return (
    <UserProvider id={id}>
      <FollowHeader type={type} />
      <FollowList type={type} />
    </UserProvider>
  );
};

export default FollowingPage;
