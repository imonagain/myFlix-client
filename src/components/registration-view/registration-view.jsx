import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

// import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");

  let isReq = true;
  if (!username) {
    setUsernameErr("Username Required");
    isReq = false;
  } else if (username.length < 2) {
    setUsernameErr("Username must be at least 5 characters long");
    isReq = false;
  }
  if (!password) {
    setPasswordErr("Password Required");
    isReq = false;
  } else if (password.length < 6) {
    setPasswordErr("Password must be at least 6 characters long");
    isReq = false;
  }
  if (!email) {
    setEmailErr("Email Required");
    isReq = false;
  } else if (email.indexOf("@") === -1) {
    setEmailErr("You must enter a valid email address");
    isReq = false;
  }
  // if (!birthday) {
  //   setBirthdayErr("Birthday Required");
  //   isReq = false;
  // } else if (birthday.length < 4) {
  //   setBirthdayErr("You must enter a valid date of birth");
  //   isReq = false;
  // }
  return isReq;
}

const handleRegister = (e) => {
  e.preventDefault();
  if (isReq) {
    axios
      .post("https://ohmymovies.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("Registration successful, please login!");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error registering the user");
      });
  }
};

return (
  <Container className="container-style">
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Create new account</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter a username"
                    required
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="6"
                    placeholder="Your password must be 6 or more characters"
                    required
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleRegister}
                >
                  Create Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  </Container>
);
