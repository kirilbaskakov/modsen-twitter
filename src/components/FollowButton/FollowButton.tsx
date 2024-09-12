import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import cn from 'classnames';

import checkFollow from '@/api/followers/checkFollow';
import switchFollow from '@/api/followers/switchFollow';
import useCurrentUser from '@/hooks/useCurrentUser';

const FollowButton = ({
  followingId,
  variant = 'large'
}: {
  followingId: string | undefined;
  variant?: 'large' | 'small';
}) => {
  const currentUser = useCurrentUser();
  const [isFollowed, setIsFollowed] = useState(false);

  const getData = useCallback(async () => {
    if (!currentUser) return;
    setIsFollowed(await checkFollow(currentUser.id, followingId!));
  }, [currentUser, followingId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    setIsFollowed(isFollowed => !isFollowed);
    if (currentUser && followingId) switchFollow(currentUser.id, followingId);
  };

  return (
    <button
      onClick={onClick}
      className={
        'ml-auto w-32 align-self-center ' +
        cn({ outlined: isFollowed, 'w-24 py-1': variant === 'small' })
      }
      disabled={currentUser?.id === followingId}
    >
      {isFollowed ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
