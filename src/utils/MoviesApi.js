class MoviesApi{
    constructor(options){
        this._movieUrl = options.movieUrl;
    }

    //checkError

    _checkError(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    //GET Movies

    getMovies() {
      return fetch(`${this._movieUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
      })
        .then(this._checkError)
    }
}

const moviesApi = new MoviesApi ({
  movieUrl: 'https://api.nomoreparties.co/beatfilm-movies'
})

export {moviesApi};
