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
            </div>
        </div>
    )
}

export default MoviesCardList;