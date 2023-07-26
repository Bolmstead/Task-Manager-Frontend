import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../UserContext.js";

const PrivateRoutes = () => {
  const { loggedInUser } = useContext(UserContext);

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
