import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

function Header({isLoggedIn}){
    const location = useLocation();
    const [isOpenMenuBar, setOpenMenuBar] = useState(false);

    function openMenuBar() {
        setOpenMenuBar(true);
    }

    function closeMenuBar() {
        setOpenMenuBar(false);
    }

    return (
        <header className={`header ${location.pathname === '/' && 'header_main'}`}>
            <Link to='/' className='header__logo'></Link>
            {isLoggedIn ? (
                <>
                    <NavLink to='/movies' activeClassName='header__button_active' className='header__button header__button_header_movies'>
                        {'Фильмы'}
                    </NavLink>
                    <NavLink to='saved-movies' activeClassName='header__button_active' className='header__button header__button_header_saved-movies'>
                        {'Сохраненные фильмы'}
                    </NavLink>
                    <Link to='/profile' className='header__button header__button_header_profile'>
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
            <button type='button' className={`header__menu-bar-button 
                ${location.pathname === '/' && 'header__menu-bar-button_active'}`}
                onClick={openMenuBar} />
            
            <div className={`header__overlay header__overlay${isOpenMenuBar && '_active'}`}></div>
            
            <div className={`header__menu-bar header__menu-bar${isOpenMenuBar && '_active'}`}>
                <button type='button' className='header__menu-bar-button-close' onClick={closeMenuBar} />
                <Link to='/' className='header__button header__button_menu-bar_main'>
                        {'Главная'}
                </Link>
                <NavLink to='/movies' activeClassName='header__button_active' className='header__button header__button_menu-bar_movies'>
                    {'Фильмы'}
                </NavLink>
                <NavLink to='saved-movies' activeClassName='header__button_active' className='header__button header__button_menu-bar_saved-movies'>
                    {'Сохраненные фильмы'}
                </NavLink>
                <Link to='/profile' className='header__button header__button_menu-bar_profile'>
                    {'Аккаунт'}
                </Link>
            </div>
        </header>
    );
}

export default Header;