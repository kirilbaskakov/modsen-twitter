import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where
} from 'firebase/firestore';

import { db } from '@/firebase';

const switchTweetLike = async (tweetId: string, userId: string) => {
  const likesRef = collection(db, 'likes');
  const q = query(
    likesRef,
    where('tweetId', '==', tweetId),
    where('userId', '==', userId)
  );

  await runTransaction(db, async transaction => {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const newLikeRef = doc(likesRef);
      transaction.set(newLikeRef, {
        tweetId: tweetId,
        userId: userId,
        createdAt: new Date()
      });
    } else {
      querySnapshot.forEach(docSnapshot => {
        transaction.delete(docSnapshot.ref);
      });
    }
  });
};

export default switchTweetLike;
