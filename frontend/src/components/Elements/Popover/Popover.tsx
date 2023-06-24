import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

// Convert into just a Base to be used
// Trigger and handling should happen outside with a ref passed

interface PopoverProps {
  children: React.ReactElement;
  content: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  trigger: 'hover' | 'click'; 
  position: 'top' | 'bottom' | 'left' | 'right'; 
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  onOpen,
  onClose,
  trigger,
  position,
}) => {
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

    const handleOutsideHover = (event: MouseEvent) => {
      if (
        popoverContainerRef.current &&
        !popoverContainerRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    if (trigger === 'click') {
      document.addEventListener('mousedown', handleOutsideClick);
    } else if (trigger === 'hover') {
      document.addEventListener('mouseleave', handleOutsideHover);
    }

    return () => {
      if (trigger === 'click') {
        document.removeEventListener('mousedown', handleOutsideClick);
      } else if (trigger === 'hover') {
        document.removeEventListener('mouseleave', handleOutsideHover);
      }
    };
  }, [trigger]);

  useEffect(() => {
    const calculateTooltipPosition = () => {
      if (!triggerRef.current || !popoverContainerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = popoverContainerRef.current.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      let top;
      let left;

      switch (position) {
        case 'top':
          top = scrollY + triggerRect.top - tooltipRect.height - 10;
          left = scrollX + triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'bottom':
          top = scrollY + triggerRect.top + triggerRect.height + 10;
          left = scrollX + triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case 'left':
          top = scrollY + triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = scrollX + triggerRect.left - tooltipRect.width - 10;
          break;
        case 'right':
          top = scrollY + triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = scrollX + triggerRect.left + triggerRect.width + 10;
          break;
        default:
          top = scrollY + triggerRect.top + triggerRect.height + 10;
          left = scrollX + triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
      }

      const { innerWidth, innerHeight } = window;
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;

      // Check if the tooltip overflows the viewport
      if (top + tooltipHeight > scrollY + innerHeight) {
        top = scrollY + innerHeight - tooltipHeight;
      }
      if (left + tooltipWidth > scrollX + innerWidth) {
        left = scrollX - 30 + innerWidth - tooltipWidth;
      }
      if (top < scrollY) {
        top = scrollY;
      }
      if (left < scrollX) {
        left = scrollX + 30;
      }

      return { top, left };
    };

    if (isOpen) {
      const tooltipPosition = calculateTooltipPosition();
      popoverContainerRef.current!.style.top = `${tooltipPosition?.top}px` || '0';
      popoverContainerRef.current!.style.left = `${tooltipPosition?.left}px` || '0';
    }
  }, [isOpen, position]);

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
      <div
        css={triggerStyles}
        ref={triggerRef}
        onClick={trigger === 'click' ? togglePopover : undefined}
        onMouseEnter={trigger === 'hover' ? togglePopover : undefined}
        onMouseLeave={trigger === 'hover' ? closePopover : undefined}
      >
        {children}
      </div>
      {isOpen &&
        createPortal(
          <div css={popoverStyles} ref={popoverContainerRef}>
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

const popoverStyles = (theme: any) => css`
  position: absolute;
  z-index: 5000;
  color: ${theme.light};
  background-color: ${theme.darkLight};
  box-shadow: ${theme.shadows[1]};
  padding: 6px 12px;
  border-radius: 4px;
  min-width: 60px;
`;

export default Popover;
