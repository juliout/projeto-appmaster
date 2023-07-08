import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Likeds from './pages/Likeds';
import NotFound from './pages/NotFound';

export default function Routeres() {
   return (
      <Router>
         <AuthProvider>
            <Routes>
               <Route exact path="/" element={<Home/>} />
               <Route exact path="/login" element={<Login/>} />
               <Route exact path="/register" element={<Register/>} />
               <Route exact path="/Likeds" element={<Likeds/>} />
               <Route path='*' element={<NotFound/>} />
            </Routes>
         </AuthProvider>
      </Router>
   );
}
