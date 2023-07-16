import { useContext, useEffect } from "react"
import {auth, db} from '../../firebase'
import { collection, query, getDocs  } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { AlertError } from "../../Components/AlertError";
 
export default function Auth(){

    const {currentUser, setCurrentUser, setDataGamesUser} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=> {
        if(currentUser) return navigate('/')
        if(!auth) return navigate('/')

        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const email = user.email;
          const displayName = user.displayName;
          const photoURL = user.photoURL;

          const userInfo = { uid, email, displayName, photoURL }
          setCurrentUser(userInfo)
          
          async function getLiked() {
            const l = query(collection(db, `${userInfo.uid}`));
            const querySnapshot = await getDocs(l);

            const dados = []
            querySnapshot.forEach((doc) => {
              dados.push({
                game_id: doc.id,
                liked: doc.data().liked,
                rated: doc.data().rated
              })
            });

            setDataGamesUser(dados)
            setTimeout(() => {
                navigate('/')
            },2000)
          }
          getLiked()
        } else {
            AlertError('ocorreu um error!!')
            return setTimeout(() => {
                window.location.href = '/'
            },3000)
        }
    },[])

    return (
        <div className="auth">
            <Header/>
            <img src="https://www.orbedobrasil.com.br/site/images/nicepage-images/pontos.gif" className="authimg"/>
            <Footer/>
        </div>
    )
}