import React, { useState, useRef, useEffect } from "react";
import "./Accordion.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Base, BaseProps } from "../../Containers";

interface AccordionProps extends BaseProps {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, ...rest }) => {
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
    <Base className={`accordion ${isOpen ? "open" : ""}`} {...rest}>
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
    </Base>
  );
};

export default Accordion;
