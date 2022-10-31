function Portfolio(){
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-element">
                    <a href="https://mkudina.github.io/russian-travel/index.html" 
                    className="portfolio__list-link">Статичный сайт</a>
                    <a href="https://mkudina.github.io/russian-travel/index.html" 
                    className="portfolio__list-link"><div className="portfolio__list-arrow"></div></a>
                </li>
                <li className="portfolio__list-element">
                    <a href="https://mkudina.github.io/mesto/index.html" 
                    className="portfolio__list-link">Адаптивный сайт</a>
                    <a href="https://mkudina.github.io/mesto/index.html" 
                    className="portfolio__list-link"><div className="portfolio__list-arrow"></div></a>
                </li>
                <li className="portfolio__list-element">
                    <a href="https://kudina.nomoredomains.sbs/" 
                    className="portfolio__list-link">Одностраничное приложение</a>
                    <a href="https://kudina.nomoredomains.sbs/" 
                    className="portfolio__list-link"><div className="portfolio__list-arrow"></div></a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;