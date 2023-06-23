import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

interface PopoverProps {
  children: React.ReactElement;
  content: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const Popover: React.FC<PopoverProps> = ({ children, content, onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverContainerRef.current &&
        !popoverContainerRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const closePopover = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const togglePopover = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      onClose && onClose();
    } else {
      onOpen && onOpen();
    }
  };

  const portalContainer = document.getElementById('popover-root');

  if (!portalContainer) {
    throw new Error("Couldn't find portal container with id 'popover-root'");
  }

  return (
    <>
      <div css={triggerStyles} ref={triggerRef} onClick={togglePopover}>
        {children}
      </div>
      {isOpen &&
        createPortal(
          <div css={popoverStyles(triggerRef.current)} ref={popoverContainerRef}>
            {content}
          </div>,
          portalContainer
        )}
    </>
  );
};

const triggerStyles = css`
  cursor: pointer;
`;

const popoverStyles = (triggerElement: HTMLDivElement | null) => css`
  position: absolute;
  top: ${triggerElement ? triggerElement.offsetTop + triggerElement.offsetHeight + 4 : 0}px;
  left: ${triggerElement ? triggerElement.offsetLeft + triggerElement.offsetWidth / 2 : 0}px;
  transform: translateX(-50%);
  z-index: 5000;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

export default Popover;
