import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Notfound from '../404/404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { apiMain } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') ?? false);
  const [currentUser, setCurrentUser] = useState({});
  const [isMovies, setIsMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) ?? []);
  const [filterMovies, setFilterMovies] = useState(JSON.parse(localStorage.getItem('filterMovies')) ?? []);
  const [filterDurationMovie, setFilterDurationMovie] = useState(JSON.parse(localStorage.getItem('filterDurationMovie')) ?? []);
  const [isSavesMovies, setIsSavesMovies] = useState(JSON.parse(localStorage.getItem('allSavedMovies')) ?? []);
  const [filterSavedMovies, setFilterSavedMovies] = useState(JSON.parse(localStorage.getItem('filterSavedMovies')) ?? []);
  const [filterSavedDurationMovie, setFilterSavedDurationMovies] = useState(JSON.parse(localStorage.getItem('filterSavedDurationMovie')) ?? []);
  const [isCheckbox, setIsCheckbox] = useState(JSON.parse(localStorage.getItem('isChecked'))  ?? false);
  const [searchValue, setSearchValue] = useState('');
  const [searchValueSaved, setSearchValueSaved] = useState('');
  const [isLoanding, setIsLoanding] = useState(false);
  const history = useHistory();

    // Проверка на текущего пользователя

  useEffect(() => {
    async function checkUser(){
      try {
        if(isLoggedIn){
          await apiMain.getUserInfo()
            .then((response) => setCurrentUser(response.user))
          await apiMain.getSavesMovies()
            .then((response) => {
              localStorage.setItem('allSavedMovies', JSON.stringify(response.movie));
              setIsSavesMovies(response.movie);
              setFilterSavedMovies(response.movie);
              setFilterSavedDurationMovies(response.movie);
            })
        }
      } catch(err){
          console.log(err);
      }
    } checkUser()
  }, [isLoggedIn, setCurrentUser, setIsSavesMovies, setFilterSavedDurationMovies])

    useEffect(() => {
      function checkToken(){
        const jwt = localStorage.getItem('token');
        if(jwt){
          apiMain.checkAuth(jwt).then((res) => {
            if(res){
              setLoggedIn(true)
            }
          })
          .catch(err => console.log(err));
        } 
      }
      checkToken();
    })

    //Запрос на фильмы

    function submitSearch(typeMovies, typeSearchValue){

      const filteredMovies = typeMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(typeSearchValue);
      })
      if(window.location.pathname === '/movies'){
        localStorage.setItem('filterMovies', JSON.stringify(filteredMovies));
        setFilterMovies(filteredMovies);
        setFilterDurationMovie(filteredMovies);
      }

      if(window.location.pathname === '/saved-movies'){
        localStorage.setItem('filterSavedMovies', JSON.stringify(filteredMovies));
        setFilterSavedMovies(filteredMovies);
        setFilterSavedDurationMovies(filteredMovies);
      }

      if (localStorage.getItem('isChecked') === 'true'){
        shortMovies(filteredMovies);
      }
    }

    function searchMovie(value){
      if (isMovies.length === 0) {
        setIsLoanding(true);
        moviesApi.getMovies()
          .then((movies) => {
              setIsMovies(movies);
              setIsLoanding(false);
          })
      }
      if(window.location.pathname === '/movies'){
        localStorage.setItem('searchValue', value);
        setSearchValue(value);
      }
      if(window.location.pathname === '/saved-movies'){
        localStorage.setItem('searchValueSaved', value);
        setSearchValueSaved(value);
      }

    }

    function shortMovies(filteredMovies){
      if(localStorage.getItem('isChecked') === 'true'){
        const shortMovie = filteredMovies.filter((item) => {
          return item.duration < 40;
        })
        if(window.location.pathname === '/movies'){
          localStorage.setItem('filterDurationMovie', JSON.stringify(shortMovie));
          setFilterDurationMovie(shortMovie);
        }
        if(window.location.pathname === '/saved-movies'){
          localStorage.setItem('filterSavedDurationMovie', JSON.stringify(shortMovie));
          setFilterSavedDurationMovies(shortMovie);
        }

      } else {
        if(window.location.pathname === '/movies'){
          setFilterDurationMovie(filteredMovies);
        }
        if(window.location.pathname === '/saved-movies'){
          setFilterSavedDurationMovies(filteredMovies);
        }
      }
    }

    //Сохранить фильм 

    async function saveMovie(movie){
      try{
          await apiMain.saveMovies(movie);
          await apiMain.getSavesMovies()
              .then((response) => {
                  localStorage.setItem('allSavedMovies', JSON.stringify(response.movie))
                  setIsSavesMovies(response.movie)
                  localStorage.setItem('filterSavedDurationMovie', JSON.stringify(response.movie));
                  setFilterSavedDurationMovies(response.movie);
              })
      } catch(err){
          console.log(err)
      }
  }

  //Удалить фильм

  async function deleteMovie(movie){
    try {
      await apiMain.deleteMovie(movie._id);
      apiMain.getSavesMovies()
          .then((response) => {
            localStorage.setItem('allSavedMovies', JSON.stringify(response.movie))
            setIsSavesMovies(response.movie)
            localStorage.setItem('filterSavedDurationMovie', JSON.stringify(response.movie));
            setFilterSavedDurationMovies(response.movie);
          })
  } catch (err) {
      console.log(err);
  }
  }

    //logout

    function logout(){
      localStorage.clear();
      setIsMovies([]);
      setFilterMovies([]);
      setFilterDurationMovie([]);
      setIsSavesMovies([]);
      setFilterSavedMovies([]);
      setFilterSavedDurationMovies([]);
      setSearchValue('');
      setSearchValueSaved('');
      setLoggedIn(false);
      setIsCheckbox(false);
      setIsLoanding(false);
      history.push('/');
    }

  return (
    <div className='page__background'>
      <div className='page'>
        <CurrentUserContext.Provider  value={currentUser}>
          <Switch>
            <Route exact path='/'>
              <Header isLoggedIn={isLoggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path='/movies'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={Movies} shortMovies={shortMovies} 
                              isMovies={filterDurationMovie} deleteMovie={deleteMovie}
                              saveMovie={saveMovie} searchMovie={searchMovie} typeMovies={isMovies}
                              typeSearchValue={searchValue} onSubmitSearch={submitSearch} setIsCheckbox={setIsCheckbox}
                              setIsMovies={setIsMovies} isLoanding={isLoanding} typeFilterMovies={filterMovies}
                              isCheckbox={isCheckbox} />
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={SavedMovies} typeSearchValue={searchValueSaved}
                              isSavesMovies={filterSavedDurationMovie} deleteMovie={deleteMovie} searchMovie={searchMovie}
                              onSubmitSearch={submitSearch} shortMovies={shortMovies} setIsCheckbox={setIsCheckbox}
                              setIsMovies={setIsMovies} typeMovies={isSavesMovies} typeFilterMovies={filterSavedMovies}
                              isCheckbox={isCheckbox} />
              <Footer />
            </Route>
            <Route path='/profile'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={Profile} setCurrentUser={setCurrentUser} 
                logout={logout}/>
             </Route>
            <Route path='/sign-in'>
              <Login setLoggedIn={setLoggedIn} />
            </Route>
            <Route path='/sign-up'>
              <Register setLoggedIn={setLoggedIn} />
            </Route>
            <Route path='*'>
              <Notfound />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
