import { ModalProps } from '@/types/ModalProps';

import CreateTweetForm from '../CreateTweetForm/CreateTweetForm';
import Modal from '../Modal/Modal';

const CreateTweetModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <div className="w-[30vw] min-w-80 ">
        <CreateTweetForm />
      </div>
    </Modal>
  );
};

export default CreateTweetModal;
