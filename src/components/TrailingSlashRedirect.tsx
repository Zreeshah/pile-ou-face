import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const TrailingSlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.endsWith("/")) return;
    navigate(`${location.pathname}/${location.search}${location.hash}`, { replace: true });
  }, [location.hash, location.pathname, location.search, navigate]);

  return null;
};
