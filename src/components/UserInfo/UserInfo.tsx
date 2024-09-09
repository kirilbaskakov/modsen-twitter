import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getUserById from '@/api/users/getUserById';
import ImagePlaceholder from '@/assets/image-placeholder.svg';
import { UserType } from '@/types/UserType';

import FollowButton from '../FollowButton/FollowButton';

const UserInfo = ({
  userId,
  showFollow
}: {
  userId: string | undefined;
  showFollow: boolean;
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const getUserData = async (userId: string) => {
    setIsLoading(true);
    const user = await getUserById(userId);
    setUser(user);
    setIsLoading(false);
  };

  const onClick = () => {
    if (user) navigate(`/profile/${user.id}`);
  };

  useEffect(() => {
    if (userId) getUserData(userId);
  }, [userId]);

  return (
    <div
      className="flex gap-4 cursor-pointer items-center justify-start"
      onClick={onClick}
    >
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={user?.photoUrl ?? ImagePlaceholder}
      />
      <div className="overflow-hidden w-2/3">
        <div
          className={
            'overflow-hidden text-nowrap text-ellipsis h-[1.25em] max-w-32 sm:max-w-max' +
            cn({ loading: isLoading })
          }
          title={user?.name}
        >
          {user?.name}
        </div>
        <div
          className={
            'overflow-hidden mt-1 text-nowrap text-ellipsis text-gray-500 h-[1.25em] max-w-32 sm:max-w-max' +
            cn({ loading: isLoading })
          }
          title={user?.tg}
        >
          {user?.tg}
        </div>
      </div>
      {showFollow && <FollowButton followingId={user?.id} variant="small" />}
    </div>
  );
};

export default UserInfo;
