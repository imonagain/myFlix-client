import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

// import "./main-view.scss";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registered: null,
      user: null,
    };
  }

  // When a movie is clicked, this function is invoked & updates state of 'selectedMovie' property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  //  When a user successfully logs in, this function updates 'user' property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get("https://ohmymovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegister(registered) {
    this.setState({
      registered,
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (registered) {
      return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;
    }

    if (!user) {
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(bool) => this.onRegister(bool)}
        />
      );
    }

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        <button
          onClick={() => {
            this.onLoggedOut();
          }}
        >
          Logout
        </button>
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}

export default MainView;
