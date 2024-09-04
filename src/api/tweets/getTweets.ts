import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore';

import { db } from '@/firebase';
import { TweetType } from '@/types/TweetType';

const getTweets = async (
  userId: string,
  last: QueryDocumentSnapshot | null,
  tweetsLimit: number,
  onlyUserTweets: boolean
): Promise<[Array<TweetType>, QueryDocumentSnapshot]> => {
  const tweetsRef = collection(db, 'tweets');

  const constraints: Array<QueryConstraint> = [orderBy('date', 'desc')];
  if (onlyUserTweets) {
    constraints.push(where('authorId', '==', userId));
  }
  if (last) {
    constraints.push(startAfter(last));
  }
  constraints.push(limit(tweetsLimit));

  const q = query(tweetsRef, ...constraints);
  const response = await getDocs(q);
  const newLast = response.docs[response.docs.length - 1];

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
  return [tweets, newLast];
};

export default getTweets;
