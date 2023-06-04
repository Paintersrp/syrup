import React, { FC, useEffect, useState } from "react";
import "./ScrollToTopFAB.css";

import { FAB, Tooltip } from "../../../../Components";

interface ScrollToTopFABProps {}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const ScrollToTopFAB: FC<ScrollToTopFABProps> = () => {
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
