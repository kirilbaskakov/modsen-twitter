import Background from '@/assets/background.png';
import useUser from '@/hooks/useUser';

const ProfileHeader = () => {
  const user = useUser();

  return (
    <div>
      <h3 className="font-bold text-lg">{user?.name}</h3>
      <p className="text-gray-500 text-sm">1,070 Tweets</p>
      <img src={Background} alt="Background image" className="w-full mt-2" />
    </div>
  );
};

export default ProfileHeader;
