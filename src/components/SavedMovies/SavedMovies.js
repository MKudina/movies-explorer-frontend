import MoviesCardList from "../SavedMovies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";


function SavedMovies({ isSavesMovies, deleteMovie, searchMovie, typeSearchValue, onSubmitSearch, shortMovies,
                    setIsCheckbox, setIsMovies, typeMovies, typeFilterMovies, isCheckbox }) {
    return (
        <section className="saved-movies">
            <SearchForm searchMovie={searchMovie} typeSearchValue={typeSearchValue} onSubmitSearch={onSubmitSearch}
                        shortMovies={shortMovies} setIsCheckbox={setIsCheckbox} setIsMovies={setIsMovies}
                        typeMovies={typeMovies} typeFilterMovies={typeFilterMovies} isCheckbox={isCheckbox} />
            <MoviesCardList isSavesMovies={isSavesMovies} deleteMovie={deleteMovie} />
        </section>
    )
}

export default SavedMovies;