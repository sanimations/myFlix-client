import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies }) => {
  let favMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

//   updateUsername = () => {

//     const userData = {
//       username: username
//     };
//     fetch("https://queer-films-a4556bef0856.herokuapp.com/users/" + user.username, {
//       method: "PUT",
//       headers: {"Content-Type": "application/json", Authorization:  `Bearer ${token}`},
//       body: JSON.stringify(userData)
//  .then((response) => response.json())
//   .then((newUsername) => {
//     if(newUsername.username) {
//       localStorage.setItem("user", JSON.stringify(newUsername.username));
//       localStorage.setItem("userObject", JSON.stringify(newUsername.username));
//       alert("Username Updated!  Hello, " + newUsername.username)
//     }
//     else {
//       console.error("Error: " + error);
//       alert("Could not update username")
//     }
//   })
// })};



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
