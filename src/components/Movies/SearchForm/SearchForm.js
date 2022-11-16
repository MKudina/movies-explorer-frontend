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
            <form className="searchform__form" onSubmit={handleSubmit}>
                <label htmlFor="searchform-input" className="searchform__button searchform__button_search"></label>
                <input className="searchform__input" name="movie" placeholder="Фильм" id="searchform-input"
                        onChange={handleChange} value={typeSearchValue} minLength={1} required />
                <button type="submit" className="searchform__button searchform__button_submit" disabled={isLoanding || typeSearchValue.length === 0} />
            </form>
            <div className="searchform__not-found">{typeSearchValue.length === 0 && 'Введите ключевое слово'}</div>
            <FilterCheckbox shortMovies={shortMovies} setIsCheckbox={setIsCheckbox} 
                            typeFilterMovies={typeFilterMovies} isCheckbox={isCheckbox} />
        </div>
    )
}

export default SearchForm;