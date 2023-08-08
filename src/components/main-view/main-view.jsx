import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://queer-films-a4556bef0856.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        director: {
                            name: movie.Director.Name,
                            bio: movie.Director.Bio,
                            birth: movie.Director.Birth,
                        },
                        genre: {
                            name: movie.Genre.Name,
                            description: movie.Genre.Description,
                        },
                        image: `https://queer-films-a4556bef0856.herokuapp.com/images/${movie.ImagePath}`
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>There is no list!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
