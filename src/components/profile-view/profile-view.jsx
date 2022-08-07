import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Stack,
  Container,
  Col,
  Row,
  Modal,
} from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

// import "./profile-view.scss";

export function ProfileView({ movies }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const [show, setShow] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`https://ohmymovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setFavoriteMovies(response.data.FavoriteMovies);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = () => {
    axios
      .put(
        `https://ohmymovies.herokuapp.com/users/${user}`,
        {
          Username: username,
          Email: email,
          Birthday: birthday,
          Password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        alert("Your profile has been updated");
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
      })
      .catch((e) => {
        console.log(error);
      });
  };

  const deleteUser = () => {
    setShowModal(false);
    axios
      .delete(`https://ohmymovies.herokuapp.com/users/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Your profile has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(error);
      });
  };

  const showFavoritesList = () => {
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {FavoriteMovies.length === 0 ? (
            <h5>List is empty</h5>
          ) : (
            FavoriteMovies.map((movieId, i) => (
              <Col key={`${i}-${movieId}`}>
                <MovieCard movie={movies.find((m) => m._id == movieId)} />
              </Col>
            ))
          )}
        </Row>
      );
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cancelUserModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, I don't want to delete my account
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            Yes, I want to delete my account
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          {/* <Button
            variant="outline-primary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button> */}
          <br />
          <h3>Your Profile Information</h3>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter new email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="birthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                type="date"
                placeholder="birthday"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <Stack direction="horizontal" gap={12}>
              <Button variant="primary" onClick={updateUser}>
                Update your profile
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button className="ms-auto" variant="danger" onClick={handleShow}>
                Delete your profile
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <h3>Favorite Movies:</h3>
          {showFavoritesList()}
        </Col>
      </Row>
      {cancelUserModal()}
    </Container>
  );
}
