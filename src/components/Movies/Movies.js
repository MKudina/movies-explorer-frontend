import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    )
}

export default Movies;