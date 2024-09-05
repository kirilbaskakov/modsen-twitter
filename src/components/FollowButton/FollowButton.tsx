import cn from 'classnames';
import { useEffect, useState } from 'react';

import checkFollow from '@/api/followers/checkFollow';
import switchFollow from '@/api/followers/switchFollow';
import useCurrentUser from '@/hooks/useCurrentUser';

const FollowButton = ({ followingId }: { followingId: string | undefined }) => {
  const currentUser = useCurrentUser();
  const [isFollowed, setIsFollowed] = useState(false);

  const getData = async () => {
    setIsFollowed(await checkFollow(currentUser!.id, followingId!));
  };

  useEffect(() => {
    if (currentUser && followingId) {
      getData();
    }
  }, [currentUser, followingId]);

  const onClick = () => {
    setIsFollowed(isFollowed => !isFollowed);
    if (currentUser && followingId) switchFollow(currentUser.id, followingId);
  };

  return (
    <button
      onClick={onClick}
      className={
        'ml-auto w-32 text-lg py-2 align-self-center ' +
        cn({ outlined: isFollowed })
      }
    >
      {isFollowed ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
