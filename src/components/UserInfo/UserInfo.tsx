import { useEffect, useState } from 'react';

import getUser from '@/api/getUser';
import ImagePlaceholder from '@/assets/image-placeholder.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

const UserInfo = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then(setUser);
    }
  }, [currentUser]);

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
    </div>
  );
};

export default UserInfo;
