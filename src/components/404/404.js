import { useHistory } from "react-router-dom";

function Notfound () {

    const history = useHistory();

    function handleClick(){
        history.goBack();
    }

    return (
        <div className="notfound">
            <h2 className="notfound__title">404</h2>
            <p className="notfound__subtitle">Страница не найдена</p>
            <button type="button" className="notfound__button" onClick={handleClick}>{'Назад'}</button>
        </div>
    )
}

export default Notfound;