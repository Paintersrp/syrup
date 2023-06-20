import { FC } from 'react';

import { ConfirmCancelBar } from '../ConfirmCancelBar/ConfirmCancelBar';
import { Modal, Text } from '@/components/Elements';
import { useTheme } from '@emotion/react';

interface ConfirmationModalProps {
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
  message: string;
  warning?: string;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  handleConfirm,
  handleClose,
  message,
  warning,
}) => {
  const theme: any = useTheme();
  return (
    <Modal isOpen={open} onClose={handleClose} width="auto">
      <Text t="subtitle2" fw="500" s="1.15rem" a="c">
        {message}
      </Text>
      {warning && (
        <Text t="body1" fw="500" s="0.85rem" a="c" c={theme.error}>
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
