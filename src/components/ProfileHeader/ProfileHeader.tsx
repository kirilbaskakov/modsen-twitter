import cn from 'classnames';
import { useEffect, useState } from 'react';

import countTweets from '@/api/tweets/countTweets';
import Background from '@/assets/background.png';
import useUser from '@/hooks/useUser';

const ProfileHeader = () => {
  const [tweetsCount, setTweetsCount] = useState(0);
  const user = useUser();

  const getData = async () => {
    if (!user) return;
    const count = await countTweets(user.id);
    setTweetsCount(count);
  };
  useEffect(() => {
    getData();
  }, [user]);

  return (
    <div>
      <h3
        className={
          'font-bold text-lg h-[1.25em] max-w-72 text-nowrap text-ellipsis overflow-hidden' +
          cn({ loading: !user })
        }
        title={user?.name}
      >
        {user?.name}
      </h3>
      <p className="text-gray-500 text-sm mt-1">{tweetsCount} Tweets</p>
      <img
        src={Background}
        alt="Background image"
        className="w-full mt-2 aspect-[10/3]"
      />
    </div>
  );
};

export default ProfileHeader;
