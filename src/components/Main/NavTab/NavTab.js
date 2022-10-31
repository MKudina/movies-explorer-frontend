function NavTab(){
    return (
        <nav className='navTab'>
          <ul className='navTab__list'>
            <li><a href='#about-project' className='navTab__link'>О проекте</a></li>
            <li><a href='#techs' className='navTab__link'>Технологии</a></li>
            <li><a href='#student' className='navTab__link'>Студент</a></li>
          </ul>
        </nav>
    )
}

export default NavTab;