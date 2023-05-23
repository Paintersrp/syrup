import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import "./Collapser.css";

const Collapser = ({ children, duration, isOpen }) => {
  const nodeRef = useRef(null);

  const transitionStyles = {
    entering: {
      height: 0,
      overflow: "hidden",
    },
    entered: {
      height: "auto",
      overflow: "visible",
    },
    exiting: {
      height: "auto",
      overflow: "visible",
    },
    exited: {
      height: 0,
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
          nodeRef={nodeRef}
          className="collapse-content"
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

Collapser.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
  style: PropTypes.object,
};

Collapser.defaultProps = {
  duration: 300,
  style: {},
};

export default Collapser;
