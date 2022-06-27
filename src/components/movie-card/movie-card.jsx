import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

// import "./movie-card.scss";
// REVIEW WAD; fix styling
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    // FIXME Fix Card, Card.Img, Button styling

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              {/* <Card.Img
                variant="top"
                className="image-style"
                src={movie.ImagePath}
              /> */}
              <Card.Body>
                <Card.Title className="title-style">{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                  <Button className="button-style" variant="warning">
                    View
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
};
