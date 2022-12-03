import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isSavesMovies, deleteMovie }) {
    return (
        <div className="movies-card-list">
            <div className="movies-card-list__list">
                { isSavesMovies.map((movie) => {
                        return (
                            (
                                <MoviesCard movie={movie} key={movie._id} deleteMovie={deleteMovie} />
                            )
                        );
                })}
            </div>
            { isSavesMovies.length === 0 && (
                    <div className="movies-card-list__no-movies">{'Пока что нет сохраненных фильмов'}</div>
                ) }
        </div>
    )
}

export default MoviesCardList;