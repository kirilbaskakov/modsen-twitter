import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import countFollowers from '@/api/followers/countFollowers';
import countFollowing from '@/api/followers/countFollowing';
import ImageIcon from '@/assets/image-placeholder.svg';
import useCurrentUser from '@/hooks/useCurrentUser';

import EditModal from '../EditModal/EditModal';

const ProfileInfo = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const currentUser = useCurrentUser();

  const getData = async () => {
    const followers = await countFollowers(currentUser!.id);
    const followings = await countFollowing(currentUser!.id);
    setFollowersCount(followers);
    setFollowingCount(followings);
  };

  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, [currentUser]);

  const onClose = () => setIsEditOpen(false);

  const onEditClicked = () => setIsEditOpen(isOpen => !isOpen);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <img
            src={currentUser?.photoUrl ?? ImageIcon}
            alt="Profile image"
            className="w-32 h-32 -mt-16 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold">{currentUser?.name}</h2>
          <div className="text-sm text-gray-500 ">{currentUser?.tg}</div>
          <div className="mt-4">{currentUser?.status}</div>
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
