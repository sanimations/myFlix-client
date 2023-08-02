export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
                <p>{movie.director.bio}</p>
                <p>Year of Birth: {movie.director.birth}</p>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
                <span>{movie.genre.description}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
