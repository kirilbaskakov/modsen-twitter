import CreateTweetForm from '@/components/CreateTweetForm/CreateTweetForm';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import TweetsList from '@/components/TweetsList/TweetsList';

const ProfilePage = () => {
  return (
    <>
      <ProfileHeader />
      <ProfileInfo />
      <CreateTweetForm />
      <TweetsList onlyUserTweets={true} />
    </>
  );
};

export default ProfilePage;
