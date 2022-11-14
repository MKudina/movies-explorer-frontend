function FilterCheckbox({ shortMovies, setIsCheckbox, isCheckbox, typeFilterMovies }) {
    function handleChecked(){
        if(localStorage.getItem('isChecked') === 'false') {
            localStorage.setItem('isChecked', 'true')
            setIsCheckbox(true);
            shortMovies(typeFilterMovies);
        } else {
            localStorage.setItem('isChecked', 'false')
            setIsCheckbox(false);
            shortMovies(typeFilterMovies);
        }
    }

    return (
        <div className="filtercheckbox">
            <input type='checkbox' className="filtercheckbox__checkbox" onChange={handleChecked} 
                    checked={isCheckbox} ></input>
            <h2 className="filtercheckbox__title">Короткометражки</h2>
        </div>
    )

}

export default FilterCheckbox;