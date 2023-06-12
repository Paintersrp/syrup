import React, { useRef, FC, ReactNode } from "react";
import { Transition } from "react-transition-group";
import "./css/Collapser.css";

interface CollapserProps {
  isOpen: boolean;
  duration?: number;
  children: ReactNode;
}

const Collapser: FC<CollapserProps> = ({
  children,
  duration = 300,
  isOpen,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: {
      padding: "0px 1px",
      opacity: 1,
      maxHeight: nodeRef.current?.scrollHeight,
      overflow: "hidden",
      transition: `max-height ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1), opacity ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`,
    },
    entered: {
      padding: "0px 1px",
      opacity: 1,
      maxHeight: nodeRef.current?.scrollHeight,
      overflow: "visible",
      transition: `max-height ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1), opacity ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`,
    },
    exiting: {
      padding: "0px 1px",
      opacity: 0,
      maxHeight: 0,
      overflow: "hidden",
      transition: `max-height ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1), opacity ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`,
    },
    exited: {
      padding: "0px 1px",
      opacity: 0,
      maxHeight: 0,
      overflow: "hidden",
    },
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={duration}
      appear={isOpen}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default Collapser;
