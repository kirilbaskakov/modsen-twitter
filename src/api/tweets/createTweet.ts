import { addDoc, collection, Timestamp, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase';

import uploadImages from './uploadImages';

const createTweet = async (
  tweetData: { authorId: string; text: string },
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
