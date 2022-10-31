import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <div className="searchform">
            <form className="searchform__form">
                <div className="searchform__icon"></div>
                <input className="searchform__input" name="movie" placeholder="Фильм"></input>
                <button type="submit" className="searchform__submit"></button>
            </form>
            <FilterCheckbox />
        </div>
    )
}

export default SearchForm;