import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies({ isMovies, saveMovie, searchMovie, typeSearchValue, onSubmitSearch, 
                shortMovies, setIsCheckbox, setIsMovies, isLoanding, deleteMovie, 
                typeMovies, typeFilterMovies, isCheckbox }) {
    return (
        <section className="movies">
            <SearchForm searchMovie={searchMovie} typeSearchValue={typeSearchValue} onSubmitSearch={onSubmitSearch}
                        shortMovies={shortMovies} setIsCheckbox={setIsCheckbox} setIsMovies={setIsMovies}
                        typeMovies={typeMovies} typeFilterMovies={typeFilterMovies} isCheckbox={isCheckbox}
                        isLoanding={isLoanding} />
            { isLoanding ? (
                <Preloader />
            ) : !isLoanding && isMovies.length === 0 ? (
                <div className="movies__not-found">{'Фильм не найден'}</div>
            )  : !isLoanding && isMovies.length > 0 && (
                <MoviesCardList isMovies={isMovies} saveMovie={saveMovie}
                                deleteMovie={deleteMovie} />
            )}

        </section>
    )
}

export default Movies;