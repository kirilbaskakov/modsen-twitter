import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import switchTweetLike from '@/api/tweets/switchTweetLike';
import getUserById from '@/api/users/getUserById';
import ImagePlaceholder from '@/assets/image-placeholder.svg';
import LikeIcon from '@/assets/like.svg';
import LikeFilledIcon from '@/assets/like-filled.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { TweetType } from '@/types/TweetType';
import { UserType } from '@/types/UserType';
import displayDate from '@/utils/displayDate';

import TweetContextMenu from '../TweetContextMenu/TweetContextMenu';

const Tweet = ({
  id,
  authorId,
  text,
  date,
  imageUrls,
  likes,
  isLiked
}: TweetType) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [user, setUser] = useState<UserType | null>(null);
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

  const onLikeClick = async () => {
    if (!currentUser) return;
    setLiked(liked => !liked);
    await switchTweetLike(id, currentUser.id);
  };

  const onTextClick = () => {
    navigate(`/tweets/${id}`);
  };
  return (
    <div className="flex items-start gap-2 overflow-hidden">
      <img
        src={user?.photoUrl ?? ImagePlaceholder}
        alt={`${user?.name} profile image`}
        className="w-12 h-12 rounded-full mt-2 object-cover"
      />
      <div className="w-full">
        <div className="flex gap-2 items-end flex-wrap relative">
          <Link
            className="text-xl font-bold text-black dark:text-gray-300 max-w-60 overflow-hidden text-ellipsis"
            to={`/profile/${user?.id}`}
            title={user?.name}
          >
            {user?.name}
          </Link>
          <Link
            className="text-gray-500 text-lg max-w-60 overflow-hidden text-ellipsis"
            to={`/profile/${user?.id}`}
            title={user?.tg}
          >
            {user?.tg}
          </Link>
          <p className="text-gray-500 text-lg font-bold">·</p>
          <p className="text-gray-500 text-lg">{displayDate(date)}</p>
          <div className="absolute right-0 top-0">
            <TweetContextMenu authorId={authorId} tweetId={id} />
          </div>
        </div>
        <p
          className="mt-1 w-11/12 text-lg text-wrap whitespace-pre-line break-words break-all cursor-pointer"
          onClick={onTextClick}
        >
          {text}
        </p>
        <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-2">
          {imageUrls?.map(url => <img src={url} />)}
        </div>
        <div
          className="flex gap-2 mt-3 cursor-pointer max-w-min "
          onClick={onLikeClick}
        >
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
