import { useEffect, useState } from 'react';

import getUser from '@/api/getUser';
import Background from '@/assets/background.png';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

const ProfileHeader = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then(setUser);
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
