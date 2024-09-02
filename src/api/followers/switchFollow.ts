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

const switchFollow = async (followerId: string, followingId: string) => {
  const followingsRef = collection(db, 'followings');
  const q = query(
    followingsRef,
    where('followerId', '==', followerId),
    where('followingId', '==', followingId)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(followingsRef, {
      followerId: followerId,
      followingId: followingId
    });
  } else {
    await deleteDoc(doc(db, 'followings', querySnapshot.docs[0].id));
  }
};

export default switchFollow;
