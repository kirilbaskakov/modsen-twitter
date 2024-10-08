import { useCallback,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import countFollowers from '@/api/followers/countFollowers';
import countFollowing from '@/api/followers/countFollowing';
import ImageIcon from '@/assets/image-placeholder.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';

import EditModal from '../EditModal/EditModal';
import FollowButton from '../FollowButton/FollowButton';

const ProfileInfo = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const user = useUser();
  const currentUser = useCurrentUser();

  const getData = useCallback(async () => {
    if (!user) return;
    const followers = await countFollowers(user.id);
    const followings = await countFollowing(user.id);
    setFollowersCount(followers);
    setFollowingCount(followings);
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClose = () => setIsEditOpen(false);

  const onEditClicked = () => setIsEditOpen(isOpen => !isOpen);

  if (!user || !currentUser) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <img
          src={user?.photoUrl ?? ImageIcon}
          alt="Profile image"
          className="w-32 h-32 -mt-16 rounded-full object-cover"
        />
        {currentUser?.id === user?.id ? (
          <button className="outlined w-auto px-4" onClick={onEditClicked}>
            Edit profile
          </button>
        ) : (
          <FollowButton followingId={user.id} />
        )}
      </div>
      <div>
        <h2
          className={
            'text-2xl font-bold h-[1.25em] text-nowrap text-ellipsis overflow-hidden max-w-72 ' +
            cn({ loading: !user })
          }
          title={user?.name}
        >
          {user?.name}
        </h2>
        <div
          className={
            'text-sm text-gray-500 h-[1.25em] mt-1 ' + cn({ loading: !user })
          }
        >
          {user?.tg}
        </div>
        <div className={'mt-4 h-[1.25em] ' + cn({ loading: !user })}>
          {user?.status}
        </div>
      </div>
      <div className="flex gap-6 mt-8 text-lg">
        <Link to="following" className="hover:underline text-gray-400">
          <span className="font-bold text-black dark:text-gray-300">
            {followingCount}
          </span>{' '}
          <span className="text-gray-500">Following</span>
        </Link>
        <Link to="followers" className="hover:underline text-gray-400">
          <span className="font-bold text-black dark:text-gray-300">
            {followersCount}
          </span>{' '}
          <span className="text-gray-500">Followers</span>
        </Link>
      </div>
      {isEditOpen && <EditModal isOpen={isEditOpen} onClose={onClose} />}
    </div>
  );
};

export default ProfileInfo;
