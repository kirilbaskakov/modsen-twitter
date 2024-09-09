import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import getTweet from '@/api/tweets/getTweet';
import BackIcon from '@/assets/back.png';
import Tweet from '@/components/Tweet/Tweet';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';

const TweetPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [tweet, setTweet] = useState<TweetType | null>(null);

  const getData = useCallback(async () => {
    if (!id || !currentUser) return;
    const newTweet = await getTweet(id, currentUser.id);
    if (newTweet) {
      setTweet(newTweet);
    }
  }, [currentUser, id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex gap-6 items-center ">
        <img
          className="cursor-pointer w-10 h-10 dark:invert"
          onClick={onBackClick}
          src={BackIcon}
        />
        <div>
          <h3 className="font-bold text-2xl">Tweet</h3>
        </div>
      </div>
      <div className="mt-2 border-t-2 py-2">
        {tweet && <Tweet {...tweet} />}
      </div>
    </>
  );
};

export default TweetPage;
