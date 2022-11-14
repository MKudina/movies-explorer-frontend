import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from '../../utils/Validation';
import { apiMain } from '../../utils/MainApi';

function Profile({ setCurrentUser, logout }){

    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, isNameValid, isEmailValid } = useFormWithValidation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [results, setResults] = useState(false);


    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [setName, setEmail, currentUser]);

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await apiMain.editProfile({
                email: values.email === undefined ? email : values.email,
                name: values.name === undefined ? name : values.name
            })
            await apiMain.getUserInfo()
                .then((response) => {
                    setCurrentUser(response.user);
                })
            setResults(true)
            setTimeout(
                () => {
                    setResults(false)
                },
                5 * 1000
              );
        } catch(err) {
            if (err.indexOf('400') !== -1) {
                setError('Вы ввели неправильный email.');
            } else if (err.indexOf('409') !== -1) {
                setError('Пользователь с таким email уже существует.');
            } else if (err.indexOf('500') !== -1) {
                setError('На сервере произошла ошибка.');
            } else {
                setError('При авторизации пользователя произошла ошибка.');
            }
            console.log(err);
        }
    }

    return (
        <div className="profile">
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <form className="profile__form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="input-name" className="profile__label-input">
                    Имя
                <input type='text' name='name' className={`profile__input ${!isNameValid && 'profile__input-error'}`} id="input-name" 
                    placeholder={name} minLength='2' maxLength='20' onChange={handleChange} />
                </label>

                <label htmlFor="input-email" className="profile__label-input">
                    E-mail
                <input type='email' name='email' className={`profile__input ${!isEmailValid && 'profile__input-error'}`} id="input-email" 
                    placeholder={email} onChange={handleChange} />
                </label>

                <span className='profile__span-inputs-error'>{error || errors.name || errors.email}</span>
                <span className={`profile__span-results ${results && "profile__span-results_active"}`}>{'Результаты успешно изменены!'}</span>

                <button type="submit" className="profile__submit" 
                    disabled={!isValid}>
                        {'Редактировать'}
                </button>
            
            </form>
            <button type="button" className="profile__logout" onClick={logout}>Выйти из аккаунта</button>
        </div>
    )
}

export default Profile;