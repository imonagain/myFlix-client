import React, { useState } from "react";
import {
  Form,
  Col,
  Row,
  Button,
  Card,
  CardGroup,
  Container,
} from "react-bootstrap";

import "./registration-view.scss";

//user registration form taking necessary user details
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Register New User</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password must be 8 or more characters"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter an email"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Please enter a birthdate"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleRegister}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
