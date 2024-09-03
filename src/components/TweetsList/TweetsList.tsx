import { getTweets } from '@/api/tweets';
import Tweet from '@/components/Tweet/Tweet';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';
import { useEffect, useState } from 'react';

const TweetsList = ({
  onlyUserTweets = false
}: {
  onlyUserTweets?: boolean;
}) => {
  const currentUser = useCurrentUser();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);

  const getData = async () => {
    const tweets = await getTweets(currentUser!.id, onlyUserTweets);
    setTweets(tweets);
  };

  useEffect(() => {
    if (currentUser) getData();
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
};

export default TweetsList;
