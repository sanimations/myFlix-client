import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://queer-films-a4556bef0856.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(data.movies);
                const moviesFromApi = data.movies.map((movie) => {
                    console.log('1' + data.movies);
                    return {
                        id: movie.key,
                        title: movie.title,
                        description: movie.description,
                        director: {
                            name: movie.director.name,
                            bio: movie.director.bio,
                            birth: movie.director.birth,
                        },
                        genre: {
                            name: movie.genre.name,
                            description: movie.genre.description,
                        },
                        image: `https://covers.openlibrary.org/b/id/${movie.cover_i}-L.jpg`
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

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
