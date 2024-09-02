import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const deleteTweet = async (tweetId: string) => {
  const tweetRef = doc(db, 'tweets', tweetId);
  await deleteDoc(tweetRef);
};

export default deleteTweet;
