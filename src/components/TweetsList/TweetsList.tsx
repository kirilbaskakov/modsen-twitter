import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getTweets } from '@/api/tweets';
import Tweet from '@/components/Tweet/Tweet';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import { TweetType } from '@/types/TweetType';

import Loader from '../Loader/Loader';

const TweetsList = ({
  onlyUserTweets = false
}: {
  onlyUserTweets?: boolean;
}) => {
  const currentUser = useCurrentUser();
  const user = useUser();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [last, setLast] = useState<QueryDocumentSnapshot | null | undefined>(
    null
  );
  const ref = useRef(null);

  const getData = useCallback(async () => {
    if (isLoading || !currentUser || last === undefined) {
      return;
    }
    setIsLoading(true);
    const [data, newLast] = await getTweets(
      currentUser!.id,
      last,
      10,
      onlyUserTweets ? user?.id : undefined
    );
    setLast(newLast);
    if (onlyUserTweets && last && last.data().authorId !== user?.id) {
      setTweets(data);
    } else {
      setTweets(tweets => [...tweets, ...data]);
    }
    setIsLoading(false);
  }, [isLoading, currentUser, onlyUserTweets, user, last]);

  useEffect(() => {
    setTweets([]);
    setLast(null);
  }, [user]);

  useEffect(() => {
    if (!currentUser || (onlyUserTweets && !user)) return;
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if (target.isIntersecting) {
        getData();
      }
    });
    const current = ref.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [currentUser, user, ref, onlyUserTweets, getData]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
      <div ref={ref} className="h-1" />
      {isLoading && <Loader />}
    </div>
  );
};

export default TweetsList;
