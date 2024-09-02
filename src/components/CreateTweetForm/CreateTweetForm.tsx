import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import createTweet from '@/api/tweets/createTweet';
import getUser from '@/api/users/getUser';
import ImageIcon from '@/assets/image.svg';
import ImagePlaceholder from '@/assets/image-placeholder.svg';
import { validateTweetText } from '@/constants/validation';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';

const CreateTweetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ text: string }>();
  const [images, setImages] = useState<Array<File>>([]);
  const [previews, setPreviews] = useState<Array<string>>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const currentUser = useCurrentUser();

  const onSubmit: SubmitHandler<{ text: string }> = async data => {
    await createTweet(
      {
        authorId: user!.id,
        text: data.text
      },
      images
    );
    window.location.reload();
  };

  const onImageSelected: ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImages(images => [...images, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(previews => [...previews, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageDelete = (index: number) => () => {
    setImages(images => images.filter((_, ind) => ind != index));
    setPreviews(previews => previews.filter((_, ind) => ind != index));
  };

  const onInput: FormEventHandler<HTMLTextAreaElement> = e => {
    const target = e.target as HTMLElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  const getUserData = async (uid: string) => {
    const user = await getUser(uid);
    setUser(user);
  };

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <div className="border-y-2 py-3 flex gap-6">
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={user?.photoUrl ?? ImagePlaceholder}
      />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="w-full text-xl resize-none focus:outline-none h-auto ovef"
          placeholder="What's happening"
          onInput={onInput}
          {...register('text', validateTweetText)}
        ></textarea>
        <div className="grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div className="relative">
              <img src={preview} className="w-full" />
              <button
                className="absolute top-2 right-2 rounded-full w-7 h-7 flex items-center justify-center bg-black opacity-80 text-white font-bold"
                onClick={onImageDelete(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <input
            type="file"
            className="hidden"
            id="image-input"
            accept="image/png, image/jpeg"
            onChange={onImageSelected}
          />
          <label htmlFor="image-input">
            <img
              src={ImageIcon}
              alt="Image icon"
              title="Attach image"
              className="cursor-pointer"
            />
          </label>
          <button className="w-auto px-6" disabled={!!errors.text}>
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTweetForm;
