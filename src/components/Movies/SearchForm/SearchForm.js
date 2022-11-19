import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({ searchMovie, typeSearchValue, onSubmitSearch, shortMovies, setIsCheckbox, typeMovies,
                     isCheckbox, isLoanding, setIsCheckboxSavedMovie, isCheckboxSavedMovie }) 
{

    const [noValue, setNoValue] = useState('');

    function handleChange(e){
        const value = e.target.value;
        if(value.length === 0) {
            setNoValue('Нужно ввести ключевое слово.');
        } else {
            setNoValue('');
        }
        searchMovie(value)
    }

    function handleSubmit(e){
        e.preventDefault();
        onSubmitSearch(typeMovies, typeSearchValue);
    }

    useEffect(() => {
        setNoValue(noValue);
    }, [noValue])

    return (
        <div className="searchform">
            <form className="searchform__form" onSubmit={handleSubmit}>
                <label htmlFor="searchform-input" className="searchform__button searchform__button_search"></label>
                <input className="searchform__input" name="movie" placeholder="Фильм" id="searchform-input"
                        onChange={handleChange} value={typeSearchValue} minLength={1} required />
                <button type="submit" className="searchform__button searchform__button_submit" disabled={isLoanding || typeSearchValue.length === 0} />
            </form>
            <div className="searchform__no-value">{noValue}</div>
            <FilterCheckbox shortMovies={shortMovies} setIsCheckbox={setIsCheckbox}  isCheckboxSavedMovie={isCheckboxSavedMovie}
                            isCheckbox={isCheckbox} setIsCheckboxSavedMovie={setIsCheckboxSavedMovie} />
        </div>
    )
}

export default SearchForm;