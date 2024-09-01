import ImageIcon from '@/assets/image-placeholder.svg';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import Tweet from '@/components/Tweet/Tweet';

const ProfilePage = () => {
  return (
    <>
      <ProfileHeader />
      <ProfileInfo />
      <Tweet
        img={ImageIcon}
        name="Bobur"
        username="@bobur_mavlonov"
        date={new Date(Date.UTC(2024, 6, 12))}
        text={
          "4-kursni tugatgunimcha kamida bitta biznesim bo'lishini, uylanish uchun moddiy jihatdan to'la-to'kis tayyor bo'lishni, sog'lik va jismoniy holatni normallashtirishni reja qildim"
        }
        likes={8}
      />
    </>
  );
};

export default ProfilePage;
