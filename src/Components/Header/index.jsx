import './style.scss'
import Logo from '../../assets/logo.svg'

const Header = () => {
    return(
        <header>
            <img src={Logo} alt="coroaImagem" />
            <h2>MasterGames</h2>
        </header>
    )
}

export default Header