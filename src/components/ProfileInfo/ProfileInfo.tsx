import { useEffect, useState } from 'react';

import getUser from '@/api/getUser';
import ImageIcon from '@/assets/image-placeholder.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

import EditModal from '../EditModal/EditModal';

const ProfileInfo = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then(setUser);
    }
  }, [currentUser]);

  const onClose = () => setIsEditOpen(false);

  const onEditClicked = () => setIsEditOpen(isOpen => !isOpen);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <img
            src={user?.photoUrl ?? ImageIcon}
            alt="Profile image"
            className="w-32 h-32 -mt-16 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <div className="text-sm text-gray-500 ">{user?.tg}</div>
          <div className="mt-4">{user?.status}</div>
        </div>
        <button className="outlined w-auto px-4" onClick={onEditClicked}>
          Edit profile
        </button>
      </div>
      <div className="flex gap-6 mt-8 text-lg">
        <div>
          <span className="font-bold">67</span>{' '}
          <span className="text-gray-500">Following</span>
        </div>
        <div>
          <span className="font-bold">47</span>{' '}
          <span className="text-gray-500">Followers</span>
        </div>
      </div>
      {isEditOpen && <EditModal isOpen={isEditOpen} onClose={onClose} />}
    </div>
  );
};

export default ProfileInfo;
