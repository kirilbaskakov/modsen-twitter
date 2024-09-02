import { useEffect, useState } from 'react';

import getUser from '@/api/users/getUser';
import Background from '@/assets/background.png';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

const ProfileHeader = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const currentUser = useCurrentUser();

  const getUserData = async (uid: string) => {
    const user = await getUser(uid);
    setUser(user);
  };

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <div>
      <h3 className="font-bold text-lg">{user?.name}</h3>
      <p className="text-gray-500 text-sm">1,070 Tweets</p>
      <img src={Background} alt="Background image" className="w-full mt-2" />
    </div>
  );
};

export default ProfileHeader;
