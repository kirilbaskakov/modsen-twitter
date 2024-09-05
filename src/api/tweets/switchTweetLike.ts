import {
  addDoc,
  collection,
  deleteDoc,
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
      // Если лайка нет, добавляем новый
      const newLikeRef = doc(likesRef); // Создаем новый документ
      transaction.set(newLikeRef, {
        tweetId: tweetId,
        userId: userId,
        createdAt: new Date()
      });
      console.log('Лайк добавлен');
    } else {
      // Если лайк уже существует, снимаем лайк
      querySnapshot.forEach(docSnapshot => {
        transaction.delete(docSnapshot.ref);
        console.log('Лайк снят');
      });
    }
  });
};

export default switchTweetLike;
