import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";

function TasksPage() {
  const { loggedInUser } = useContext(UserContext);
  console.log(
    "🚀 ~ file: TasksPage.js:8 ~ TasksPage ~ loggedInUser:",
    loggedInUser
  );
  if (!loggedInUser) {
    return <Navigate to="./login"></Navigate>
  }
  console.log("Made it past catch");
  return <div>Made it to Tasks Page! </div>;
}

export default TasksPage;
