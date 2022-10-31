import MoviesCardList from "../SavedMovies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";


function SavedMovies() {
    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList />
        </section>
    )
}

export default SavedMovies;