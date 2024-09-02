import { useEffect, useState } from 'react';

import LikeIcon from '@/assets/like.svg';
import LikeFilledIcon from '@/assets/like-filled.svg';
import { TweetType } from '@/types/TweetType';
import { UserType } from '@/types/UserType';
import getUserById from '@/api/getUserById';
import displayDate from '@/utils/displayDate';
import deleteTweet from '@/api/deleteTweet';
import cn from 'classnames';
import switchTweetLike from '@/api/switchTweetLike';

const Tweet = ({
  id,
  authorId,
  text,
  date,
  imageUrls,
  likes,
  isLiked
}: TweetType) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (authorId) {
      getUserById(authorId).then(setUser);
    }
  }, [authorId]);

  const onMenuClick = () => setMenuOpen(menuOpen => !menuOpen);

  const onDelete = () => {
    deleteTweet(id).then(() => window.location.reload());
  };

  const onLikeClick = () => {
    if (user) switchTweetLike(id, user.id).then(() => window.location.reload());
  };

  return (
    <div className="flex items-start gap-2">
      <img
        src={user?.photoUrl}
        alt={`${user?.name} profile image`}
        className="w-12 h-12 rounded-full mt-2 object-cover"
      />
      <div>
        <div className="flex gap-2 items-end">
          <p className="text-xl font-bold">{user?.name}</p>
          <p className="text-gray-500 text-lg">{user?.tg}</p>
          <p className="text-gray-500 text-lg font-bold">·</p>
          <p className="text-gray-500 text-lg">{displayDate(date)}</p>
          <div
            className="ml-auto text-2xl font-extrabold cursor-pointer tracking-wide select-none"
            onClick={onMenuClick}
          >
            ...
            {menuOpen && (
              <div className="bg-gray-50 absolute text-sm text-center font-normal shadow-sm shadow-black rounded-md border-2 border-gray-100">
                <div className="px-4 py-2">Edit</div>
                <div className="px-4 py-2 text-red-500" onClick={onDelete}>
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="mt-1 w-11/12 text-lg">{text}</p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {imageUrls?.map(url => <img src={url} />)}
        </div>
        <div className="flex gap-2 mt-3 cursor-pointer" onClick={onLikeClick}>
          <img src={isLiked ? LikeFilledIcon : LikeIcon} alt="like" />
          <span className={cn({ 'text-red-400': isLiked })}>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
