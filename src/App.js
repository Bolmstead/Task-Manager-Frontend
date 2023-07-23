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
import LoginPage from "./pages/LoginPage.js";
import NotFoundPage from "./pages/NotFoundPage";
import TasksPage from "./pages/TasksPage";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(null);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getLoggedInUser() {
        if (token) {
          try {
            let { username } = jwt_decode(token);
            console.log(
              "🚀 ~ file: App.js:29 ~ getLoggedInUser ~ username:",
              username
            );
            // put the token on the Api class so it can use it to call the API.
            TaxRiseAPI.token = token;
            console.log(
              "🚀 ~ file: App.js:32 ~ getLoggedInUser ~ TaxRiseAPI.token:",
              TaxRiseAPI.token
            );
            let currentUser = await TaxRiseAPI.getLoggedInUser(username);
            console.log(
              "🚀 ~ file: App.js:34 ~ getLoggedInUser ~ currentUser:",
              currentUser
            );

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
      setAlert(null);

      let loginToken = await TaxRiseAPI.login({
        username: enteredUsername,
        password: enteredPassword,
      });
      setToken(loginToken);

      localStorage.setItem("token", JSON.stringify(loginToken));
    } catch (error) {
      setAlert({ alertType: "danger", message: error.message });
    }
  }

  // Handles site-wide logout
  function logout() {
    setLoggedInUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      setAlert(null);
      let token = await TaxRiseAPI.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
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
                {/* <Route exact path="/signup" element={<SignupPage />}></Route> */}

                <Route element={<PrivateRoutes />}>
                  {/* <Route element={<TaskDetailsPage />}></Route> */}
                  <Route path="/tasks" element={<TasksPage />}></Route>
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
