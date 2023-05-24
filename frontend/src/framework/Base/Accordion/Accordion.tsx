import React, { useState, useRef, useEffect } from "react";
import "./Accordion.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface AccordionProps {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentHeight(isOpen ? contentRef.current?.scrollHeight || 0 : 0);
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div
        className={`accordion-header ${isOpen ? "open" : ""}`}
        onClick={toggleAccordion}
      >
        <h3>{title}</h3>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`accordion-icon ${isOpen ? "open" : ""}`}
        />
      </div>
      <div
        className={`accordion-content ${isOpen ? "open" : ""}`}
        style={{ maxHeight: `${contentHeight}px` }}
      >
        <div
          className={`accordion-content-inner ${isOpen ? "open" : ""}`}
          ref={contentRef}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
