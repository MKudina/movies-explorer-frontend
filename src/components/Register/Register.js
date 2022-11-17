import { Link, useHistory } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/Validation';
import { apiMain } from '../../utils/MainApi';
import { useState, useEffect } from 'react';


function Register({setLoggedIn, setCurrentUser, setIsLoanding, isLoanding}) {

    const { values, handleChange, errors, isValid, isNameValid, isEmailValid, isPasswordValid, resetForm } = useFormWithValidation();
    const history = useHistory();
    const [error, setError] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setIsLoanding(true);
            await apiMain.register({
                password: values.password,
                email: values.email,
                name: values.name
            })
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
        } catch (err) {
            console.log(err.indexOf('500'))
            if (err.indexOf('409') !== -1) {
                setError('Пользователь с таким email уже существует.');
              } else if (err.indexOf('500') !== -1) {
                setError('На сервере произошла ошибка.');
              } else {
                setError('При регистрации пользователя произошла ошибка.');
              }
              console.log(err);
        }

    }

    useEffect(() => {
        resetForm();
      }, [resetForm]);

    return (
        <div className='register'>
            <Link to='/'><div className='register__logo'></div></Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form' onSubmit={handleSubmit} noValidate>

                <label htmlFor='input-name' className='register__input-label'>Имя</label>
                <input type='text' className={`register__input ${!isNameValid && 'register__input-error'}`} 
                    name='name' id='input-name' onChange={handleChange} minLength='2' maxLength='20' required />
                <span className="register__span-inputs-error">
                    {error || errors.name}</span>

                <label htmlFor='input-email' className='register__input-label'>E-mail</label>
                <input type='email' className={`register__input ${!isEmailValid || errors.email ? 'register__input-error' : ''}`} 
                    name='email' id='input-email' onChange={handleChange} required />
                <span className="register__span-inputs-error">
                    {error || errors.email }</span>

                <label htmlFor='input-password' className='register__input-label'>Пароль</label>
                <input type='password' className={`register__input ${!isPasswordValid && 'register__input-error'}`}
                    name='password' id='input-password' minLength="8" onChange={handleChange} required />  
                <span className="register__span-inputs-error">
                    {error || errors.password}</span>

                <button type='submit' className='register__submit'
                    disabled={ isLoanding || error || errors.name || errors.email || errors.password || !isValid || 
                            !values.name || !values.email || !values.password}>Зарегистрироваться</button>
                <div className='register__login'>
                    Уже зарегистрированы?&nbsp;
                    <Link to='/sign-in' className='register__login-link'>
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register;