import getUser from '@/api/getUser';
import ImageIcon from '@/assets/image.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { UserType } from '@/types/UserType';
import { useEffect, useState } from 'react';
import ImagePlaceholder from '@/assets/image-placeholder.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validateTweetText } from '@/constants/validation';
import createTweet from '@/api/createTweet';

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

  const onSubmit: SubmitHandler<{ text: string }> = data => {
    createTweet(
      {
        authorId: user!.id,
        text: data.text
      },
      images
    ).then(() => window.location.reload());
  };

  const onImageSelected = e => {
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

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then(setUser);
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
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
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
