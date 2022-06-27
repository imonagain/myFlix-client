import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  CardGroup,
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
      .catch((e) => {
        console.log(error);
      });
  };

  const updateUser = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
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
        console.log("Error");
      });
  };

  const deleteUser = () => {
    setShowModal(false);
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
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
        console.log("Error");
      });
  };

  const showFavoritesList = () => {
    console.log(movies);
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {FavoriteMovies.length === 0 ? (
            <h5>Add some movies to your list</h5>
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
      <Modal
        style={{ background: "transparent" }}
        show={show}
        onHide={handleClose}
      >
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
      // <DeleteModal />
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Your Profile Information</h3>
        </Col>
      </Row>
      <Row>
        <Col>**INSERT PROFILE INFORMATION**</Col>
      </Row>
      <Row>
        <Col>
          <h3>Favorite Movies:</h3>
          {showFavoritesList()}
        </Col>
      </Row>
    </Container>
  );
}
