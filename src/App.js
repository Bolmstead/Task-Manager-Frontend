import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaxRiseAPI from "./Api";
import "./App.css";
import Context from "./UserContext.js";
import AlertMessage from "./components/AlertMessage";
import NavigationBar from "./components/NavigationBar.js";
import useLocalStorage from "./hooks/useLocalStorageHook";
import AllTasksPage from "./pages/AllTasksPage";
import AssignmentDetailsPage from "./pages/AssignmentDetailsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import LoginPage from "./pages/LoginPage.js";
import MyTasksPage from "./pages/MyTasksPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage.js";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getLoggedInUser() {
        if (token) {
          try {
            let { username } = jwt_decode(token);

            // put the token on the Api class so it can use it to call the API.
            TaxRiseAPI.token = token;

            let currentUser = await TaxRiseAPI.getLoggedInUser(username);

            setLoggedInUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setLoggedInUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getLoggedInUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getLoggedInUser();
    },
    [token]
  );

  // Handles site-wide login
  async function login(enteredUsername, enteredPassword) {
    try {
      setBtnLoading(true);
      setAlert(null);

      let loginToken = await TaxRiseAPI.login({
        username: enteredUsername,
        password: enteredPassword,
      });
      setBtnLoading(false);

      setToken(loginToken);

      localStorage.setItem("token", JSON.stringify(loginToken));
    } catch (error) {
      console.log("🚀 ~ file: App.js:93 ~ login ~ error:", error);
      setBtnLoading(false);

      setAlert({
        type: "error",
        message: error.message || "Error Logging in",
      });
    }
  }

  // Handles site-wide logout
  function logout() {
    setLoggedInUser(null);
    setToken(null);
  }

  async function signup(username, password, accountType) {
    try {
      setBtnLoading(true);
      let isClient = true;
      if (accountType === "Admin") {
        isClient = false;
      }

      setAlert(null);
      let token = await TaxRiseAPI.signup({ username, password, isClient });
      setBtnLoading(false);

      setToken(token);
    } catch (error) {
      console.log("🚀 ~ file: App.js:126 ~ signup ~ error:", error);
      setBtnLoading(false);

      setAlert({
        type: "error",
        message: error.message || "Error Signing up",
      });
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Context.Provider
          value={{
            loggedInUser,
            login,
            logout,
            token,
            setAlert,
            signup,
            btnLoading,
            setBtnLoading,
          }}
        >
          <NavigationBar />
          <header className="App-header">
            {alert ? <AlertMessage alert={alert} /> : null}
            {!infoLoaded ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Routes>
                <Route exact path="/login" element={<LoginPage />}></Route>
                <Route exact path="/signup" element={<SignupPage />}></Route>

                <Route element={<PrivateRoutes />}>
                  <Route
                    path="/assignment/:id"
                    element={<AssignmentDetailsPage />}
                  ></Route>
                  <Route path="/my-tasks" element={<MyTasksPage />}></Route>
                  <Route path="/all-tasks" element={<AllTasksPage />}></Route>
                  <Route
                    path="/create-task"
                    element={<CreateTaskPage />}
                  ></Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </header>
        </Context.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
