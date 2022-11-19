import { useEffect, useState } from "react";
import { ADD_NUMBER_FILM_DESCTOP, ADD_NUMBER_FILM_MOBILE, ADD_NUMBER_FILM_TABLET, NUMBER_FILMS_DESCTOP, NUMBER_FILMS_MOBILE, NUMBER_FILMS_TABLET, WIDTH_DESCTOP, WIDTH_TABLET } from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isMovies, saveMovie, deleteMovie, isSavesMovies }) {

    const [numberOfFilms, setNumberOfFilms] = useState(0)

    useEffect(() => {
        if(window.innerWidth >= WIDTH_DESCTOP){
            setNumberOfFilms(NUMBER_FILMS_DESCTOP);
        } else if (window.innerWidth >= WIDTH_TABLET) {
            setNumberOfFilms(NUMBER_FILMS_TABLET);
        } else {
            setNumberOfFilms(NUMBER_FILMS_MOBILE);
        }
    }, [setNumberOfFilms])

    function handleMoreFilms(){
        if(window.innerWidth >= 1180){
            setNumberOfFilms(numberOfFilms + ADD_NUMBER_FILM_DESCTOP);
        } else if (window.innerWidth >= 768) {
            setNumberOfFilms(numberOfFilms + ADD_NUMBER_FILM_TABLET);
        } else {
            setNumberOfFilms(numberOfFilms + ADD_NUMBER_FILM_MOBILE);
        }
    }

    return (
        <div className="movies-card-list">
            <template className="movies-card-list__list">
                { isMovies.map((movie, index) => {
                    return (
                        index <= numberOfFilms && (
                            <MoviesCard movie={movie} key={movie.id} saveMovie={saveMovie}
                                        deleteMovie={deleteMovie} isSavesMovies={isSavesMovies} />
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