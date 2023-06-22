import { useState, useEffect, FC, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Base, BaseProps } from '@/theme/base';
import { css, useTheme } from '@emotion/react';
import clsx from 'clsx';

type ModalStyleProps = {
  theme: any;
  width: CSSProperties['width'];
  maxWidth: CSSProperties['maxWidth'];
};

const styles = {
  root: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }),
  overlay: (theme: any) =>
    css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.backdrop,
    }),
  modal: (theme: any, width: CSSProperties['width'], maxWidth: CSSProperties['maxWidth']) =>
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
};

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

const Modal: FC<ModalProps> = ({
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
  const theme = useTheme();
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
    <Base d="flex" a="c" j="c" css={styles.root} {...rest}>
      <div css={styles.overlay(theme)} onClick={closeModal} />
      <div
        css={styles.modal(theme, width, maxWidth)}
        className={clsx(outerClass)}
        style={outerStyle}
      >
        <div style={innerStyle} className={clsx(innerClass)}>
          {children}
        </div>
      </div>
    </Base>,
    document.body
  );
};

export default Modal;
