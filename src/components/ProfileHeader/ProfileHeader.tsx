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
      <h3 className="font-bold text-lg">{user?.name}</h3>
      <p className="text-gray-500 text-sm">{tweetsCount} Tweets</p>
      <img src={Background} alt="Background image" className="w-full mt-2" />
    </div>
  );
};

export default ProfileHeader;
