import PropTypes from "prop-types";
import { Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";

export const ProfileView = ({ user, movies, token, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);

  let favMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  let handleSubmit = (event) => {
    console.log({ username });
    console.log({ password });
    console.log({ email });

    event.preventDefault();

    let userData = {
      Username: username,
      Password: password,
      Email: email,
    };

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
          localStorage.setItem("user", JSON.stringify(updatedUser)),
            setUser(JSON.parse(localStorage.getItem("user"))),
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
    ).then((response) => {
      localStorage.clear();
      alert("Bye!");
      setUser(null);
    });
  };

  return (
    <div>
      <div className="profile-details">
        <p>{user.Username}</p>
        <p>
          {new Date(user.Birthday).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
        <p>{user.Email}</p>
      </div>
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
      <Form onSubmit={handleSubmit} className="form-info">
        <Form.Group className="mb-3" controlId="UpdateUsername">
          <Form.Label>Enter New Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="UpdatePassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            Longer passwords are more secure
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="UpdateEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <p className="deregister-text">
          If you would like to delete your account, please click below
        </p>
        <Button
          variant="danger"
          size="lg"
          onClick={handleDeregister}
          className="deregister-button"
        >
          DELETE ACCOUNT
        </Button>
      </div>
    </div>
  );
};
