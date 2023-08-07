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
                console.log(data);
                console.log(data.movies);
                //data.movies.map throws an error with map so I am trying data.map, but that still doens't work
                const moviesFromApi = data.map((movie) => {
                    console.log('1' + movie);
                    return {
                        id: movie.key,
                        title: movie.title,
                        description: movie.description,
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birth: movie.Director.Birth,
                        },
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description,
                        },
                        imagepath: `https://covers.openlibrary.org/b/id/${movie.cover_i}-L.jpg`
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
