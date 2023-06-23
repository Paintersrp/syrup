import { useState, useEffect, FC, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Base, BaseProps } from '@/theme/base';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { inject } from '@/theme/utils';

const styles = (theme: any) => ({
  root: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }),
  overlay: () =>
    css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.backdrop,
    }),
  modal: (width: CSSProperties['width'], maxWidth: CSSProperties['maxWidth']) =>
    css({
      position: 'relative',
      backgroundColor: theme.background,
      borderRadius: 4,
      boxShadow: theme.shadows[1],
      padding: '16px 48px 4px 48px',
      width: width,
      margin: '0 auto',
      maxWidth: maxWidth,
    }),
});

interface ModalProps extends BaseProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  outerClass?: string;
  innerClass?: string;
  maxWidth?: CSSProperties['maxWidth'];
  width?: CSSProperties['width'];
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  onClose = () => {},
  outerStyle,
  innerStyle,
  outerClass,
  innerClass,
  maxWidth = 600,
  width = undefined,
  ...rest
}) => {
  const css = inject(styles);

  const [modalOpen, setModalOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = (): void => {
    setModalOpen(false);
    onClose();
  };

  if (!modalOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Base d="flex" a="c" j="c" css={css.root} {...rest}>
      <div css={css.overlay} onClick={closeModal} />
      <div css={css.modal(width, maxWidth)} className={clsx(outerClass)} style={outerStyle}>
        <div style={innerStyle} className={clsx(innerClass)}>
          {children}
        </div>
      </div>
    </Base>,
    document.body
  );
};
