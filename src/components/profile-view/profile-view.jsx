import PropTypes from "prop-types";
import { Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, token, setUser }) => {
  const [userData, setUserData] = useState({});

  let favMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  let handleSubmit = (event) => {
    console.log({userData});
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
            localStorage.setItem("user", JSON.stringify(updatedUser.Username)),
            setUser(JSON.parse(localStorage.getItem("user"))),
            // (user.Email = updatedUser.Email),
            // localStorage.setItem("user", JSON.stringify(user.Email)),
            // (user.Password = updatedUser.Password),
            // localStorage.setItem("user", JSON.stringify(user.Password)),
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

  let handleDeregister = () => {
    fetch(
      "https://queer-films-a4556bef0856.herokuapp.com/users/" + user.Username,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        localStorage.clear();
        alert("Bye!");
        setUser(null);
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
                <MovieCard
                  movie={movie}
                  user={user}
                  token={token}
                  setUser={setUser}
                />
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
      <p>If you would like to delete your account, please click below</p>
      <Button
          variant="danger"
          size = "lg"
          onClick={handleDeregister}
          // onClick={() => handleChange(user, token)}
          // onClick={() => setUserData((user.Username = userData.Username))}
        >
          DELETE ACCOUNT
        </Button>
    </div>
  );
};
