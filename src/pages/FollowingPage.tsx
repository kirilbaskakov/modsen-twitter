import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getFollowings from '@/api/followers/getFollowings';
import BackIcon from '@/assets/back.png';
import UserInfo from '@/components/UserInfo/UserInfo';
import useCurrentUser from '@/hooks/useCurrentUser';

const FollowingPage = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [followings, setFollowings] = useState<Array<string>>([]);

  const getData = async () => {
    const followings = await getFollowings(currentUser!.id);
    setFollowings(followings);
  };

  useEffect(() => {
    if (currentUser) {
      getData();
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
          <h3 className="font-bold text-lg">{currentUser?.name}</h3>
          <p className="text-gray-500 text-sm">
            {followings.length} Followings
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-2 border-t-2 pt-2">
        <h1 className="text-xl font-bold">Followings</h1>
        {followings.map(follower => (
          <UserInfo userId={follower} showFollow={true} />
        ))}
      </div>
    </div>
  );
};

export default FollowingPage;
