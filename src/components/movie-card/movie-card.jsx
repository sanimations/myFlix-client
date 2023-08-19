import React from "react";
import PropTypes from "prop-types";
import {Button,Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={ `/movie/` + movie.id}>
                <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        directorName: PropTypes.string
    }).isRequired
};