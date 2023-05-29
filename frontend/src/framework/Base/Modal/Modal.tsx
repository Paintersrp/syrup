import React, {
  useState,
  useEffect,
  FC,
  ReactNode,
  CSSProperties,
} from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  style?: CSSProperties;
  className?: string;
  maxWidth?: CSSProperties["maxWidth"];
  width?: CSSProperties["width"];
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  onClose = () => {},
  style,
  className,
  maxWidth = 600,
  width = undefined,
}) => {
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
    <div className="modal-container">
      <div className="modal-overlay" onClick={closeModal} />
      <div
        className={`modal-root ${className}`}
        style={{ ...style, maxWidth: maxWidth, width: width }}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
