import cn from 'classnames';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import getUser from '@/api/getUser';
import updateUser from '@/api/updateUser';
import uploadAvatar from '@/api/uploadAvatar';
import {
  validateName,
  validateStatus,
  validateTg
} from '@/constants/validation';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ModalProps } from '@/types/ModalProps';

import { UserType } from '../../types/UserType';
import ImagePicker from '../ImagePicker/ImagePicker';
import LabeledInput from '../LabeledInput/LabeledInput';
import Modal from '../Modal/Modal';

interface EditModalInputs {
  name: string;
  status: string;
  tg: string;
  gender: 'Male' | 'Female' | 'Unknown';
}

const EditModal = ({ isOpen, onClose }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditModalInputs>();
  const [user, setUser] = useState<UserType | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then(setUser);
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<EditModalInputs> = async data => {
    const userData: Partial<UserType> = data;
    if (image) {
      userData.photoUrl = await uploadAvatar(image, user!.id);
    }
    updateUser(user!.id, userData)
      .then(() => window.location.reload())
      .catch(console.log);
  };

  const onImageChange = (image: File) => setImage(image);

  if (!isOpen) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[30vw]">
        <h1 className="text-3xl font-semibold text-center">Edit profile</h1>
        <form
          className="flex flex-col mt-4 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ImagePicker defaultImage={user?.photoUrl} onChange={onImageChange} />
          <LabeledInput
            type="text"
            id="name-input"
            className={cn({ error: !!errors.name })}
            placeholder="Name"
            defaultValue={user?.name}
            register={() => register('name', validateName)}
          />
          <p className="text-red-500 text-xs font-bold h-3">
            {errors.name?.message}
          </p>
          <LabeledInput
            type="text"
            id="status-input"
            className={cn({ error: !!errors.status })}
            placeholder="Status"
            defaultValue={user?.status}
            register={() => register('status', validateStatus)}
          />
          <p className="text-red-500 text-xs font-bold h-3">
            {errors.status?.message}
          </p>
          <LabeledInput
            type="text"
            id="tg-input"
            className={cn({ error: !!errors.tg })}
            placeholder="Telegram"
            defaultValue={user?.tg}
            register={() => register('tg', validateTg)}
          />
          <p className="text-red-500 text-xs font-bold h-3">
            {errors.tg?.message}
          </p>
          <div className="">
            <h3 className="text-lg font-bold">Your gender</h3>
            <div className="mt-1 flex gap-4 text-lg">
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value="Male"
                id="male"
                defaultChecked={user?.gender === 'Male'}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex gap-4 text-lg">
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value="Female"
                id="female"
                defaultChecked={user?.gender === 'Female'}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div className="flex gap-4 text-lg">
              <input
                {...register('gender')}
                type="radio"
                name="gender"
                value="Unknown"
                id="unknown"
                defaultChecked={user?.gender === 'Unknown'}
              />
              <label htmlFor="unknown">Unknown</label>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="submit">Save</button>
            <button className="secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
