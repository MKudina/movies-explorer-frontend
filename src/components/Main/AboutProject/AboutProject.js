function AboutProject() {
    return (
        <section className="aboutProject" id="about-project">
            <h2 className="aboutProject__title">О проекте</h2>
            <div className="aboutProject__paragrafs">
                <div className="aboutProject__paragrafs-element">
                    <p className="aboutProject__paragraf">Дипломный проект включал 5 этапов</p>
                    <p className="aboutProject__paragraf">Составление плана, работу над бэкендом,
                     вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutProject__paragrafs-element">
                    <p className="aboutProject__paragraf">На выполнение диплома ушло 5 недель</p>
                    <p className="aboutProject__paragraf">У каждого этапа был мягкий и жёсткий дедлайн, 
                    которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutProject__time-work">
                <p className="aboutProject__time-work-text">1 неделя</p>
                <p className="aboutProject__time-work-text">4 недели</p>
                <p className="aboutProject__time-work-text">Back-end</p>
                <p className="aboutProject__time-work-text">Front-end</p>
            </div>
      </section>
    )
}

export default AboutProject;