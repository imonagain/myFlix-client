import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

// import "./movie-card.scss";
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    // FIXME Fix Card, Card.Img, Button styling

    return (
      <Card className="card-style">
        <Card.Img variant="top" className="image-style" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="title-style">{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button-style" variant="warning">
              View
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
};
