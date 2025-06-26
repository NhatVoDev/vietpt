import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthActions } from "./hooks/useAuthActions";

const Provider = () => {
  const { pathname } = useLocation();
  const { fetchProfile } = useAuthActions();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, pathname]);

  return <Outlet />;
};

export default Provider;
