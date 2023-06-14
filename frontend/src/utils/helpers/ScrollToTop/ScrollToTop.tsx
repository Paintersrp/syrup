import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  console.log('pathname', pathname);

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
