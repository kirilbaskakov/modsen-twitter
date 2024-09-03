import { useEffect, useState } from 'react';

import getUserTweets from '@/api/tweets/getUserTweets';
import CreateTweetForm from '@/components/CreateTweetForm/CreateTweetForm';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import TweetsList from '@/components/TweetsList/TweetsList';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);

  const getData = async () => {
    const tweets = await getUserTweets(currentUser!.id);
    setTweets(tweets);
  };

  useEffect(() => {
    if (currentUser) getData();
  }, [currentUser]);

  return (
    <>
      <ProfileHeader />
      <ProfileInfo />
      <CreateTweetForm />
      <TweetsList tweets={tweets} />
    </>
  );
};

export default ProfilePage;
