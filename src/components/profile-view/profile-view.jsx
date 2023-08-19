import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies }) => {
  let favMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  return (
    <div>
      {user.Username}

      <p>{user.Birthday}</p>
      <p>{user.Email}</p>
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
    </div>
  );
};
