import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className='register'>
            <Link to='/'><div className='register__logo'></div></Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form'>
                <label htmlFor='input-name' className='register__input-label'>Имя</label>
                <input className='register__input' name='name' id='input-name' required></input>
                <label htmlFor='input-email' className='register__input-label'>E-mail</label>
                <input className='register__input' name='email' id='input-email' required></input>
                <label htmlFor='input-password' className='register__input-label'>Пароль</label>
                <input className='register__input' name='password' id='input-password' required></input>
                <button type='submit' className='register__submit'>Зарегистрироваться</button>
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