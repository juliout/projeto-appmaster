import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Likeds from './pages/Likeds';
import NotFound from './pages/NotFound';
import { useContext } from 'react';


export default function Routeres() {

   function IsPrivate({children}) {
      const {authenticate} = useContext(AuthContext)

      if(!authenticate) {
         return <Navigate to='/'/>
      }
      return children
   }

   return (
      <Router>
         <AuthProvider>
            <Routes>
               <Route exact path="/" element={<Home/>} />
               <Route exact path="/login" element={<Login/>} />
               <Route exact path="/register" element={<Register/>} />
               <Route exact path="/likeds" element={<IsPrivate><Likeds/></IsPrivate>} IsPrivate/>
               <Route path='*' element={<NotFound/>} />
            </Routes>
         </AuthProvider>
      </Router>
   );
}
