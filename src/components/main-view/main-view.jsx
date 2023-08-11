import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) {
            console.log("Token is not available");
            return;
        }
        console.log("Fetching movies with token: ", token);
        fetch("https://queer-films-a4556bef0856.herokuapp.com/movies",
            //fetch("http://localhost:8080/movies",
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Movies response: ", data);
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
                        image: `${movie.ImagePath}`
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);



    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }} />
                    <p>or</p>
                    <SignupView />
                </Col>

            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
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
                    <div>There is no list!</div>
                </>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                    <button
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>
                </>
            )}
        </Row>
    );
};