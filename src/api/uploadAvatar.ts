import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@/firebase';

const uploadAvatar = async (file: File, id: string): Promise<string> => {
  const avatarRef = ref(storage, `avatars/${id}`);
  await uploadBytes(avatarRef, file);

  const downloadURL = await getDownloadURL(avatarRef);

  return downloadURL;
};

export default uploadAvatar;
