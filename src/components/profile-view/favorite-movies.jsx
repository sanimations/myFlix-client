import React from "react";
import { Row, Col } from "react-bootstrap";

function FavoriteMovies(favMovies) {
  <div>
    <Row>
      {favMovies.map((movie) => {
        return (
          <Col className="mb-5" key={movie.id} md={6}>
            <MovieCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  </div>
}
