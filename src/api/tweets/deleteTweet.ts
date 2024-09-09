import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '@/firebase';

const deleteTweet = async (tweetId: string) => {
  const tweetRef = doc(db, 'tweets', tweetId);
  await deleteDoc(tweetRef);
};

export default deleteTweet;
