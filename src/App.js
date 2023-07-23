import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TaxRiseAPI from "./Api";
import "./App.css";
import Context from "./UserContext.js";
import AlertMessage from "./components/AlertMessage";
import NavigationBar from "./components/NavigationBar.js";
import LoginPage from "./pages/LoginPage.js";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [alert, setAlert] = useState(null);
  console.log("🚀 ~ file: App.js:17 ~ App ~ alert:", !!alert);
  const [infoLoaded, setInfoLoaded] = useState(null);

  console.log("🚀 ~ file: App.js:13 ~ App ~ token:", token);

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
      console.log("login ");
      console.log("🚀 ~ file: App.js:55 ~ login ~ enteredUsername, enteredPassword:", enteredUsername, enteredPassword)
      let loginToken = await TaxRiseAPI.login({
        username: enteredUsername,
        password: enteredPassword,
      });
      console.log("🚀 ~ file: App.js:59 ~ login ~ loginToken:", loginToken)
      setToken(loginToken);

      localStorage.setItem("token", JSON.stringify(loginToken));
      return { success: true };
    } catch (errors) {
      return { errors };
    }
  }

  // Handles site-wide logout
  function logout() {
    console.log("logout executed");

    setLoggedInUser(null);
    setToken(null);
  }
  if (!infoLoaded)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  async function signup(signupData) {
    try {
      let token = await TaxRiseAPI.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  if (token && loggedInUser) {
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
          <AlertMessage alert={alert} />
          <Routes>
            {/* <Route exact path="/tasks">
              <TasksPage />
            </Route> */}
            {/* <Route exact path="/task/:task_id">
              <TaskDetailsPage />
            </Route> */}
            <Route render={() => <Navigate to="/tasks" />} />
          </Routes>
        </header>
      </Context.Provider>
    </div>;
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Context.Provider
          value={{
            login,
            setAlert,
            signup,
          }}
        >
          <NavigationBar />
          <header className="App-header">
            {alert ? <AlertMessage alert={alert} /> : null}
            <Routes>
              <Route exact path="/login" element={<LoginPage />}></Route>
              {/* <Route exact path="/signup">
                <SignupPage />
              </Route> */}
              <Route render={() => <Navigate to="/login" />} />
            </Routes>
          </header>
        </Context.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
