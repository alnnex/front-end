import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PathFinder = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  return currentPath;
};
