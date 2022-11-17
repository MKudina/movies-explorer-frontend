import { Link, useHistory } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation'
import { apiMain } from '../../utils/MainApi';
import { useState, useEffect } from 'react';

function Login({ setLoggedIn, setCurrentUser, isLoanding, setIsLoanding }) {

    const { values, handleChange, errors, isValid, isEmailValid, isPasswordValid, resetForm } = useFormWithValidation();
    const history = useHistory()
    const [error, setError] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setIsLoanding(true);
            await apiMain.login({
                password: values.password,
                email: values.email
            })
                .then((data) => {
                    if(data.token){
                        localStorage.setItem('isLoggedIn', true)
                        localStorage.setItem('isChecked', 'false')
                        setLoggedIn(true)
                    }
                })
            await apiMain.getUserInfo()
                .then((response) => {
                    localStorage.setItem('currentUser', JSON.stringify(response.user))
                    setCurrentUser(response.user)
                })
            setIsLoanding(false);
            history.push('/movies');
        } catch(err){
            if (err.indexOf('401') !== -1 || err.indexOf('400') !== -1) {
                setError('Вы ввели неправильный логин или пароль.');
            } else if (err.indexOf('500') !== -1) {
                setError('На сервере произошла ошибка.');
            } else {
                setError('При авторизации пользователя произошла ошибка.');
            }
            console.log(err);
        }
    }

    useEffect(() => {
        resetForm();
      }, [resetForm]);

    return (
        <div className='login'>
            <Link to='/'><div className='login__logo'></div></Link>
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form' onSubmit={handleSubmit} noValidate>
                <label htmlFor='input-email' className='login__input-label'>E-mail</label>
                <input type='email' className={`login__input ${!isEmailValid || errors.email ? 'login__input-error' : ''}`} 
                    name='email' id='input-email' onChange={handleChange} required />
                <span className='login__span-inputs-error'>{ error || errors.email}</span>
                <label htmlFor='input-password' className='login__input-label'>Пароль</label>
                <input type='password' className={`login__input ${!isPasswordValid && 'login__input-error'}`} 
                    name='password' id='input-password' minLength="8" onChange={handleChange} required />
                <span className='login__span-inputs-error'>{ error || errors.password}</span>
                <button type='submit' className='login__submit' 
                    disabled={ isLoanding || error || errors.email || errors.password || !isValid || !values.email || !values.password}>Войти</button>
                <div className='login__login'>
                    Ещё не зарегистрированы?&nbsp;
                    <Link to='/sign-up' className='login__login-link'>
                        Регистрация
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;