import Tweet from '@/components/Tweet/Tweet';
import { TweetType } from '@/types/TweetType';

const TweetsList = ({ tweets }: { tweets: Array<TweetType> }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
};

export default TweetsList;
