import Header from '../../Components/Header';
import Footer from '../../Components/Footer'
import './style.scss'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { useState, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext"

export default function Register(){

    const {register} = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [nickName, setNickName] = useState()
    const [rePassword, setRepassword] = useState()

    const Navigate = useNavigate()

    const HandleSubmit = async (e) => {
      e.preventDefault()
      register(email, password, nickName)
    }
    
    return (
        <div className="Container">
        <Header/>
        <main className="mainRegister">
          <form className="boxlogin" onSubmit={HandleSubmit}>
            <img src={logo} alt="coroaImagem" className='coroaImagem'/>
            <h3 className='title'>Register</h3>
            <div className="input">
              <label htmlFor="email">E-mail</label>
              <input 
                type="Email"
                id='email' 
                name='email'
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div className="input">
                <label htmlFor="NickName">NickName</label>
                <input 
                  type="text" 
                  name='NickName' 
                  id='NickName'
                  onChange={(e)=> setNickName(e.target.value)}
                />
            </div>
            <div className="input">
              <label htmlFor="password">password</label>
              <input 
                type="password" 
                id='password' 
                name='password'
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="repassword">re-password</label>
              <input 
                type="password" 
                id='repassword' 
                name='repassword'
                onChange={(e)=> setRepassword(e.target.value)}
              />
            </div>
  
            <div className="buttons">
              <button type='submit' className='buttonSubmit'>Register</button>
              <button type='button' className='btnlogin' onClick={() => Navigate('/login')}> you have account ? login</button>
            </div>
  
          </form>
        </main>
        <Footer/>
      </div>
    )
}