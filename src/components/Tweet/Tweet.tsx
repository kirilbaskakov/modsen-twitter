import { useState } from 'react';

import LikeIcon from '@/assets/like.svg';

interface TweetProps {
  img: string;
  name: string;
  username: string;
  date: Date;
  text: string;
  likes: number;
}

const Tweet = ({ img, name, username, date, text, likes }: TweetProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onMenuClick = () => setMenuOpen(menuOpen => !menuOpen);

  return (
    <div className="flex items-start gap-2">
      <img
        src={img}
        alt={`${name} profile image`}
        className="w-12 h-12 rounded-full mt-2"
      />
      <div>
        <div className="flex gap-2 items-end">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-gray-500 text-lg">{username}</p>
          <p className="text-gray-500 text-lg font-bold">·</p>
          <p className="text-gray-500 text-lg">{date.toLocaleDateString()}</p>
          <div
            className="ml-auto text-2xl font-extrabold cursor-pointer tracking-wide select-none"
            onClick={onMenuClick}
          >
            ...
            {menuOpen && (
              <div className="bg-gray-50 absolute text-sm text-center font-normal">
                <div className="px-4 py-2">Edit</div>
                <div className="px-4 py-2 text-red-500">Delete</div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-1">{text}</p>
        <div className="flex gap-2 mt-3 cursor-pointer">
          <img src={LikeIcon} alt="like" />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
