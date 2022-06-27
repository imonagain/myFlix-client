import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

// import "./navbar-view.scss";

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Container>
      <Navbar className="main-nav" sticky="top" bg="dark" variant="dark">
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to={"/"} href="#home">
            ohmymovies
          </Navbar.Brand>

          <Nav className="me-auto navbar-elements__style">
            {isAuth() && (
              <Nav.Link as={Link} to={`/`}>
                Movies
              </Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>
                Profile
              </Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/`}>
                Login
              </Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/register`}>
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}
