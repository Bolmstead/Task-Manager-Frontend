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
import SignupPage from "./pages/SignupPage.js";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(
    // Grab the userinfo with API call using token in local storage and save user to state
    function loadUserInfo() {
      async function getLoggedInUser() {
        if (token) {
          try {
            const { username } = jwt_decode(token);
            TaxRiseAPI.token = token;
            const currentUser = await TaxRiseAPI.getLoggedInUser(username);
            setLoggedInUser(currentUser);
            setInfoLoaded(true);
            setBtnLoading(false);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setLoggedInUser(null);
            setInfoLoaded(true);
          }
        } else {
          setInfoLoaded(true);
        }
      }
      getLoggedInUser();
    },
    [token]
  );

  // Handles site-wide login
  async function login(enteredUsername, enteredPassword) {
    try {
      setBtnLoading(true);
      setAlert(null);
      const loginToken = await TaxRiseAPI.login({
        username: enteredUsername,
        password: enteredPassword,
      });
      setToken(loginToken);
      localStorage.setItem("token", JSON.stringify(loginToken));
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "Error Logging in",
      });
      setBtnLoading(false);
    }
  }

  // Creates user and logs the new user in
  async function signup(username, password, accountType) {
    try {
      setBtnLoading(true);
      let isClient = true;
      if (accountType === "Admin") {
        isClient = false;
      }

      setAlert(null);
      const token = await TaxRiseAPI.signup({ username, password, isClient });

      setToken(token);
    } catch (error) {
      setBtnLoading(false);

      setAlert({
        type: "error",
        message: error.message || "Error Signing up",
      });
    }
  }

  // Handles site-wide logout
  function logout() {
    setLoggedInUser(null);
    setToken(null);
  }

  if (!infoLoaded) {
    <div className="App">
      <NavigationBar />
      <header className="App-header">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </header>
    </div>;
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
                <Route path="*" element={<MyTasksPage />} />
              </Routes>
            )}
          </header>
        </Context.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
