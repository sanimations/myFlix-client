import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ user, movie, token, setUser }) => {
  let toggleFav = (user, movie, token) => {
    let match = user.FavoriteMovies.filter((m) => m == movie.id);

    if (match[0] == undefined) {
      fetch(
        "https://queer-films-a4556bef0856.herokuapp.com/users/" +
          user.Username +
          "/movies/" +
          movie.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movie),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(JSON.parse(localStorage.getItem("user")));
        });
    } else {
      fetch(
        "https://queer-films-a4556bef0856.herokuapp.com/users/" +
          user.Username +
          "/movies/" +
          movie.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movie),
        }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(JSON.parse(localStorage.getItem("user")));
      });
    }
  };
  
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Link to={`/movie/` + movie.id}>
          <Button variant="primary">Open</Button>
        </Link>
        <span> </span>
        <Button variant = "dark" onClick={() => toggleFav(user, movie, token)}>
          Add/Remove Favorite
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
