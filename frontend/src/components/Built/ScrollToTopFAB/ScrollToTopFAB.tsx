import { FC, useEffect, useState } from 'react';
import './ScrollToTopFAB.css';

import { scrollToTop } from '@/utils';
import { FAB } from '@/components/Buttons';

interface ScrollToTopFABProps {}

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <>
      {showFab && (
        <FAB
          aria-label="menu"
          onClick={handleClick}
          icon="arrow_upward"
          size="20px"
          className={`fab-animate ${showFab ? 'fade-in-fab' : 'fade-out-fab'}`}
          tooltip="Scroll to Top"
        />
      )}
    </>
  );
};
