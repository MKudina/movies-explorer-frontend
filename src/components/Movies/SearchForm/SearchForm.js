import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({ searchMovie, typeSearchValue, onSubmitSearch, shortMovies, setIsCheckbox, typeMovies,
                    typeFilterMovies, isCheckbox, isLoanding }) {

    function handleChange(e){
        const value = e.target.value;
        searchMovie(value)
    }

    function handleSubmit(e){
        e.preventDefault();
        onSubmitSearch(typeMovies, typeSearchValue);
    }

    return (
        <div className="searchform">
            <form className="searchform__form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="searchform-input" className="searchform__button searchform__button_search"></label>
                <input className="searchform__input" name="movie" placeholder="Фильм" id="searchform-input"
                        onChange={handleChange} value={typeSearchValue} required></input>
                <button type="submit" className="searchform__button searchform__button_submit" disabled={isLoanding} ></button>
            </form>
            <FilterCheckbox shortMovies={shortMovies} setIsCheckbox={setIsCheckbox} 
                            typeFilterMovies={typeFilterMovies} isCheckbox={isCheckbox} />
        </div>
    )
}

export default SearchForm;