import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import deleteTweet from '@/api/tweets/deleteTweet';
import switchTweetLike from '@/api/tweets/switchTweetLike';
import getUserById from '@/api/users/getUserById';
import LikeIcon from '@/assets/like.svg';
import LikeFilledIcon from '@/assets/like-filled.svg';
import { TweetType } from '@/types/TweetType';
import { UserType } from '@/types/UserType';
import displayDate from '@/utils/displayDate';

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
  const [liked, setLiked] = useState(isLiked);
  const getUserData = async (authorId: string) => {
    const user = await getUserById(authorId);
    setUser(user);
  };

  useEffect(() => {
    if (authorId) {
      getUserData(authorId);
    }
  }, [authorId]);

  const onMenuClick = () => setMenuOpen(menuOpen => !menuOpen);

  const onDelete = async () => {
    await deleteTweet(id);
    window.location.reload();
  };

  const onLikeClick = async () => {
    if (!user) return;
    setLiked(liked => !liked);
    await switchTweetLike(id, user.id);
  };

  return (
    <div className="flex items-start gap-2 overflow-hidden">
      <img
        src={user?.photoUrl}
        alt={`${user?.name} profile image`}
        className="w-12 h-12 rounded-full mt-2 object-cover"
      />
      <div className="w-full">
        <div className="flex gap-2 items-end">
          <Link
            className="text-xl font-bold text-black"
            to={`/profile/${user?.id}`}
          >
            {user?.name}
          </Link>
          <Link className="text-gray-500 text-lg" to={`/profile/${user?.id}`}>
            {user?.tg}
          </Link>
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
        <p className="mt-1 w-11/12 text-lg text-wrap whitespace-pre-line break-words break-all">
          {text}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {imageUrls?.map(url => <img src={url} />)}
        </div>
        <div className="flex gap-2 mt-3 cursor-pointer" onClick={onLikeClick}>
          <img src={liked ? LikeFilledIcon : LikeIcon} alt="like" />
          <span className={cn({ 'text-red-400': liked })}>
            {likes + (liked ? 1 : 0) - (isLiked ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
