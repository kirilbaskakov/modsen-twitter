import CreateTweetForm from '@/components/CreateTweetForm/CreateTweetForm';
import ThemeButton from '@/components/ThemeButton/ThemeButton';
import TweetsList from '@/components/TweetsList/TweetsList';

const FeedPage = () => {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <ThemeButton />
      </div>
      <CreateTweetForm />
      <TweetsList />
    </>
  );
};

export default FeedPage;
