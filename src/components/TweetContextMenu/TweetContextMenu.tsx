import { deleteTweet } from '@/api/tweets';
import useConfirm from '@/hooks/useConfirm';
import useCurrentUser from '@/hooks/useCurrentUser';
import useOutsideClick from '@/hooks/useOutsideClick';

const TweetContextMenu = ({
  authorId,
  tweetId
}: {
  authorId: string;
  tweetId: string;
}) => {
  const { showConfirm } = useConfirm();
  const currentUser = useCurrentUser();
  const { isActive, setIsActive, ref } = useOutsideClick(false);

  const onMenuClick = () => {
    setIsActive(isActive => !isActive);
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(
      window.location.origin + '/tweets/' + tweetId
    );
  };

  const onDelete = async () => {
    showConfirm('Are you sure you want to delete this tweet?', async () => {
      await deleteTweet(tweetId);
      window.location.reload();
    });
  };

  return (
    <div
      className="relative  cursor-pointer tracking-wide overflow-visible"
      ref={ref}
      onClick={onMenuClick}
    >
      <span className="text-2xl leading-3 font-extrabold select-none ">
        ...
      </span>
      {isActive && (
        <div className="bg-gray-50 dark:bg-gray-900 absolute right-0 top-0 text-sm text-center font-normal shadow-sm shadow-black rounded-md border-2 border-gray-100 dark:border-gray-800 text-nowrap">
          <div className="px-4 py-2" onClick={onCopyClick}>
            Copy link
          </div>
          {currentUser?.id === authorId && (
            <div className="px-4 py-2 text-red-500" onClick={onDelete}>
              Delete
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TweetContextMenu;
