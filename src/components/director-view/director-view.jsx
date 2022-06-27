import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

// import "./director-view.scss";

// TODO Needs styling

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Card>
          <Card.Header>
            <h3>{director.Name}</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <b>Biography: &nbsp;</b>
              {director.Bio}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                onBackClick();
              }}
            >
              Return
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
