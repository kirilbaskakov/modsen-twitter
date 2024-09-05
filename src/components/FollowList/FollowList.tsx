import { useEffect, useState } from 'react';

import { getFollowers, getFollowings } from '@/api/followers';
import useUser from '@/hooks/useUser';

import UserInfo from '../UserInfo/UserInfo';

const FollowList = ({ type }: { type: 'followings' | 'followers' }) => {
  const user = useUser();
  const [usersIds, setUsersIds] = useState<Array<string>>([]);

  const getData = async () => {
    if (!user) {
      return;
    }
    const newUsersIds = await (type == 'followers'
      ? getFollowers(user.id)
      : getFollowings(user.id));
    setUsersIds(newUsersIds);
  };

  useEffect(() => {
    getData();
  }, [user, type]);

  return (
    <div className="flex flex-col gap-4 mt-2 border-t-2 pt-2">
      <h1 className="text-xl font-bold">Followers</h1>
      {usersIds.map(userId => (
        <UserInfo userId={userId} showFollow={true} />
      ))}
    </div>
  );
};

export default FollowList;
