function Footer() {
    return (
        <footer className="footer">
            <div className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</div>
            <nav className="footer__navigation">
                <p className="footer__copyright">© 2020</p>
                <ul className="footer__navigation-list">
                    <li><a href="https://practicum.yandex.ru/" 
                    className="footer__navigation-list-link">Яндекс.Практикум</a></li>
                    <li><a href="https://github.com/" 
                    className="footer__navigation-list-link">Github</a></li>
                </ul>
            </nav>
        </footer>

    )
}

export default Footer;