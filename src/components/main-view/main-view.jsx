import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://queer-films-a4556bef0856.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        description: doc.description,
                        director: {
                            name: doc.director.name,
                            bio: doc.director.bio,
                            birth: doc.director.birth,
                        },
                        genre: {
                            name: doc.genre.name,
                            description: doc.genre.description,
                        },
                        image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
                        directorName: doc.director_name?.[0]
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
