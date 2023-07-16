import { useContext, useState, useEffect } from 'react'
import Card from '../../Components/Card'
//  <div className='mainCard'></div>
import { AuthContext } from '../../context/AuthContext'
import Header from '../../Components/Header'
import Footer from "../../Components/Footer"
import './style.scss'
import {db} from '../../firebase'
import { collection, query, where, getDocs  } from "firebase/firestore";

import  {FaFilter} from 'react-icons/fa'
import {GoListOrdered} from "react-icons/go"
import {AiOutlineArrowUp, AiOutlineArrowDown} from "react-icons/ai"
import {ColorRing} from 'react-loader-spinner'


export default function Likeds(){

    const [inputSearch, setInputSearch] = useState()
    const [optPlataform, setOptPlataform] = useState()
    
    const [optGenre, setOptGenre ] = useState()
    const [isLoad, setIsLoad] = useState(true)
    const [showData, setShowData] = useState([])

    const [showOpt, setShowOpt] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    
    const [fixedFilter, setFixedFilter] = useState(false)
    const [selectedBtn, setSelectedBtn] = useState()
    const [baseGames, setBaseGames] = useState()

    const {
            dataGamesUser,
            dataGames,
            currentUser, setDataGamesUser,
            fetchData

        } = useContext(AuthContext)
    

    useEffect(()=> {

        async function getLiked() {
            
            const q = query(collection(db, `${currentUser.uid}`), where("liked", "==", true))
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
          }
          getLiked()
        if(dataGamesUser && dataGames) {
            const games =  []
            dataGames.map(game => {
                const findGame = dataGamesUser.find(fin => `${game.id}` === fin.game_id)
                if(findGame) games.push(game)
            })
            const Genre = getOptions('genre', games)
            const Plata = getOptions('platform', games)
            setOptGenre(Genre)
            setOptPlataform(Plata)
            if(games.length > 0 ) {
                setBaseGames(games)
                setShowData(games)
            }
            
        }

    },[])

    
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

    window.onscroll = () => {
        const locate = window.scrollY
        let altura = document.body.clientHeight

        if (locate >= 100 && !fixedFilter && altura > 1207) {
            let margin = '100px'
            if(showFilters && showOpt) {
                margin = '300px'
            }
            document.querySelector('.mainCard').style.marginTop=`${margin}`
            setFixedFilter(true)
        } else if (locate < 100 && fixedFilter) {
            document.querySelector('.mainCard').style.marginTop='30px'
            setFixedFilter(false)
        }
        return
    }

    const removeSpace = (valor) => {
        return valor.replace(/[^a-zA-Z0-9]/g, '')
    }
      
    function optionsView(type) {
        if (type === 'genre') {
            if(!showOpt) setShowOpt(true)
            else {
                setShowOpt(false)
                setShowData(baseGames)
            }
        } else if (type === 'filter') {
            if(!showFilters) setShowFilters(true)
            else {
                setShowFilters(false)
                setShowData(baseGames)
            }
        }
    }
   
    function searchGames(e) {
        const pesquisa = e.target.value
        function filterGames(array, input) {
            const inputLC = input.toLowerCase();
            return array.filter(game => game.title.toLowerCase().includes(inputLC));
        }
    
        const AllGames = filterGames(baseGames, pesquisa)
        setShowData(AllGames)
    }
    
    function SearchFilter(type, search) {
        if(type === 'platform') {
            if(removeSpace(search) === selectedBtn) return setShowData(baseGames)
            const findSearch = baseGames.filter(filter => filter.platform === search)
            setShowData(findSearch)
        } else if (type === 'genre') {
            if(removeSpace(search) === selectedBtn) return setShowData(baseGames)
            const findSearch = baseGames.filter(filter => filter.genre === search)
            setShowData(findSearch)
        }
    }
    
    function MarkBtn(e) {
        const valor = removeSpace(e)
        if(!selectedBtn) {
            setSelectedBtn(valor)
            document.querySelector(`.${valor}`).classList.add('btnSelect')
        } else if (selectedBtn && selectedBtn !== valor) {
            document.querySelector(`.${selectedBtn}`).classList.remove('btnSelect')
            document.querySelector(`.${valor}`).classList.add('btnSelect')
            setSelectedBtn(valor)
        } else {
            document.querySelector(`.${valor}`).classList.remove('btnSelect')
            setSelectedBtn(false)
        }
    }

    function ordenarPorRatedDecrescente(array) {
        const ajustArray = array.sort((a, b) => b.rated - a.rated);
        const data = []
        ajustArray.forEach((each) => {
            const finder = baseGames.find(fin => `${fin.id}` === each.game_id)
            if(finder) data.push(finder)
        })
        return setShowData(data)
    }
    function ordenarPorRatedCrescente(array) {
        const ajustArray = array.sort((a, b) => a.rated - b.rated);
        const data = []
        ajustArray.forEach((each) => {
            const finder = baseGames.find(fin => `${fin.id}` === each.game_id)
            if(finder) data.push(finder)
        })
        return setShowData(data)
      }


    return (
        <div className="Container">
            <Header/>
            <div className={`divOpt ${fixedFilter ? 'fixedInTop' : ''}`}>
                    <div className='optFilter'>
                        <input 
                            type="search" 
                            name="searchGame" id="searchGame"
                            value={inputSearch}
                            placeholder='Deseja procurar algum game ?'
                            onChange={(e)=> {
                                searchGames(e)
                            }}
                        />
                        <button 
                            onClick={()=> optionsView('genre')}
                            className={`filterBtn ${showOpt ?  'baseColor' : ''}`}
                        > 
                            <FaFilter/>Filtros
                        </button>
                        <div>
                            <GoListOrdered className='orderby'/>
                            <ul className='orderOpt'>
                                    <li onClick={() => ordenarPorRatedDecrescente(dataGamesUser)}> 
                                        <AiOutlineArrowUp/> highest
                                    </li>
                                    <li onClick={() => ordenarPorRatedCrescente(dataGamesUser)}>
                                        <AiOutlineArrowDown/> less
                                    </li>
                            </ul>
                        </div>
                        
                    </div>
                    {showOpt &&
                        <div className="options">
                            <div className="GenDiv">
                            {
                                optGenre?.map((gen, index) => {
                                    return (
                                        <button 
                                        key={index}
                                        onClick={(e)=> {
                                            SearchFilter('genre', gen)
                                            MarkBtn(e.target.innerText)
                                        }}
                                        className={`${removeSpace(gen)}`}
                                    >{gen}</button>
                                    )
                                })
                            }
                            </div>
                            <button 
                                onClick={()=> optionsView('filter')}
                                className={`moreFilter ${showFilters ? 'btnSelect' : ''}`}
                            >   More Filters
                            </button>
                            {showFilters &&
                                <div className="filters">
                                    {optPlataform?.map((filter, index) => {
                                        return (
                                            <button 
                                                key={index}  
                                                onClick={(e)=> {
                                                    SearchFilter('platform', filter)
                                                    MarkBtn(e.target.innerText)
                                                }}
                                                className={`${removeSpace(filter)}`}
                                            > {filter}
                                            </button>
                                        )
                                    })}
                                </div>
                            }   
                        </div>  
                    }
            </div>
            <main className="mainCard">
                {
                    showData.map(game => {
                        return(
                            <Card game={game} key={game.id}/> 
                        )
                    })
                }
            </main> 
            <Footer/>
        </div>
    )
}