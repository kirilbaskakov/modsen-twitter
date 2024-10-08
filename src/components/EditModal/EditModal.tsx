import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import cn from 'classnames';
import { FirebaseError } from 'firebase/app';

import changeEmail from '@/api/users/changeEmail';
import changePassword from '@/api/users/changePassword';
import updateUser from '@/api/users/updateUser';
import uploadAvatar from '@/api/users/uploadAvatar';
import errorsMessages from '@/constants/errorsMessages';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateStatus,
  validateTg
} from '@/constants/validation';
import { auth } from '@/firebase';
import useAlert from '@/hooks/useAlert';
import useCurrentUser from '@/hooks/useCurrentUser';
import { ModalProps } from '@/types/ModalProps';
import { UserType } from '@/types/UserType';
import emailToPhone from '@/utils/emailToPhone';
import phoneToEmail from '@/utils/phoneToEmail';

import ImagePicker from '../ImagePicker/ImagePicker';
import LabeledInput from '../LabeledInput/LabeledInput';
import Modal from '../Modal/Modal';
import PhoneInput from '../PhoneInput/PhoneInput';

interface EditModalInputs {
  name: string;
  status: string;
  tg: string;
  gender: 'Male' | 'Female' | 'Unknown';
  newPassword: string;
  email?: string;
  phoneNumber?: string;
}

const EditModal = ({ isOpen, onClose }: ModalProps) => {
  const { showAlert, showPasswordConfirm } = useAlert();
  const form = useForm<EditModalInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;
  const [image, setImage] = useState<File | null>(null);
  const currentUser = useCurrentUser();
  const user = auth.currentUser;
  const providerData = user?.providerData;
  const isGoogleUser = providerData?.some(
    provider => provider.providerId === 'google.com'
  );
  const isUsingPhone = !!user?.email?.endsWith('@modsen-twitter.com');

  const onSubmit: SubmitHandler<EditModalInputs> = async data => {
    try {
      const userData: Partial<UserType> = data;
      if (image) {
        userData.photoUrl = await uploadAvatar(image, currentUser!.id);
      }
      let currentPassword = null;
      if (data.newPassword) {
        currentPassword = await showPasswordConfirm();
        await changePassword(currentPassword, data.newPassword);
      }
      if (data.phoneNumber && phoneToEmail(data.phoneNumber) != user?.email) {
        if (!currentPassword) {
          currentPassword = await showPasswordConfirm();
        }
        await changeEmail(currentPassword, phoneToEmail(data.phoneNumber));
      }
      if (data.email && data.email != user?.email) {
        if (!currentPassword) {
          currentPassword = await showPasswordConfirm();
        }
        await changeEmail(currentPassword, phoneToEmail(data.email));
      }
      await updateUser(currentUser!.id, userData);
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          showAlert('Invalid password', 'error');
        } else {
          showAlert(
            errorsMessages[error.code] ?? 'Some error occured',
            'error'
          );
        }
        return;
      }
    }
  };

  const onImageChange = (image: File) => setImage(image);

  if (!isOpen || !currentUser) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormProvider {...form}>
        <div className="w-[30vw] min-w-80">
          <h1 className="text-3xl font-semibold text-center">Edit profile</h1>
          <form
            className="flex flex-col mt-4 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ImagePicker
              defaultImage={currentUser?.photoUrl}
              onChange={onImageChange}
            />
            <LabeledInput
              type="text"
              id="name-input"
              className={cn({ error: !!errors.name })}
              placeholder="Name"
              defaultValue={currentUser?.name}
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
              defaultValue={currentUser?.status}
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
              defaultValue={currentUser?.tg}
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
                  defaultChecked={currentUser?.gender === 'Male'}
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
                  defaultChecked={currentUser?.gender === 'Female'}
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
                  defaultChecked={currentUser?.gender === 'Unknown'}
                />
                <label htmlFor="unknown">Unknown</label>
              </div>
              {!isGoogleUser && (
                <div className="mt-4 flex flex-col gap-2 ">
                  <h3 className="text-lg font-bold">Change your password</h3>
                  <LabeledInput
                    type="password"
                    id="new-password-input"
                    placeholder="New password"
                    register={() =>
                      register('newPassword', {
                        ...validatePassword,
                        required: false
                      })
                    }
                  />
                  <p className="text-red-500 text-xs font-bold h-3">
                    {errors.newPassword?.message}
                  </p>
                </div>
              )}
              {!isGoogleUser && user?.email && (
                <div className="mt-4 flex flex-col gap-2 ">
                  <h3 className="text-lg font-bold">
                    Change your {isUsingPhone ? 'phone number' : 'email'}
                  </h3>
                  {isUsingPhone ? (
                    <PhoneInput defaultValue={emailToPhone(user.email)} />
                  ) : (
                    <LabeledInput
                      type="text"
                      id="email-input"
                      placeholder="New Email"
                      register={() =>
                        register('email', {
                          ...validateEmail
                        })
                      }
                      defaultValue={user.email}
                    />
                  )}
                  <p className="text-red-500 text-xs font-bold h-3">
                    {errors.email?.message}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <button type="submit">Save</button>
              <button className="secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default EditModal;
