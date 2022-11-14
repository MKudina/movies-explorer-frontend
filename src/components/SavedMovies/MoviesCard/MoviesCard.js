function MoviesCard({ movie, deleteMovie }) {
    async function handleDelete(){
        deleteMovie(movie);
    }

    return (
        <div className="movies-card">
            <a href={movie.trailerLink} className='movies-card__link' target='__blank' >
                <img src={movie.image} className='movies-card__image' alt={movie.nameRU}/>
            </a>
            <div className="movies-card__element">
                <h2 className="movies-card__title">{movie.nameRU}</h2>
                <input type='checkbox' className="movies-card__like movies-card__like_liked" onClick={handleDelete} />
            </div>
            <p className="movies-card__duration">{movie.duration}</p>
        </div>
    )
}

export default MoviesCard;