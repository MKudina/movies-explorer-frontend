import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) ?? {});
  const [isMovies, setIsMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) ?? []);
  const [filterMovies, setFilterMovies] = useState(JSON.parse(localStorage.getItem('filterMovies')) ?? []);
  const [filterDurationMovie, setFilterDurationMovie] = useState(JSON.parse(localStorage.getItem('filterDurationMovie')) ?? []);
  const [isSavesMovies, setIsSavesMovies] = useState(JSON.parse(localStorage.getItem('allSavedMovies')) ?? []);
  const [filterSavedMovies, setFilterSavedMovies] = useState(JSON.parse(localStorage.getItem('filterSavedMovies')) ?? []);
  const [filterSavedDurationMovie, setFilterSavedDurationMovies] = useState(JSON.parse(localStorage.getItem('filterSavedDurationMovie')) ?? []);
  const [isCheckbox, setIsCheckbox] = useState(JSON.parse(localStorage.getItem('isChecked'))  ?? false);
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') ?? '');
  const [searchValueSaved, setSearchValueSaved] = useState('');
  const [isLoanding, setIsLoanding] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkUser(){
      try {
        if(isLoggedIn){
          if(isSavesMovies.length === 0){
            await apiMain.getSavesMovies()
            .then((response) => {
              localStorage.setItem('allSavedMovies', JSON.stringify(response.movie));
              setIsSavesMovies(response.movie);
              setFilterSavedMovies(response.movie);
              setFilterSavedDurationMovies(response.movie);
            })
          }
            if(filterDurationMovie.length > 0){
              setFilterDurationMovie(filterDurationMovie)
            }
        }
      } catch(err){
          console.log(err);
      }
    } checkUser()
  }, [isLoggedIn, filterDurationMovie, searchValue, isSavesMovies, setSearchValue, 
      setIsSavesMovies, setFilterSavedDurationMovies, setFilterDurationMovie])

    useEffect(() => {
      function checkToken(){
        const jwt = localStorage.getItem('token');
        if(jwt){
          apiMain.checkAuth(jwt).then((res) => {
            if(res){
              setLoggedIn(true)
            } else {
              logout();
            }
          })
          .catch(err => console.log(err));
        } 
      }
      checkToken();
    })

    //Запрос на фильмы

    function submitSearch(typeMovies, typeSearchValue){
      if (isMovies.length === 0) {
        setIsLoanding(true);
        moviesApi.getMovies()
          .then((movies) => {
            localStorage.setItem('allMovies', JSON.stringify(movies));
              setIsMovies(movies);
              setIsLoanding(false);
          })
          .catch((err) => console.log(err))
      }
      const filteredMovies = typeMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(typeSearchValue.toLowerCase());
      })
      if(window.location.pathname === '/movies'){
        localStorage.setItem('filterMovies', JSON.stringify(filteredMovies));
        localStorage.setItem('filterDurationMovie', JSON.stringify(filteredMovies));
        setFilterMovies(filteredMovies);
        setFilterDurationMovie(filteredMovies);
      }

      if(window.location.pathname === '/saved-movies'){
        localStorage.setItem('filterSavedMovies', JSON.stringify(filteredMovies));
        localStorage.setItem('filterDurationMovie', JSON.stringify(filteredMovies));
        setFilterSavedMovies(filteredMovies);
        setFilterSavedDurationMovies(filteredMovies);
      }

      if (localStorage.getItem('isChecked') === 'true'){
        shortMovies(filteredMovies);
      }
    }

    function searchMovie(value){
      if(window.location.pathname === '/movies'){
        localStorage.setItem('searchValue', value);
        setSearchValue(value);
      }
      if(window.location.pathname === '/saved-movies'){
        localStorage.setItem('searchValueSaved', value);
        setSearchValueSaved(value);
      }

    }

    function shortMovies(){
      if(localStorage.getItem('isChecked') === 'true'){


        const shortMovie = filterMovies.filter((item) => {
          return item.duration < 40;
        })

        const shortSavedMovie = isSavesMovies.filter((item) => {
          return item.duration < 40;
        })


          localStorage.setItem('filterDurationMovie', JSON.stringify(shortMovie));
          setFilterDurationMovie(shortMovie);
        

          localStorage.setItem('filterSavedDurationMovie', JSON.stringify(shortSavedMovie));
          setFilterSavedDurationMovies(shortSavedMovie);
        

      } else {

          localStorage.setItem('filterDurationMovie', JSON.stringify(filterMovies));
          setFilterDurationMovie(filterMovies);
        
    
          localStorage.setItem('filterSavedDurationMovie', JSON.stringify(isSavesMovies));
          setFilterSavedDurationMovies(isSavesMovies);
        
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
        if(err.indexOf('401')){
          logout();
        }
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
    if(err.indexOf('401')){
      logout();
    }
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
                              isCheckbox={isCheckbox} isSavesMovies={isSavesMovies} />
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={SavedMovies} typeSearchValue={searchValueSaved}
                              isSavesMovies={filterSavedDurationMovie} deleteMovie={deleteMovie} searchMovie={searchMovie}
                              onSubmitSearch={submitSearch} shortMovies={shortMovies} setIsCheckbox={setIsCheckbox}
                              setIsMovies={setIsMovies} typeMovies={isSavesMovies} typeFilterMovies={filterSavedMovies}
                              isCheckbox={isCheckbox} isMovies={isMovies} />
              <Footer />
            </Route>
            <Route path='/profile'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={Profile} setCurrentUser={setCurrentUser} 
                logout={logout}/>
             </Route>
            <Route path='/sign-in'>
              { isLoggedIn ? <Redirect to='/' /> : <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} /> }
            </Route>
            <Route path='/sign-up'>
              { isLoggedIn ? <Redirect to='/' /> : <Register setLoggedIn={setLoggedIn} /> }
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
