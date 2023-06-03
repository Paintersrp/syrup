import React, { useState } from "react";
import { Button } from "../../../framework/Base";
import Stagger from "../../../framework/Containers/Stagger/Stagger";
import "./test.css";

const Test = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  const openModal = () => {
    setIsOpen2(true);
  };

  const closeModal = () => {
    setIsOpen2(false);
  };

  return (
    <React.Fragment>
      <Stagger direction="right">
        <div>Right Child 1</div>
        <div>Right Child 2</div>
        <div>Right Child 3</div>
      </Stagger>
      <Stagger direction="left">
        <div>Left Child 1</div>
        <div>Left Child 2</div>
        <div>Left Child 3</div>
      </Stagger>

      <Stagger direction="right" orientation="horizontal">
        <div>Right Child 1</div>
        <div>Right Child 2</div>
        <div>Right Child 3</div>
      </Stagger>
      <Stagger direction="left" orientation="horizontal">
        <div>Left Child 1</div>
        <div>Left Child 2</div>
        <div>Left Child 3</div>
      </Stagger>

      <Button className="elastic-button">Test</Button>

      <div
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h2>Front Side</h2>
          </div>
          <div className="flip-card-back">
            <h2>Back Side</h2>
          </div>
        </div>
      </div>

      <div className={`animated-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
          {/* Add more menu items as needed */}
        </ul>
        <button onClick={toggleMenu} className="elastic-button">
          Toggle Menu
        </button>
      </div>
      <div className="staggered-entrance">
        <div className="staggered-entrance">Element 1</div>
        <div className="staggered-entrance">Element 2</div>
        <div className="staggered-entrance">Element 3</div>
      </div>
      <div class="morphing-shape"></div>

      <button onClick={openModal}>Open Modal</button>
      {isOpen2 && (
        <div className="animated-modal open">
          <div className="animated-modal-content">
            {/* Content for the modal goes here */}
            <h2>Modal Content</h2>
            <p>This is the content of the modal.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Test;
