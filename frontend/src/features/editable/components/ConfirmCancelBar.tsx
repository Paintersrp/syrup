import { CSSProperties, FC, ReactElement, ReactEventHandler } from 'react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Tooltip, TooltipPosition } from '@/components/Elements';

interface ConfirmCancelBarProps {
  handleConfirm: ReactEventHandler;
  handleCancel: ReactEventHandler;
  position?: TooltipPosition;
  justifyContent?: string;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  style?: CSSProperties;
}

export const ConfirmCancelBar: FC<ConfirmCancelBarProps> = ({
  handleConfirm,
  handleCancel,
  position = 'top',
  justifyContent = 'center',
  mt: marginTop,
  mb: marginBottom,
  style,
}): ReactElement => {
  return (
    <Flexer j={justifyContent} style={style} mb={marginBottom} mt={marginTop}>
      <Tooltip text="Confirm" position={position}>
        <IconButton
          size="md"
          aria-label="Confirm"
          onClick={handleConfirm}
          icon="check"
          palette="success"
          variant="hover"
        />
      </Tooltip>
      <Tooltip text="Cancel" position={position}>
        <IconButton
          size="md"
          aria-label="Cancel"
          onClick={handleCancel}
          icon="close"
          palette="error"
          variant="hover"
        />
      </Tooltip>
    </Flexer>
  );
};
