import { useState, useEffect } from "react";

const useBreakpoint = (breakpoint: number): boolean => {
  const [isAtBreakpoint, setIsAtBreakpoint] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsAtBreakpoint(window.innerWidth <= breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isAtBreakpoint;
};

export default useBreakpoint;
