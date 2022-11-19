function FilterCheckbox({ shortMovies, setIsCheckbox, isCheckbox, setIsCheckboxSavedMovie, isCheckboxSavedMovie }) {
    function handleChecked(){
        if(window.location.pathname === '/movies'){
        if(localStorage.getItem('isChecked') === 'false') {
            localStorage.setItem('isChecked', 'true');
            setIsCheckbox(true);
            shortMovies();
        } else {
            localStorage.setItem('isChecked', 'false');
            setIsCheckbox(false);
            shortMovies();
        }}
        if(window.location.pathname === '/saved-movies'){
        if(localStorage.getItem('isCheckedSavedMovie') === 'false') {
            localStorage.setItem('isCheckedSavedMovie', 'true');
            setIsCheckboxSavedMovie(true);
            shortMovies();
        } else {
            localStorage.setItem('isCheckedSavedMovie', 'false');
            setIsCheckboxSavedMovie(false);
            shortMovies();
        }}
    }

    return (
        <div className="filtercheckbox">
            <input type='checkbox' className="filtercheckbox__checkbox" onChange={handleChecked} 
                    checked={window.location.pathname ? isCheckbox : isCheckboxSavedMovie ?? false} ></input>
            <h2 className="filtercheckbox__title">Короткометражки</h2>
        </div>
    )

}

export default FilterCheckbox;