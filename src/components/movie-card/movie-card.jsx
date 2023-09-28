import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ user, movie, token, setUser }) => {
  const isFavorite = user.FavoriteMovies.includes(movie.id);
  
  const toggleFav = () => {
    const url =
    "https://queer-films-a4556bef0856.herokuapp.com/users/" +
      user.Username +
      "/movies/" +
      movie.id;

    const method = isFavorite ? "DELETE" : "POST";
    
      fetch( url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movie),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(JSON.parse(localStorage.getItem("user")));
        });
    }; 
  
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Director: {movie.director.name}</Card.Text>
        <Link to={`/movie/` + movie.id}>
          <Button variant="primary">Info</Button>
        </Link>
        <span> </span>
        <Button variant = {isFavorite ? "danger" : "dark"} onClick={() => toggleFav(user, movie, token)}>
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
