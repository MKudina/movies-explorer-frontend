import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <div className="searchform">
            <form className="searchform__form">
                <label htmlFor="searchform-input" className="searchform__button searchform__button_search"></label>
                <input className="searchform__input" name="movie" placeholder="Фильм" id="searchform-input" required></input>
                <button type="submit" className="searchform__button searchform__button_submit"></button>
            </form>
            <FilterCheckbox />
        </div>
    )
}

export default SearchForm;