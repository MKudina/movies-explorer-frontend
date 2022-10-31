import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../SavedMovies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";


function SavedMovies() {
    return (
        <section className="saved-movies">
            <Header />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    )
}

export default SavedMovies;