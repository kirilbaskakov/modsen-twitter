import { useEffect, useState } from 'react';

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
  const [user, setUser] = useState<UserType | null>(null);

  const getUserData = async (userId: string) => {
    const user = await getUserById(userId);
    setUser(user);
  };

  useEffect(() => {
    if (userId) getUserData(userId);
  }, [userId]);

  return (
    <div className="flex gap-4">
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={user?.photoUrl ?? ImagePlaceholder}
      />
      <div className="overflow-hidden">
        <div className="overflow-hidden text-nowrap text-ellipsis ">
          {user?.name}
        </div>
        <div className="overflow-hidden text-nowrap text-ellipsis text-gray-500">
          {user?.tg}
        </div>
      </div>
      {showFollow && <FollowButton followingId={user?.id} />}
    </div>
  );
};

export default UserInfo;
