import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  console.log("this is movies: ", movies);
  console.log("movieId: ", movieId);

  const movie = movies.find((m) => m.id === movieId);

  console.log("This is movie: ", movie);
  return (
    <div className="movie-container">
      <img src={movie.image} className="movie-poster" alt="Movie Poster" />

      <div className="movie-info">
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.name}</span>
          <p>{movie.director.bio}</p>
          <p>Year of Birth: {movie.director.birth}</p>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
          <p>{movie.genre.description}</p>
        </div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    </div>
  );
};
