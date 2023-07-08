
import Header from '../../Components/Header'
import Main from '../../Components/Main'
import Footer from '../../Components/Footer'
import ToTop from '../../Components/ToTop'
import { doc, getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect } from 'react'

export default function Home (){

  return (
    <div className='main'>
      <Header/>
      <Main/>
      <ToTop/>
      <Footer/>
    </div>
  );
};
