import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FadeOnScrollProps {
  children: React.ReactNode;
  animationDuration?: number;
  onScreenPercentage?: number;
}

const FadeOnScroll: React.FC<FadeOnScrollProps> = ({
  children,
  animationDuration = 1,
  onScreenPercentage = 0.5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const top = ref.current.offsetTop;
        const height = ref.current.clientHeight;
        const isVisible =
          top + height * onScreenPercentage <
          window.pageYOffset + window.innerHeight;
        setIsVisible(isVisible);

        if (isVisible) {
          setHasBeenVisible(isVisible);
        }
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const start: any = { opacity: 0 };
  const end: any = {
    opacity: 1,
    transition: { duration: animationDuration },
  };

  return (
    <motion.div
      ref={ref}
      animate={isVisible || hasBeenVisible ? end : start}
      initial={start}
    >
      {children}
    </motion.div>
  );
};

export default FadeOnScroll;
