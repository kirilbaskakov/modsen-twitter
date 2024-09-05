import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getTweets } from '@/api/tweets';
import Tweet from '@/components/Tweet/Tweet';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';

const TweetsList = ({
  onlyUserTweets = false
}: {
  onlyUserTweets?: boolean;
}) => {
  const currentUser = useCurrentUser();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [last, setLast] = useState<QueryDocumentSnapshot | null | undefined>(
    null
  );
  const ref = useRef(null);

  const getData = useCallback(async () => {
    console.log('intersect');
    if (isLoading || !currentUser || last === undefined) {
      return;
    }
    console.log('getting data');
    setIsLoading(true);
    const [data, newLast] = await getTweets(
      currentUser!.id,
      last,
      10,
      onlyUserTweets
    );
    setLast(newLast);
    setTweets(tweets => [...tweets, ...data]);
    setIsLoading(false);
  }, [isLoading, currentUser, onlyUserTweets, last]);

  useEffect(() => {
    if (!currentUser) return;
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if (target.isIntersecting) {
        getData();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [currentUser, ref, getData]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
      <div ref={ref} className="h-1" />
    </div>
  );
};

export default TweetsList;
