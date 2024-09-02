import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import countFollowers from '@/api/followers/countFollowers';
import countFollowing from '@/api/followers/countFollowing';
import getUser from '@/api/users/getUser';
import ImageIcon from '@/assets/image-placeholder.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

import EditModal from '../EditModal/EditModal';

const ProfileInfo = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const currentUser = useCurrentUser();

  const getData = async (uid: string) => {
    const user = await getUser(uid);
    const followers = await countFollowers(user.id);
    const followings = await countFollowing(user.id);
    setUser(user);
    setFollowersCount(followers);
    setFollowingCount(followings);
  };

  useEffect(() => {
    if (currentUser) {
      getData(currentUser.uid);
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
        <Link to="following" className="hover:underline text-gray-400">
          <span className="font-bold text-black">{followingCount}</span>{' '}
          <span className="text-gray-500">Following</span>
        </Link>
        <Link to="followers" className="hover:underline text-gray-400">
          <span className="font-bold text-black">{followersCount}</span>{' '}
          <span className="text-gray-500">Followers</span>
        </Link>
      </div>
      {isEditOpen && <EditModal isOpen={isEditOpen} onClose={onClose} />}
    </div>
  );
};

export default ProfileInfo;
