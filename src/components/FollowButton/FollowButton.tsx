import checkFollow from '@/api/checkFollow';
import getUser from '@/api/getUser';
import switchFollow from '@/api/switchFollow';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';
import cn from 'classnames';
import { useEffect, useState } from 'react';

const FollowButton = ({ followingId }: { followingId: string | undefined }) => {
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<UserType | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);

  const getData = async (uid: string) => {
    const user = await getUser(uid);
    setUser(user);
    console.log(user.id, followingId);
    setIsFollowed(await checkFollow(user.id, followingId!));
  };

  useEffect(() => {
    if (currentUser && followingId) {
      getData(currentUser.uid);
    }
  }, [currentUser, followingId]);

  console.log(isFollowed);

  const onClick = () => {
    setIsFollowed(isFollowed => !isFollowed);
    if (user && followingId) switchFollow(user.id, followingId);
  };

  return (
    <button
      onClick={onClick}
      className={
        'ml-auto w-32 text-sm py-0 align-self-center ' +
        cn({ outlined: isFollowed })
      }
    >
      {isFollowed ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
