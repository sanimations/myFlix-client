import PropTypes from "prop-types";
import {Button,Card} from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Button>
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        directorName: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};