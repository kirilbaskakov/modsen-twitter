import getUser from '@/api/getUser';
import getUserTweets from '@/api/getUserTweets';
import CreateTweetForm from '@/components/CreateTweetForm/CreateTweetForm';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import TweetsList from '@/components/TweetsList/TweetsList';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const [tweets, setTweets] = useState<Array<TweetType>>([]);

  useEffect(() => {
    if (currentUser)
      getUser(currentUser.uid)
        .then(user => getUserTweets(user.id))
        .then(setTweets);
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
