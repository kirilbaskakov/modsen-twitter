import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
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

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(likesRef, {
      tweetId: tweetId,
      userId: userId
    });
  } else {
    await deleteDoc(doc(db, 'likes', querySnapshot.docs[0].id));
  }
};

export default switchTweetLike;
