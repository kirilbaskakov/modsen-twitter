import { useParams } from 'react-router-dom';

import FollowHeader from '@/components/FollowHeader/FollowHeader';
import FollowList from '@/components/FollowList/FollowList';
import { UserProvider } from '@/context/userContext';

const FollowingPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <UserProvider id={id}>
      <FollowHeader type={'followers'} />
      <FollowList type={'followers'} />
    </UserProvider>
  );
};

export default FollowingPage;
