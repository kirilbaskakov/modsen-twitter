import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

async function checkFollow(followerId: string, followingId: string) {
  const followingsRef = collection(db, 'followings');
  const followingQuery = query(
    followingsRef,
    where('followerId', '==', followerId),
    where('followingId', '==', followingId)
  );
  const querySnapshot = await getDocs(followingQuery);
  return !querySnapshot.empty; 
}

export default checkFollow;
