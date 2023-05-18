import React, { useState, useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  onClose = () => {},
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
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
