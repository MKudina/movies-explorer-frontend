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
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

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
  const [isCheckboxSavedMovie, setIsCheckboxSavedMovie] = useState(JSON.parse(localStorage.getItem('isCheckedSavedMovie'))  ?? false)
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') ?? '');
  const [searchValueSaved, setSearchValueSaved] = useState('');
  const [isLoanding, setIsLoanding] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [notFoundSaved, setNotFoundSaved] = useState(false);
  const history = useHistory();

  useEffect(() => {
        if(isLoggedIn){
            apiMain.getSavesMovies()
            .then((response) => {
              localStorage.setItem('allSavedMovies', JSON.stringify(response.movie));
              setIsSavesMovies(response.movie);
              setFilterSavedMovies(response.movie);
              setFilterSavedDurationMovies(response.movie);
            })
            .catch ((err) => {
              console.log(err)
            })
        }
  }, [isLoggedIn, setIsSavesMovies, setFilterSavedMovies, setFilterSavedDurationMovies])

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if(jwt){
          setIsLoanding(true);
          apiMain.checkAuth(jwt).then((res) => {
            if(res){
              setLoggedIn(true)
            }
          })
          .catch(err => console.log(err))
          .finally(() => {
            setIsLoanding(false);
          });
        } 
    }, [setIsLoanding] )

    //Запрос на фильмы

    async function submitSearch(typeMovies, typeSearchValue){
      if (isMovies.length === 0 && window.location.pathname === '/movies') {
        setIsLoanding(true);
        await moviesApi.getMovies()
          .then((movies) => {
            const searchMovies = movies.filter((item) => {
              return item.nameRU.toLowerCase().trim().includes(typeSearchValue.toLowerCase().trim());
            })
            localStorage.setItem('allMovies', JSON.stringify(movies));
            setIsMovies(movies);
            setFilterMovies(searchMovies);
            setFilterDurationMovie(searchMovies);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoanding(false);
          });
      } else {
        const filteredMovies = typeMovies.filter((item) => {
          return item.nameRU.toLowerCase().trim().includes(typeSearchValue.toLowerCase().trim());
        })
        if(window.location.pathname === '/movies'){
          localStorage.setItem('filterMovies', JSON.stringify(filteredMovies));
          setFilterMovies(filteredMovies);
          if (localStorage.getItem('isChecked') === 'true'){
            shortMovies();
          } else {
            localStorage.setItem('filterDurationMovie', JSON.stringify(filteredMovies));
            setFilterDurationMovie(filteredMovies); 
          }
          if(filteredMovies.length === 0){
            setNotFound(true);
          } else {
            setNotFound(false);
          }
        }
        if(window.location.pathname === '/saved-movies'){
          localStorage.setItem('filterSavedMovies', JSON.stringify(filteredMovies));
          localStorage.setItem('filterDurationMovie', JSON.stringify(filteredMovies));
          setFilterSavedMovies(filteredMovies);
          setFilterSavedDurationMovies(filteredMovies);
          if(filteredMovies.length === 0){
            setNotFoundSaved(true);
          } else {
            setNotFoundSaved(false);
          }
        }
      }
     
    }
    
    function searchMovie(value){
      if(window.location.pathname === '/movies'){
        localStorage.setItem('searchValue', value);
        setSearchValue(value);
      }
      if(window.location.pathname === '/saved-movies'){
        setSearchValueSaved(value);
      }
    }

    function shortMovies(){
      if(localStorage.getItem('isChecked') === 'true'){
        const shortMovie = filterMovies.filter((item) => {
          return item.duration < SHORT_MOVIE_DURATION;
        })
        
          localStorage.setItem('filterDurationMovie', JSON.stringify(shortMovie));
          setFilterDurationMovie(shortMovie);
      } else {
          localStorage.setItem('filterDurationMovie', JSON.stringify(filterMovies));
          setFilterDurationMovie(filterMovies);
      }
      if(localStorage.getItem('isCheckedSavedMovie') === 'true'){
        const shortSavedMovie = isSavesMovies.filter((item) => {
          return item.duration < SHORT_MOVIE_DURATION;
        })
        localStorage.setItem('filterSavedDurationMovie', JSON.stringify(shortSavedMovie));
        setFilterSavedDurationMovies(shortSavedMovie);
      } else {
        localStorage.setItem('filterSavedDurationMovie', JSON.stringify(filterSavedMovies));
        setFilterSavedDurationMovies(filterSavedMovies);
      }
    }

    //Сохранить фильм 

    async function saveMovie(movie){
      try{
          await apiMain.saveMovies(movie)
          .then((newMovie) => {
            setIsSavesMovies([...isSavesMovies, newMovie.movie]);
            localStorage.setItem('allSavedMovies', JSON.stringify(isSavesMovies));
            setFilterSavedDurationMovies([...filterSavedDurationMovie, newMovie.movie]);
            localStorage.setItem('filterSavedDurationMovie', JSON.stringify(filterSavedDurationMovie));
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
    const removedMovies = isSavesMovies.find((item) => {
      return item._id === movie._id
    })
    try {
      await apiMain.deleteMovie(movie._id)
        .then(() => {
          const newIsSavesMovies = isSavesMovies.filter((item) => {
            return item._id !== removedMovies._id
          })
          setIsSavesMovies(newIsSavesMovies);
          localStorage.setItem('allSavedMovies', JSON.stringify(newIsSavesMovies));
          setFilterSavedDurationMovies(newIsSavesMovies);
          localStorage.setItem('filterSavedDurationMovie', JSON.stringify(newIsSavesMovies));
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
      setNotFound(false);
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
                              setIsMovies={setIsMovies} isLoanding={isLoanding}
                              isCheckbox={isCheckbox} isSavesMovies={isSavesMovies} notFound={notFound} />
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={SavedMovies} typeSearchValue={searchValueSaved}
                              isSavesMovies={filterSavedDurationMovie} deleteMovie={deleteMovie} searchMovie={searchMovie}
                              onSubmitSearch={submitSearch} shortMovies={shortMovies} setIsCheckboxSavedMovie={setIsCheckboxSavedMovie}
                              setIsMovies={setIsMovies} typeMovies={isSavesMovies} setFilterSavedMovies={setFilterSavedMovies}
                              isCheckboxSavedMovie={isCheckboxSavedMovie} notFoundSaved={notFoundSaved} isLoanding={isLoanding}
                              setFilterSavedDurationMovies={setFilterSavedDurationMovies} setSearchValueSaved={setSearchValueSaved}
                              isAllSavesMovies={isSavesMovies} setNotFoundSaved={setNotFoundSaved} />
              <Footer />
            </Route>
            <Route path='/profile'>
              <Header isLoggedIn={isLoggedIn} />
              <ProtectedRoute isLoggedIn={isLoggedIn} component={Profile} setCurrentUser={setCurrentUser} 
                logout={logout}/>
             </Route>
            <Route path='/sign-in'>
              { isLoggedIn ? <Redirect to='/' /> : <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} 
              setIsLoanding={setIsLoanding} isLoanding={isLoanding} /> }
            </Route>
            <Route path='/sign-up'>
              { isLoggedIn ? <Redirect to='/' /> : <Register setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} 
              setIsLoanding={setIsLoanding} isLoanding={isLoanding} /> }
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
