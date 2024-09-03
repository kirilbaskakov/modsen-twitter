import {
  QueryConstraint,
  collection,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore';

import { db } from '@/firebase';
import { TweetType } from '@/types/TweetType';

const getTweets = async (
  userId: string,
  onlyUserTweets: boolean
): Promise<Array<TweetType>> => {
  const tweetsRef = collection(db, 'tweets');

  const constraints: Array<QueryConstraint> = [orderBy('date', 'desc')];
  if (onlyUserTweets) {
    constraints.push(where('authorId', '==', userId));
  }
  const q = query(tweetsRef, ...constraints);
  const response = await getDocs(q);

  const tweets: Array<TweetType> = [];
  for (const doc of response.docs) {
    const tweetId = doc.id;
    const tweetData = doc.data();

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
    const likedByCurrentUser = !userLikeSnapshot.empty;

    tweets.push({
      ...(tweetData as Pick<TweetType, 'authorId' | 'imageUrls' | 'text'>),
      id: tweetId,
      likes: likesCount,
      isLiked: likedByCurrentUser,
      date: new Date(tweetData.date.seconds * 1000)
    });
  }

  return tweets;
};

export default getTweets;
