
import './style.scss'

const Card = ({game}) => {

    return(
        <a href={game.game_url} 
            className="card" 
        >
            <img src={game.thumbnail} alt="banner game" />
            <ul className='overlay'>
                <li>Developer: <p>{game.developer}</p></li>
                <li>Genre:<p>{game.genre}</p></li>
                <li>Platform:<p>{game.platform}</p></li>
                <li>Publisher:<p>{game.publisher}</p></li>
                <li>Release Date:<p>{game.release_date}</p></li>
                <li>Description:<p>{game.short_description}</p></li>
            </ul>
                <h2 className='game-name'>{game.title}</h2>
            
        </a>
    )
}

export default Card