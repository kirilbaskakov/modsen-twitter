import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@/firebase';

async function uploadImages(files: Array<File>, tweetId: string) {
  const imagePromises = Array.from(files).map(async file => {
    const imageRef = ref(storage, `tweets/${tweetId}/${file.name}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  });

  return Promise.all(imagePromises);
}

export default uploadImages;
