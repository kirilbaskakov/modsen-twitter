import { auth } from '@/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import ImagePlaceholder from '@/assets/image-placeholder.svg';

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (newUser: User | null) => {
    console.log(newUser);
    if (!user) setUser(newUser);
  });

  return (
    <div className="flex gap-4">
      <img
        className="w-12 h-12 rounded-full"
        src={user?.photoURL ? user.photoURL : ImagePlaceholder}
      />
      <div className="overflow-hidden">
        <div className="overflow-hidden text-nowrap text-ellipsis">
          {user?.displayName}
        </div>
        <div className="overflow-hidden text-nowrap text-ellipsis">
          {user?.email}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
