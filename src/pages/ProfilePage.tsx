import { useParams } from 'react-router-dom';

import CreateTweetForm from '@/components/CreateTweetForm/CreateTweetForm';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import TweetsList from '@/components/TweetsList/TweetsList';
import { UserProvider } from '@/context/userContext';
import useCurrentUser from '@/hooks/useCurrentUser';

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();

  return (
    <UserProvider id={id}>
      <ProfileHeader />
      <ProfileInfo />
      {currentUser?.id === id && <CreateTweetForm />}
      <TweetsList onlyUserTweets={true} />
    </UserProvider>
  );
};

export default ProfilePage;
