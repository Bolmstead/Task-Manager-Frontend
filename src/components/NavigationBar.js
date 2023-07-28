import { useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import UserContext from "../UserContext.js";

function NavigationBar() {
  const { logout, loggedInUser } = useContext(UserContext);

  return (
    <Navbar className="bg-body-tertiary">
      {loggedInUser ? (
        <Container>
          <Navbar.Brand>Hi, {loggedInUser.username}! </Navbar.Brand>

          <Navbar id="basic-navbar-nav">
            <Nav className="justify-content-end">
              {loggedInUser.isClient ? (
                <Nav>
                  {" "}
                  <Link className="appbar-link" to="/my-tasks">
                    My Tasks{" "}
                  </Link>
                  <Nav.Link onClick={logout}>logout</Nav.Link>
                </Nav>
              ) : (
                <Nav>
                  {" "}
                  <Link className="appbar-link" to="/create-task">
                    Create Task
                  </Link>
                  <Link className="appbar-link" to="/all-tasks">
                    All Tasks
                  </Link>
                  <Nav.Link onClick={logout}>logout</Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar>
        </Container>
      ) : (
        <Container>
          <Navbar.Brand>Welcome!</Navbar.Brand>
        </Container>
      )}
    </Navbar>
  );
}

export default NavigationBar;
