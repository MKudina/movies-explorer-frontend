function MoviesCard({ movie, saveMovie, deleteMovie, isSavesMovies }) {

    const savedMovies = isSavesMovies;    
    const isLiked = (savedMovies.length > 0 && savedMovies.some((item) => {
        return item.nameRU === movie.nameRU;
    })) || false;
    const savedMovie = (
        savedMovies.length > 0 && savedMovies.filter((item) => {
            return item.movieId === movie.id && item;
        })) || false;

    function handelSaveMovie (){
        if(!isLiked){
            saveMovie(movie)
        } else {
            deleteMovie(savedMovie[0])
        }
    }

    return (
        <div className="movies-card">
            <a href={movie.trailerLink} className='movies-card__link' target='__blank' >
                <img src={`https://api.nomoreparties.co/${movie.image.url}`} className='movies-card__image' alt={movie.nameRU}/>
            </a>
            <div className="movies-card__element">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <button type='button' className={`movies-card__like ${isLiked && 'movies-card__like_liked'}`}
                onClick={handelSaveMovie} />
            </div>
            <p className="movies-card__duration">{movie.duration}</p>
        </div>
    )
}

export default MoviesCard;