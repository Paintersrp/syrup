import React from 'react';
import './ConfirmationModal.css';

import ConfirmCancelBar from '../ConfirmCancelBar/ConfirmCancelBar';
import { Modal, Text } from '@/components/Elements';

interface ConfirmationModalProps {
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
  message: string;
  warning?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  handleConfirm,
  handleClose,
  message,
  warning,
}) => {
  return (
    <Modal isOpen={open} onClose={handleClose} width="auto" className="confirm-modal-root">
      <Text t="subtitle2" fw="500" s="1.15rem" a="c">
        {message}
      </Text>
      {warning && (
        <Text t="body1" fw="500" s="0.85rem" a="c" className="confirm-warning">
          {warning}
        </Text>
      )}
      <ConfirmCancelBar
        handleConfirm={handleConfirm}
        handleCancel={handleClose}
        position="bottom"
        mt={4}
      />
    </Modal>
  );
};

export default ConfirmationModal;
