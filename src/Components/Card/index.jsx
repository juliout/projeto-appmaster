
import { useContext, useEffect, useState } from 'react'
import './style.scss'
import {FcLike} from 'react-icons/fc'
import {AiFillStar} from "react-icons/ai"
import {AuthContext} from "../../context/AuthContext"
import {db} from '../../firebase'
import { collection, addDoc ,getDocs,setDoc, doc } from 'firebase/firestore'


const Card = ({game}) => {
    const [favorite, setFavorite] = useState(false)
    const [liked ,setLiked] = useState()
    const {currentUser} = useContext(AuthContext)

    const criarColecao = async (user_id, game_id) => {
        try {
            await setDoc(doc(db, `${user_id}`, `${game_id}`), {
                liked: true
              });
        } catch (error) {
          console.error('Erro ao criar a nova coleção:', error);
        }
      };
        
    async function getLiked (game_id, user_id) {
        const favoritosCollection = db.collection('likeds')

        const newItem  = {
            game_id,
            user_id
        }

        await likedsCollection.add(newItem).then(docRef => {
            console.log('Favorito adicionado com o ID:', docRef.id);
          })
          .catch(error => {
            console.error('Erro ao adicionar o favorito:', error);
          });
    }
    return(
        <div className="card" onClick={()=>criarColecao(currentUser.id, game.id)}>
            <div className="cardMain" >
                <img src={game.thumbnail} alt="banner game" />
                <ul className='overlay'>
                    <li>Developer: <p>{game.developer}</p></li>
                    <li>Genre:<p>{game.genre}</p></li>
                    <li>Platform:<p>{game.platform}</p></li>
                    <li>Publisher:<p>{game.publisher}</p></li>
                    <li>Release Date:<p>{game.release_date}</p></li>
                    <li>Description:<p>{game.short_description}</p></li>
                </ul>
                    <div className='buttons'>
                        <FcLike 
                            className={`optBtn ${favorite ? 'liked' : 'unliked'}`}
                            onClick={() => getLiked(game.id, currentUser.id)}
                        />
                        <AiFillStar className={`optBtn ${liked ? 'rated' : 'unrated'}`}/>  
                        <h2 className='game-name'>{game.title}</h2>
                    </div>
            </div>
        </div>
    )
}

export default Card