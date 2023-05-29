import React, { FC, useEffect, useState, useRef } from "react";
import { Tooltip, FAB } from "../../../Base";
import "./ScrollToTopFAB.css";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export const ScrollToTopFAB: FC = () => {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 150) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <Tooltip text="Scroll to Top" position="left">
      {showFab && (
        <FAB
          aria-label="menu"
          onClick={handleClick}
          icon="arrow_upward"
          size="20px"
          className={`fab-animate ${showFab ? "fade-in-fab" : "fade-out-fab"}`}
        />
      )}
    </Tooltip>
  );
};
