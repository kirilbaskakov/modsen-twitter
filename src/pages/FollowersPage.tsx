import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getFollowers from '@/api/followers/getFollowers';
import getUser from '@/api/users/getUser';
import BackIcon from '@/assets/back.png';
import UserInfo from '@/components/UserInfo/UserInfo';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

const FollowersPage = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [followers, setFollowers] = useState<Array<string>>([]);
  const [user, setUser] = useState<UserType | null>(null);

  const getData = async (uid: string) => {
    const user = await getUser(uid);
    const followers = await getFollowers(user.id);
    setUser(user);
    setFollowers(followers);
  };

  useEffect(() => {
    if (currentUser) {
      getData(currentUser.uid);
    }
  }, [currentUser]);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex gap-6 items-center">
        <img
          className="cursor-pointer w-10 h-10"
          onClick={onBackClick}
          src={BackIcon}
        />
        <div>
          <h3 className="font-bold text-lg">{user?.name}</h3>
          <p className="text-gray-500 text-sm">{followers.length} Followers</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2 border-t-2 pt-2">
        <h1 className="text-xl font-bold">Followers</h1>
        {followers.map(follower => (
          <UserInfo userId={follower} showFollow={true} />
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
