import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../UserContext.js";

const PrivateRoutes = () => {
  const { loggedInUser } = useContext(UserContext);
  console.log(
    "🚀 ~ file: PrivateRoutes.js:7 ~ PrivateRoutes ~ loggedInUser:",
    loggedInUser
  );
  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
