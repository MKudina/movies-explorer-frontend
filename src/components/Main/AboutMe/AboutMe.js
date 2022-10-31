import PhotoMe from '../../../images/PhotoMe.svg'

function AboutMe() {
    return(
        <section className="aboutMe" id='student'>
            <h2 className="aboutMe__title">Студент</h2>
            <div className="aboutMe__profile">
                <img src={PhotoMe} className='aboutMe__profile-photo' alt='Фото'></img>
                <div className="aboutMe__profile-element">
                    <p className='aboutMe__profile-name'>Максим</p>
                    <p className='aboutMe__profile-profession'>Фронтенд-разработчик, 30 лет</p>
                    <p className='aboutMe__profile-about'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
                        Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a href="https://github.com/MKudina?tab=repositories" className='aboutMe__profile-link'>Github</a>
                </div>
            </div>
        </section>
    )
}

export default AboutMe;