import { getTweets } from '@/api/tweets';
import Tweet from '@/components/Tweet/Tweet';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';
import { useEffect, useRef, useState } from 'react';

const TweetsList = ({
  onlyUserTweets = false
}: {
  onlyUserTweets?: boolean;
}) => {
  const currentUser = useCurrentUser();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);
  const ref = useRef(null);

  const getData = async () => {
    const tweets = await getTweets(currentUser!.id, onlyUserTweets);
    setTweets(tweets);
  };

  const onIntersect = () => {
    console.log(1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (currentUser) getData();
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {tweets.map((tweet, index) => (
        <div ref={index + 5 == tweets.length ? ref : null}>
          <Tweet key={tweet.id} {...tweet} />
        </div>
      ))}
    </div>
  );
};

export default TweetsList;
