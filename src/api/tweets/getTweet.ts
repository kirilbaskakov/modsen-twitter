import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';

import { db } from '@/firebase';
import { TweetType } from '@/types/TweetType';

const getTweet = async (
  id: string,
  userId: string
): Promise<TweetType | undefined> => {
  const tweetsRef = doc(db, 'tweets', id);
  const response = await getDoc(tweetsRef);

  const tweetId = response.id;
  const tweetData = response.data();

  if (!tweetData) {
    return undefined;
  }

  const likesRef = collection(db, 'likes');
  const likesQuery = query(likesRef, where('tweetId', '==', tweetId));
  const likesCountSnapshot = await getCountFromServer(likesQuery);
  const likesCount = likesCountSnapshot.data().count;

  const userLikeQuery = query(
    likesRef,
    where('tweetId', '==', tweetId),
    where('userId', '==', userId)
  );
  const userLikeSnapshot = await getDocs(userLikeQuery);
  console.log(userLikeSnapshot.docs);
  const likedByCurrentUser = !userLikeSnapshot.empty;

  return {
    ...(tweetData as Pick<TweetType, 'authorId' | 'imageUrls' | 'text'>),
    id: tweetId,
    likes: likesCount,
    isLiked: likedByCurrentUser,
    date: new Date(tweetData.date.seconds * 1000)
  };
};

export default getTweet;
