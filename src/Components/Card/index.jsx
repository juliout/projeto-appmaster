
import { useContext, useEffect, useState } from 'react'
import './style.scss'
import {FcLike} from 'react-icons/fc'

import {AuthContext} from "../../context/AuthContext"
import {db} from '../../firebase'
import { setDoc, doc, query, getDoc,updateDoc } from 'firebase/firestore'
import Rating from './Rating'

import {AlertError} from "../AlertError"
import {AlertSucess} from "../AlertSucess"
import { useNavigate } from 'react-router-dom'

const Card = ({game}) => {
    const [liked, setLiked] = useState(false)
    const [rated ,setRated] = useState(0)

    const {currentUser, dataGamesUser, needLogin} = useContext(AuthContext)
    
    useEffect(()=> {
        if(currentUser) {
            async function findGame() {
                if(dataGamesUser) {
                    const filterGame = dataGamesUser.find(filt => `${game.id}` === filt.game_id)
                    if(filterGame) {
                        if(filterGame.liked) {
                            setLiked(filterGame.liked)
                        } 
                        if (filterGame.rated) {
                            setRated(filterGame.rated)
                        } 
                    }
                } 
            }
            findGame()
        }
    },[])

    const likedOrRated = async (user_uid, game_id, type, value) => {
        try {
            if(currentUser) {
                const washingtonRef = doc(db, user_uid, `${game_id}`);
                const q = await getDoc(washingtonRef)
                if(q.data()) {
                    if(type === "liked") {
                        await updateDoc(washingtonRef, {
                            liked: value
                        }).then(()=> setLiked(!liked))
                    } else if (type === "rated") {
                        await updateDoc(washingtonRef, {
                            rated: value
                        })
                    }
                } else {
                    if(type === "liked") {
                        await setDoc(doc(db, user_uid, `${game_id}`), {
                            liked: value,
                            rated: 0
                        }).then(()=> setLiked(!liked))
                    } else if (type === "rated") {
                        await setDoc(doc(db, `${user_uid}`, `${game_id}`), {
                            rated: value,
                            liked: false
                        });
                    } else {
                        return AlertError('Error!, if the error persists, come back later!')
                    }
                }
            } else {
               return needLogin()
            }
            
        } catch (error) {
          AlertError('Error: ', error.message);
        }
      };

    return(
        <div className="card" >
            <img src={game.thumbnail} alt="banner game" />
            <h2 className='game-name'>{game.title}</h2>
            <ul className='overlay'>
                <li>{game.platform} - {game.genre} - {game.release_date}</li>
                <li>{game.publisher}</li>
                <li>{game.short_description}</li>
            </ul>
            <div className='buttons'>
                    <FcLike 
                        className={`optBtn ${liked ? 'liked' : 'unliked'}`}
                        value={liked}
                        onClick={() => {
                            currentUser ? likedOrRated(currentUser.uid, game.id, "liked", !liked ) : needLogin()
                        }}
                    />
                    <Rating
                        setRated={setRated}
                        rating={rated}
                        likedOrRated={likedOrRated}
                        dados={{
                            userId: currentUser?.uid,
                            gameId: game.id,
                            type: 'rated',
                        }}
                    />
            </div>
            <a href={game.game_url} className='seeMore'>Pagina do jogo...</a>
        </div>
    )
}

export default Card
