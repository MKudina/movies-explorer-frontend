import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login">
            <div className="login__logo"></div>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form">
                <label htmlFor='input-email' className="login__input-label">E-mail</label>
                <input className="login__input" name="input-email"></input>
                <label htmlFor='input-password' className="login__input-label">Пароль</label>
                <input className="login__input" name="input-password"></input>
                <button type="submit" className="login__submit">Войти</button>
                <div className="login__login">
                    Ещё не зарегистрированы?&nbsp;
                    <Link to={''} className="login__login-link">
                        Регистрация
                    </Link>
                </div>
            </form>

            
        </div>
    )
}

export default Login;