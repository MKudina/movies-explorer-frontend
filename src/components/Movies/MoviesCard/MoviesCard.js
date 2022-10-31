import imagesCard from '../../../images/MovieCard.png'

function MoviesCard({ name, link, duration}) {

    return (
        <div className="movies-card">
            <img src={imagesCard} className='movies-card__image' alt="Постер фильма"/>
            <div className="movies-card__element">
                <h2 className="movies-card__title">{name}33 слова о дизайне</h2>
                <input type='checkbox' className="movies-card__checkbox"/>
            </div>
            <p className="movies-card__duration">{duration}1ч42м</p>
        </div>
    )
}

export default MoviesCard;