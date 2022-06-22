import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Card, CardGroup, Container } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="movie-view">
                  {/* <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div> */}
                  <Card.Title>
                    <div className="movie-title">
                      {/* <span className="label">Title: </span> */}
                      <span className="value">{movie.Title}</span>
                    </div>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <div className="movie-genre">
                      {/* <span className="label">Genre: </span> */}
                      <span className="value">{movie.Genre.Name}</span>
                    </div>
                  </Card.Subtitle>
                  <Card.Text>
                    <div className="movie-director">
                      <span className="label">Director: </span>
                      <span className="value">{movie.Director.Name}</span>
                    </div>
                    <div className="movie-year">
                      <span className="label">Year: </span>
                      <span className="value">{movie.Year}</span>
                    </div>
                    <div className="movie-description">
                      <span className="label">Description: </span>
                      <span className="value">{movie.Description}</span>
                    </div>
                  </Card.Text>

                  <Button
                    variant="primary"
                    onClick={() => {
                      onBackClick(null);
                    }}
                  >
                    Back
                  </Button>
                </div>
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
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  Genre: PropTypes.shape({
    Name: PropTypes.string,
  }),
  Year: PropTypes.string.isRequired,
  Description: PropTypes.string,

  onBackClick: PropTypes.func.isRequired,
};
