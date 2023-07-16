import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import {auth} from './firebase'
import {signOut} from "firebase/auth"

import Home from './pages/Home';
import Login from './pages/Login';
import Auth from './pages/AuthPage';
import Register from './pages/Register';
import Likeds from './pages/Likeds';
import NotFound from './pages/NotFound';
import { useContext } from 'react';
import { AlertError } from './Components/AlertError';

export default function Routeres() {
   function IsPrivate({children}) {
      const {authenticate, setDataGames} = useContext(AuthContext)

      if(!authenticate || !setDataGames) {
         return <Navigate to='/'/>
      }
      return children
   }

   function IsAuth({children}) {
      if(!auth.currentUser) {
         AlertError('Houve um erro na autenticação')
         
         signOut(auth).then(() => {
            setTimeout(()=> {
              setCurrentUser(false)
             return  <Navigate to='/'/>
            }, 2000)
          }).catch((error) => {
            AlertError(`${error.message} 😰!`)
          });
         
         setTimeout(()=> {
            return <Navigate to='/' />
         }, 3000)
      }
      return children
   }

   return (
      <Router>
         <AuthProvider>
            <Routes>
               <Route exact path="/" element={<Home/>} />
               <Route exact path="/login" element={<Login/>}/>
               <Route exact path="/auth" element={<IsAuth><Auth/></IsAuth>} IsAuth/>
               <Route exact path="/register" element={<Register/>}/>
               <Route exact path="/favoritos" element={<IsPrivate><Likeds/></IsPrivate>} IsPrivate/>
               <Route path='*' element={<NotFound/>} />
            </Routes>
         </AuthProvider>
      </Router>
   );
}
