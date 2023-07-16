import './style.scss'
import Logo from '../../assets/logo.svg'
import { AuthContext} from "../../context/AuthContext"
import { useContext,  } from 'react'
import { FaUserAlt } from "react-icons/fa"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const Navigate = useNavigate()

    const {currentUser, logout} = useContext(AuthContext)
    const [painel, setPainel] = useState(false)

    function goTo(name) {
        return Navigate(`/${name}`)
    }

    return(
        <header>
            <div className="NameLogo" onClick={()=> Navigate('/')}>
                <img src={Logo} alt="coroaImagem" />
                <h2>MasterGames</h2>
            </div>
            <div className="painel">
                <FaUserAlt 
                    className='logoUser'
                    style={{fill: painel ? 'white' : 'black'}}
                    onClick={() => setPainel(!painel)}
                />
                <hr className={`triangulocima ${painel ? 'showPainel' : 'showOff'}`}/>
                <ul className={`options ${painel ? 'showPainel' : 'showOff'}` } >
                    {!currentUser &&  (
                        <>
                            <li onClick={(e) => goTo("register")}>Registrar</li>
                            <li onClick={(e) => goTo("login")}>Login</li>
                        </>
                    )}
                    {currentUser && (
                        <>
                            <li onClick={(e) => goTo("favoritos")}>Favoritos</li>
                            <li onClick={() => logout()}>Sair</li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    )
}

export default Header