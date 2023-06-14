import { useState } from "react";

export function useDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return { isDrawerOpen, handleDrawer };
}
