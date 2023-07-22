import { createContext, useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../firebase'
import { collection, query, getDocs, where  } from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from "firebase/auth"
import axios from 'axios';

import { AlertError } from '../Components/AlertError';
import { AlertSucess } from '../Components/AlertSucess';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [dataGamesUser, setDataGamesUser] = useState(false)
  const [dataGames, setDataGames] = useState([]);
  
  const [isLoad, setIsLoad] = useState(true)
  const [optPlataform, setOptPlataform] = useState()
  const [optGenre, setOptGenre ] = useState()
  const [showData, setShowData] = useState([])

  const navigate = useNavigate()

  const fetchData = async () => {
    const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
    const email = 'juliocst1993@gmail.com';

    const cancelToken = axios.CancelToken;
    let cancel;

    //aqui inicia uma funcao onde seto na hora que ele inicia a requisicao, um timer,
    //caso esse timer seja finalizado e não tenha completado a requisicao ele vai disparar o erro e cancelar a requisicao e mostar na tela,
    //caso falhe por qualquer outro error, ele mostrara na tela o erro e imagem de error.
    // 
    const timeoutId = setTimeout(() => {
        cancel('O servidor demorou para responder, tente mais tarde')
    }, 5000);
    const locatePage = window.location.pathname
    if(locatePage === '/'){
      let requisicao = await axios.get(url, {
        cancelToken: new cancelToken(function executor(c) {
            cancel = c;
        }),
        headers: {
            'dev-email-address': email,
        },
    }).then( response => {
        clearTimeout(timeoutId);
        setDataGames(response.data);
        setShowData(response.data)
        const Genre = getOptions('genre',response.data)
        const Plata = getOptions('platform', response.data)
        setOptGenre(Genre)
        setOptPlataform(Plata)
        const user = currentUser ? currentUser : auth.currentUser;

        if (user) {
          const uid = user.uid;
          const email = user.email;
          const displayName = user.displayName;
          const photoURL = user.photoURL;

          const userInfo = { uid, email, displayName, photoURL }
          setCurrentUser(userInfo)
          
          async function getLiked() {
            
            const q = query(collection(db, `${userInfo.uid}`))
            const querySnapshot = await getDocs(q);

            const dados = []
            querySnapshot.forEach((doc) => {
              dados.push({
                game_id: doc.id,
                liked: doc.data().liked,
                rated: doc.data().rated ? doc.data().rated : ''
              })
            });
            setDataGamesUser(dados)
            setIsLoad(false)
            
          }
          getLiked()
        } else {
          setIsLoad(false)
        }

    }).catch( error => {
        if (error.code?.code === 'ERR_CANCELED') {
            AlertError(error.message)
            clearTimeout(timeoutId);
            setIsLoad('Error')
            requisicao = ''
        } else if (
            error.response &&
            [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)
        ) {
            AlertError('O servidor falhou em responder, tente recarregar a página');
            return setIsLoad('Error')      
        } else {
            AlertError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
            setIsLoad('Error')
            
        }
    })  
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getOptions (type, array){
    const options = []
    array.map(data => {
        let findOne
        if (type === 'genre') {
            findOne = options.find(find => find === data.genre)
            if (!findOne) options.push(data.genre)
        } else if (type === 'platform'){
            findOne = options.find(find => find === data.platform)
            if (!findOne) options.push(data.platform)
        }    
    })
    if(options.length > 0) return options
    else return false
  }

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      
      AlertSucess('Logado com sucesso!!')
      return setTimeout(() => {
        navigate('/auth')
      },2000)
    })
    .catch((error) => {
      if(error.code === "auth/user-not-found") {
        return AlertError('Email ou Senha Errado')
      }
      return AlertError(`${error.code} ${error.message}`)
    });
  };

  const register = async (email, password, nickname) => {
      await createUserWithEmailAndPassword(auth, email, password).then(async resposta=>{
        await updateProfile(resposta.user, {
          displayName: nickname,
        }).then(() => {
          AlertSucess('Conta criada, sessão iniciada')
          return setTimeout(() => {
            navigate('/auth')
          },2000)
        })
      })
      .catch(err => {
        console.log(err)
        return AlertError(err)
      })
  };

  const logout = async () => {
    signOut(auth).then(() => {
      AlertSucess('Você saiu com sucesso, voltando a tela inicial')
      setTimeout(()=> {
        setCurrentUser(false)
        window.location.href = '/'
      }, 2000)
    }).catch((error) => {
      AlertError(`${error.message} 😰!`)
    });
  };

  const needLogin = () => {
    AlertError(`Você precisa Estar Logado para curtir ou avaliar!\nSendo redirecionado para tela de login!`)
    return setTimeout(()=> {
        navigate('/login')
    },3000)
  }

  return (
    <AuthContext.Provider value={{
      currentUser, 
      setCurrentUser,
      register,
      login,
      logout,
      dataGamesUser,
      setDataGamesUser,
      dataGames,
      setDataGames,
      isLoad, setIsLoad,
      optPlataform, setOptPlataform,
      optGenre, setOptGenre,
      showData, setShowData,
      needLogin, 
      authenticate: !!currentUser,
      fetchData
    }}>
      {children}
    </AuthContext.Provider>
  );
};
