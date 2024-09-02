import { useEffect, useState } from 'react';

import ImagePlaceholder from '@/assets/image-placeholder.svg';
import { UserType } from '@/types/UserType';
import getUserById from '@/api/getUserById';
import FollowButton from '../FollowButton/FollowButton';

const UserInfo = ({
  userId,
  showFollow
}: {
  userId: string | undefined;
  showFollow: boolean;
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (userId) getUserById(userId).then(setUser);
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
