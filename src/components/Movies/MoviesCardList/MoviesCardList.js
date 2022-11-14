import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isMovies, saveMovie, deleteMovie }) {

    const [numberOfFilms, setNumberOfFilms] = useState(0)

    useEffect(() => {
        if(window.innerWidth >= 1180){
            setNumberOfFilms(11);
        } else if (window.innerWidth >= 768) {
            setNumberOfFilms(7);
        } else {
            setNumberOfFilms(4);
        }
    }, [setNumberOfFilms])

    function handleMoreFilms(){
        if(window.innerWidth >= 1180){
            setNumberOfFilms(numberOfFilms + 4);
        } else if (window.innerWidth >= 768) {
            setNumberOfFilms(numberOfFilms + 2);
        } else {
            setNumberOfFilms(numberOfFilms + 1);
        }
    }

    return (
        <div className="movies-card-list">
            <template className="movies-card-list__list">
                { isMovies.map((movie, index) => {
                    return (
                        index <= numberOfFilms && (
                            <MoviesCard movie={movie} key={movie.id} saveMovie={saveMovie}
                                        deleteMovie={deleteMovie} />
                        )
                    );
                })}
            </template>
            
            <button type="button" 
            className={`movies-card-list__button ${numberOfFilms > isMovies.length && 'movies-card-list__button_disable'}`}
            onClick={handleMoreFilms}>Ещё</button>
        </div>
    )
}

export default MoviesCardList;