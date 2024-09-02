import { Timestamp, addDoc, collection, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { TweetType } from '@/types/TweetType';
import uploadImages from './uploadImages';

const createTweet = async (
  tweetData: Omit<TweetType, 'date' | 'imageUrls'>,
  images: Array<File>
): Promise<void> => {
  const tweetsRef = collection(db, 'tweets');
  const docRef = await addDoc(tweetsRef, {
    ...tweetData,
    date: new Timestamp(Math.floor(new Date().getTime() / 1000), 0)
  });
  const imageUrls = await uploadImages(images, docRef.id);
  await updateDoc(docRef, {
    imageUrls
  });
};

export default createTweet;
