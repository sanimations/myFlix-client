import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    /*const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);*/ 

    useEffect(() => {
        if (!token) {
          return;
        }
    
        fetch("https://queer-films-a4556bef0856.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((response) => response.json())
          .then((movies) => {
            setMovies(movies);
          });
      }, [token]);

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



    if (!user) {
        return (
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
                <div>There is no list!</div>;
            </>
        );
    }

    return (
        <div>
            <button
                onClick={() => { 
                    setUser(null);
                    setToken(null); 
                    localStorage.clear();
                }}
            >
                Logout
            </button>
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
