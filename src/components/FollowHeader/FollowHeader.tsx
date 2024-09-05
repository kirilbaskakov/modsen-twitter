import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { countFollowers, countFollowing } from '@/api/followers';
import BackIcon from '@/assets/back.png';
import useUser from '@/hooks/useUser';

const FollowHeader = ({ type }: { type: 'followings' | 'followers' }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const user = useUser();

  const getCount = async () => {
    if (!user) return;
    const newCount = await (type == 'followers'
      ? countFollowers(user.id)
      : countFollowing(user.id));
    setCount(newCount);
  };

  useEffect(() => {
    getCount();
  }, [user, type]);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex gap-6 items-center">
      <img
        className="cursor-pointer w-10 h-10"
        onClick={onBackClick}
        src={BackIcon}
      />
      <div>
        <h3 className="font-bold text-lg">{user?.name}</h3>
        <p className="text-gray-500 text-sm">
          {count} {type == 'followers' ? 'Followers' : 'Followings'}
        </p>
      </div>
    </div>
  );
};

export default FollowHeader;
