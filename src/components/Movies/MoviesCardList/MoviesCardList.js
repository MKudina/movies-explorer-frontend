import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
        <div className="movies-card-list">
            <div className="movies-card-list__list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
            <button type="button" className="movies-card-list__button">Ещё</button>
        </div>
    )
}

export default MoviesCardList;