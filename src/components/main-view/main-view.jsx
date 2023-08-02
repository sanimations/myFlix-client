import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Tangerine",
            description: "A sex worker tears through Tinseltown on Christmas Eve searching for the pimp who broke her heart.",
            director: {
                name: "Sean Baker",
                bio: "Sean is an American film director, cinematographer, producer, screenwriter, and editor.",
                birth: "1971"
            },
            genre: {
                name: "Drama",
                description: "Drama films are serious presentations or stories with settings or life situations that portray characters in conflict with either themselves, others, or forces of nature."
            },
            image:
                "https://cdn.posteritati.com/posters/000/000/048/886/tangerine-md-web.jpg"
        },
        {
            id: 2,
            title: "Happy Together",
            description: "A couple take a trip to Argentina but both men find their lives drifting apart in opposite directions.",
            director: {
                name: "Wong Kar-Wai",
                bio: "Wong is a Hong Kong film director, screenwriter, and producer.  His films are characterized by nonlinear narratives, atmospheric music, and vivid cinematography involving bold, saturated colors.",
                birth: "1958"
            },
            genre: {
                name: "Drama",
                description: "Drama films are serious presentations or stories with settings or life situations that portray characters in conflict with either themselves, others, or forces of nature."
            },
            image:
                "https://cdn.posteritati.com/posters/000/000/065/518/happy-together-md-web.jpg"
        },
        {
            id: 3,
            title: "Love, Simon",
            description: "Simon Spier keeps a huge secret from his family, his friends and all of his classmates: he's gay. When that secret is threatened, Simon must face everyone and come to terms with his identity.",
            director: {
                name: "Greg Berlanti",
                bio: "Greg is an American screenwriter, producer and director of film and television.",
                birth: "1972"
            },
            genre: {
                name: "Coming-of-age",
                description: "The coming-of-age genre is a type of movie focused on a child or teenager's transition from childhood to young adulthood. Typically a protagonist faces a new challenge in which they begin to lose their childhood innocence."
            },
            image:
                "https://m.media-amazon.com/images/I/A187OuRGI2L._AC_UF894,1000_QL80_.jpg"
        },
        {
            id: 4,
            title: "Saving Face",
            description: "A gay Chinese-American and her traditionalist mother are reluctant to go public with secret loves that clash against cultural expectations.",
            director: {
                name: "Alice Wu",
                bio: "Alice is an American film director and screenwriter, known for her films Saving Face (2004) and The Half of It (2020)",
                birth: "1970"
            },
            genre: {
                name: "Comedy",
                description: "A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement."
            },
            image:
                "https://media-cache.cinematerial.com/p/500x/ea43hmux/saving-face-poster.jpg?v=1456189335"
        },
        {
            id: 5,
            title: "But I'm a Cheerleader",
            description: "A naive teenager is sent to rehab camp when her straitlaced parents and friends suspect her of being a lesbian.",
            director: {
                name: "Jamie Babbit",
                bio: "Jamie is an American director, producer, and screenwriter.",
                birth: "1970"
            },
            genre: {
                name: "Satire",
                description: "Satire is a film genre in the fictional or pseudo-fictional category that employs satirical techniques, be it of a political, religious, or social variety."
            },
            image:
                "https://m.media-amazon.com/images/I/61Ub079TGiL._AC_UF894,1000_QL80_.jpg"
        }
    ]);

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
