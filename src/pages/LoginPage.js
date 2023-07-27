import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext.js";

function LoginPage() {
  const { login, loggedInUser, btnLoading } = useContext(UserContext);

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  if (loggedInUser) {
    if (loggedInUser.isClient) {
      return <Navigate to="/my-tasks" replace={true} />;
    } else {
      return <Navigate to="/all-tasks" replace={true} />;
    }
  }

  return (
    <Form className="general-form">
      <h1 className="page-title">Login</h1>{" "}
      <Form.Group className="mb-3" controlId="loginForm">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => setEnteredUsername(e.target.value)}
          type="email"
          placeholder="name@example.com"
          value={enteredUsername}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="********"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <div className="account-btn-container">
          <Button
            variant="primary"
            disabled={
              btnLoading ||
              enteredPassword.length < 8 ||
              enteredUsername.length < 3
            }
            className="my-4 px-5"
            onClick={
              !btnLoading ? () => login(enteredUsername, enteredPassword) : null
            }
          >
            {btnLoading ? "Loading…" : "Login"}
          </Button>
        </div>
        <div className="account-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </Form.Group>
    </Form>
  );
}

export default LoginPage;
