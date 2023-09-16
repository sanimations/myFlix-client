import PropTypes from "prop-types";
import { Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, token }) => {
  const [userData, setUserData] = useState({});
  // let userUsername = userData.Username;
  // let userPass = userData.Password;
  // let userEmail = userData.Email;

  let favMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  let handleSubmit = (event) => {
    console.log(user.Username);
    event.preventDefault();
    fetch(
      "https://queer-films-a4556bef0856.herokuapp.com/users/" + user.Username,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser.Username) {
            (user.Username = updatedUser.Username),
            localStorage.setItem("user", JSON.stringify(user.Username)),
            (user.Email = updatedUser.Email),
            (user.Password = updatedUser.Password);
          alert("User info Updated!");
        } else {
          console.error("Error: " + error);
          alert("Error updated information");
        }
      })
      .catch((error) => {
        console.error("Error 2: " + error);
      });
  };

  return (
    <div>
      <p>{user.Username}</p>
      <p>{user.Birthday}</p>
      <p>{user.Email}</p>
      <div>
        <Row>
          {favMovies.map((movie) => {
            return (
              <Col className="mb-9" key={movie.id} md={4}>
                <MovieCard movie={movie} user={user} token={token}/>
              </Col>
            );
          })}
        </Row>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="UpdateUsername">
          <Form.Label>New Username</Form.Label>
          <Form.Control
            type="text"
            value={userData.Username}
            onChange={(e) => setUserData(e.target.value)}
            // placeholder="ExampleUsername"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="UpdatePassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={userData.Password}
            onChange={(e) => setUserData(e.target.value)}
          />
          <Form.Text className="text-muted">
            Longer passwords are more secure
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="UpdateEmail">
          <Form.Label>New Email</Form.Label>
          <Form.Control
            type="email"
            value={userData.Email}
            onChange={(e) => setUserData(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          // onClick={() => handleChange(user, token)}
          // onClick={() => setUserData((user.Username = userData.Username))}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
