import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies({ isMovies, saveMovie, searchMovie, typeSearchValue, onSubmitSearch, 
                shortMovies, setIsCheckbox, setIsMovies, isLoanding, deleteMovie, 
                typeMovies, isCheckbox, isSavesMovies, notFound }) {
    return (
        <section className="movies">
            <SearchForm searchMovie={searchMovie} typeSearchValue={typeSearchValue} onSubmitSearch={onSubmitSearch}
                        shortMovies={shortMovies} setIsCheckbox={setIsCheckbox} setIsMovies={setIsMovies}
                        typeMovies={typeMovies} isCheckbox={isCheckbox}
                        isLoanding={isLoanding} />
            { isLoanding ? (
                <Preloader />
            ) : !isLoanding && notFound ? (
                <div className="movies__not-found">{'Ничего не найдено'}</div>
            )  : !isLoanding && isMovies.length > 0 && (
                <MoviesCardList isMovies={isMovies} saveMovie={saveMovie}
                                deleteMovie={deleteMovie} isSavesMovies={isSavesMovies} />
            )}

        </section>
    )
}

export default Movies;