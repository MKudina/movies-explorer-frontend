class Api{
    constructor(options){
        this._baseUrl = options.baseUrl;
    }

    //checkError

    _checkError(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    //register

    register(data){
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "password": data.password,
          "email": data.email,
          "name": data.name
      } )
      })
        .then(this._checkError)
    }

      //login

    login({password, email}){
      return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
              "password": password,
              "email": email
          } )
      })
          .then(this._checkError)
          .then((data) => {
              if(data.token){
                  localStorage.setItem("token", data.token)
                  return data
              } else {
                  return
              }
          })
          
    }

    
      //checkAuth

      checkAuth(jwt){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}` 
            }
        })
        .then(this._checkError)
        .then(data => data)
      }


    //GET Profile

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method:'GET',
            headers: {
              authorization: this._getToken() 
            }
          })
          .then(this._checkError)
    }

    //PATCH Profile

      editProfile(profileData){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
            })
          .then(this._checkError)
      }

      _getToken() {
        return `Bearer ${localStorage.getItem("token")}`;
      }

          //Save Movies

    saveMovies(movie) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: {
            authorization: this._getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          country: movie.country,
          director: movie.director, 
          duration: movie.duration, 
          year: movie.year, 
          description: movie.description, 
          image: `https://api.nomoreparties.co/${movie.image.url}`, 
          trailerLink: movie.trailerLink, 
          thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`, 
          nameRU: movie.nameRU, 
          nameEN: movie.nameEN, 
          movieId: movie.id
        })
      })
        .then(this._checkError)
    }

    //GET SavesMovies

    getSavesMovies() {
      return fetch(`${this._baseUrl}/movies`, {
          method: 'GET',
          headers: {
            authorization: this._getToken(),
            'Content-Type': 'application/json'
          }
      })
        .then(this._checkError)
    }

    //DELETE Movie

    deleteMovie(idMovie){
      return fetch(`${this._baseUrl}/movies/${idMovie}`, {
        method: 'DELETE',
        headers: {
          authorization: this._getToken()
        }
      })
        .then(this._checkError)
    }
}

const apiMain = new Api ({
  baseUrl:'https://api.movies-kudina.nomoredomains.icu'
})

export {apiMain};


// https://api.movies-kudina.nomoredomains.icu