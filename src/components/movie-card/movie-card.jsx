import React from "react";
import PropTypes from "prop-types";
import {Button,Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ user, movie }) => {
    console.log({user});

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={ `/movie/` + movie.id}>
                <Button variant="link">Open</Button>
                </Link>
                {/* <Link to={ `/users/` + user.Username + `/movies/` + movie.id}>
                <Button variant="link">Add/Remove Favorite</Button>
                </Link> */}
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
    }).isRequired
};