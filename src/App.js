import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import NavigationBar from "./components/NavigationBar.js";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    async function isUserLoggedIn() {
      // If user has nothing in session storage or no token
      // in local storage, logout user
      let token = window.localStorage.getItem("token");
      if (token) {
        // If user is logged in, grab the most updated user info and
        // save it to local storage for other components to grab
        let user = JSON.parse(localStorage.getItem("user"));
        if (user._id) {
          let userResult = await API.getUser(user.username);
          if (userResult._id) {
          }
        }
      }
    }
    isUserLoggedIn();
  }, []);

  return (
    <div className="App">
      <NavigationBar loggedInUser={loggedInUser}></NavigationBar>
      <header className="App-header">
        <Button>Click me</Button>
      </header>
    </div>
  );
}

export default App;
