const { Link } = require("react-router-dom");

function Notfound () {
    return (
        <div className="notfound">
            <h2 className="notfound__title">404</h2>
            <p className="notfound__subtitle">Страница не найдена</p>
            <Link to='/' className="notfound__link">{'Назад'}</Link>
        </div>
    )
}

export default Notfound;