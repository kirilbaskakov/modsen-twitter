import { ModalProps } from '@/types/ModalProps';

import CreateTweetForm from '../CreateTweetForm/CreateTweetForm';
import Modal from '../Modal/Modal';

const CreateTweetModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <CreateTweetForm />
    </Modal>
  );
};

export default CreateTweetModal;
