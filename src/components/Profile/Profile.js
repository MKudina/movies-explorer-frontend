function Profile({name, email}){
    return (
        <div className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form">
                <label htmlFor="input-name" className="profile__label-input">
                    Имя
                    <input type='input' className="profile__input" id="input-name" value={name || 'Виталий'}/>
                </label>
                <label htmlFor="input-email" className="profile__label-input">
                    E-mail
                    <input type='input' className="profile__input" id="input-email" value={email || 'E-mail'} />
                </label>
                <button type="submit" className="profile__submit">Редактировать</button>
            </form>
            <button type="button" className="profile__logout">Выйти из аккаунта</button>
        </div>
    )
}

export default Profile;