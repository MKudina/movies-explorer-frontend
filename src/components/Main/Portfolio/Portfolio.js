function Portfolio(){
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-element">
                    <a href="https://mkudina.github.io/russian-travel/index.html" 
                    className="portfolio__list-link" target='_blank' rel="noreferrer">Статичный сайт</a>
                    <a href="https://mkudina.github.io/russian-travel/index.html" 
                    className="portfolio__list-link" target='_blank' rel="noreferrer"><div className="portfolio__list-arrow"></div></a>
                </li>
                <li className="portfolio__list-element">
                    <a href="https://mkudina.github.io/mesto/index.html" 
                    className="portfolio__list-link" target='_blank' rel="noreferrer">Адаптивный сайт</a>
                    <a href="https://mkudina.github.io/mesto/index.html" 
                    className="portfolio__list-link" target='_blank' rel="noreferrer"><div className="portfolio__list-arrow"></div></a>
                </li>
                <li className="portfolio__list-element">
                    <a href="https://kudina.nomoredomains.sbs/" 
                    className="portfolio__list-link" target='_blank' rel="noreferrer">Одностраничное приложение</a>
                    <a href="https://kudina.nomoredomains.sbs/" 
                    className="portfolio__list-link" target='_blank' rel="noreferrer"><div className="portfolio__list-arrow"></div></a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;