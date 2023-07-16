import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer'
import './style.scss'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { AlertError } from '../../Components/AlertError';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);

  };

  const Navigate = useNavigate()

  return (
    <div className="Container">
      <Header/>
      <main className="mainLogin">
        <form className="boxlogin" onSubmit={handleLogin}>
          <img src={logo} alt="coroaImagem" className='coroaImagem'/>
          <h3 className='title'>login</h3>
          <div className="input">
            <label htmlFor="email">E-mail</label>
            <input 
              type="Email" 
              name='email' 
              id='email'
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="password" className='label'>Password</label>
            <input 
              type="password" 
              name='password' 
              id='password'
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </div>

          <div className="buttons">
            <button type='submit' className='buttonSubmit'>Login</button>
            <button type='button' className='forgotPass' onClick={()=> AlertError('Desculpe essa parte ainda esta em construção 👨‍🔧')}> forgot pass</button>
          </div>
          
          <button 
            type='button' 
            className='register'
            onClick={()=> Navigate('/register')}
          > Don't have account? REGISTER
          </button>
        </form>
      </main>
      <Footer/>
    </div>
  )
};
