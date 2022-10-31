import { Link, useLocation } from 'react-router-dom';

function Header(){
    const isLoggedIn = true;
    const location = useLocation();

    return (
        <header className={`header ${location.pathname === '/' && 'header_main'}`}>
            <Link to='/' className='header__logo'></Link>
            {isLoggedIn ? (
                <>
                    <Link to='/movies' className='header__button header__button_movies'>
                        {'Фильмы'}
                    </Link>
                    <Link to='saved-movies' className='header__button header__button_saved-movies'>
                        {'Сохраненные фильмы'}
                    </Link>
                    <Link to='/profile' className='header__button header__button_profile'>
                        {'Аккаунт'}
                    </Link>
                </>
            ) : (
                <>
                    <Link to='/sign-up' className='header__button header__button_register'>
                        {'Регистрация'}
                    </Link>
                    <Link to='/sign-in' className='header__button header__button_login'>
                        {'Войти'}
                    </Link>
                </>
            )}
            <button type='button' className={`header__menu-bar ${location.pathname === '/' && 'header__menu-bar_main'}`} />
        </header>
    );
}

export default Header;