import MoviesCardList from "../SavedMovies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import { useEffect } from "react";


function SavedMovies({ isSavesMovies, deleteMovie, searchMovie, typeSearchValue, onSubmitSearch, shortMovies,
                    setIsCheckboxSavedMovie, setIsMovies, typeMovies, isCheckboxSavedMovie, notFoundSaved, isLoanding,
                    setFilterSavedDurationMovies, setSearchValueSaved, isAllSavesMovies, setNotFoundSaved, setFilterSavedMovies }) 
{
    useEffect(() => {
        setSearchValueSaved('');
        setNotFoundSaved(false);
        setFilterSavedDurationMovies(isAllSavesMovies);
        setFilterSavedMovies(isAllSavesMovies)
        localStorage.setItem('isCheckedSavedMovie', 'false');
        setIsCheckboxSavedMovie(false);
    }, [setFilterSavedDurationMovies, isAllSavesMovies, setSearchValueSaved, setIsCheckboxSavedMovie, setNotFoundSaved, setFilterSavedMovies])
    return (
        <section className="saved-movies">
            <SearchForm searchMovie={searchMovie} typeSearchValue={typeSearchValue} onSubmitSearch={onSubmitSearch}
                        shortMovies={shortMovies} setIsCheckboxSavedMovie={setIsCheckboxSavedMovie} setIsMovies={setIsMovies}
                        typeMovies={typeMovies} isCheckboxSavedMovie={isCheckboxSavedMovie} />
            { isLoanding ? (
                <Preloader />
            ) : !isLoanding && notFoundSaved ? (
                <div className="saved-movies__not-found">{'Ничего не найдено'}</div>
            ) : !isLoanding && isSavesMovies.length > 0 ? (
                <MoviesCardList isSavesMovies={isSavesMovies} deleteMovie={deleteMovie} />
            ) : isSavesMovies.length === 0 && (
                <div className="saved-movies__no-movies">{'Пока что нет сохраненных фильмов'}</div>
            )}
            
        </section>
    )
}

export default SavedMovies;