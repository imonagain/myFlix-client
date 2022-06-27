import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
    };
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://ohmymovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }

  addFavoriteMovie = () => {
    let userFavorites = this.state.FavoriteMovies;
    let isFav = userFavorites.includes(this.props.movie._id);
    if (!isFav) {
      axios
        .post(
          `https://ohmymovies.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert(
            `${this.props.movie.Title} has been added to your list of movies`
          );
          window.open(`/movies/${this.props.movie._id}`, "_self");
        })
        .catch((e) => {
          console.log("Error");
        });
    } else if (isFav) {
      alert(
        `${this.props.movie.Title} is already present in your list of movies`
      );
    }
  };

  removeFavoriteMovie = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(
        `https://ohmymovies.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(
          `${this.props.movie.Title} has been removed from your list of movies`
        );
        window.open(`/movies/${this.props.movie._id}`, "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  render() {
    const { movie, onBackClick } = this.props;
    let userFavorites = this.state.FavoriteMovies;
    let isFav = userFavorites.includes(this.props.movie._id);

    // FIXME Bootstrap styling

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {/* <Card.Img
                  className="movie-view__image"
                  variant="top"
                  src={movie.ImagePath}
                /> */}
                <Card.Title>
                  <h3>{movie.Title}</h3>
                </Card.Title>
                <Card.Text>
                  <b>Genre:&nbsp;</b>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    {movie.Genre.Name}
                  </Link>
                  <br />
                  <b>Director: &nbsp;</b>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    {movie.Director.Name}
                  </Link>
                  <br />
                  <b>Description: </b>
                  <br />
                  {movie.Description}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
                &nbsp;&nbsp;
                {!isFav && (
                  <Button
                    className="add-list__button"
                    variant="primary"
                    onClick={this.addFavoriteMovie}
                  >
                    Add to your Favorites
                  </Button>
                )}
                {isFav && (
                  <Button
                    className="add-list__button"
                    variant="secondary"
                    onClick={this.removeFavoriteMovie}
                  >
                    Remove from your list
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
