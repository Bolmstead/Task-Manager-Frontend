import { useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import UserContext from "../UserContext.js";

function NavigationBar() {
  const { logout, loggedInUser } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary ml-auto">
      {loggedInUser ? (
        <Container>
          <Navbar.Brand>Hi, {loggedInUser.username}!</Navbar.Brand>
          <Navbar.Text>
            {loggedInUser.isClient
              ? "As a Client, you can view your assigned Tasks. To respond to a task, click on a task from the list."
              : "As an Admin, you can create and view all Tasks. To see a Client's response, click on a task from the list."}
          </Navbar.Text>
          <Nav className="justify-content-end">
            {loggedInUser.isClient ? (
              <Nav>
                <Nav.Link>
                  {" "}
                  <Link className="appbar-link" to="/my-tasks">
                    My Tasks{" "}
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={logout}>logout</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  {" "}
                  <Link className="appbar-link" to="/create-task">
                    Create Task
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="appbar-link" to="/all-tasks">
                    All Tasks
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={logout}>logout</Nav.Link>
              </Nav>
            )}
          </Nav>
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
