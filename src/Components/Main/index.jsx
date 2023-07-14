import Card from '../Card'
import './style.scss'

import { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {FaFilter} from 'react-icons/fa'
import {ColorRing} from 'react-loader-spinner'

import { AuthContext } from '../../context/AuthContext';

const Main = () => {

      
    const [inputSearch, setInputSearch] = useState()
 
    const [showOpt, setShowOpt] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    
    const [fixedFilter, setFixedFilter] = useState(false)
    const [selectedBtn, setSelectedBtn] = useState()
    

    const { 
        dataGames,
        isLoad, setIsLoad,
        optPlataform, setOptPlataform,
        optGenre, setOptGenre,
        showData, setShowData
    } = useContext(AuthContext)



    const removeSpace = (valor) => {
        return valor.replace(/[^a-zA-Z0-9]/g, '')
    }
      
    function optionsView(type) {
        if (type === 'genre') {
            if(!showOpt) setShowOpt(true)
            else {
                setShowOpt(false)
                setShowData(dataGames)
            }
        } else if (type === 'filter') {
            if(!showFilters) setShowFilters(true)
            else {
                setShowFilters(false)
                setShowData(dataGames)
            }
        }
    }

        
    function searchGames(e) {
        const pesquisa = e.target.value
        function filterGames(array, input) {
            const inputLC = input.toLowerCase();
            return array.filter(game => game.title.toLowerCase().includes(inputLC));
        }
    
        const AllGames = filterGames(dataGames, pesquisa)
        setShowData(AllGames)
    }
    
    function SearchFilter(type, search) {
        if(type === 'platform') {
            if(removeSpace(search) === selectedBtn) return setShowData(dataGames)
            const findSearch = dataGames.filter(filter => filter.platform === search)
            setShowData(findSearch)
        } else if (type === 'genre') {
            if(removeSpace(search) === selectedBtn) return setShowData(dataGames)
            const findSearch = dataGames.filter(filter => filter.genre === search)
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

    

    if (!isLoad) {
        return (
            <>
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
                <div className='mainCard'>
                {
                    showData.map(game => {
                        return(
                            <Card game={game} key={game.id}/> 
                        )
                    })
                }
                </div>
            </>
        )
    } else if (isLoad === 'Error'){
        return (
            <div className="error">
                <img src="https://cdn-icons-png.flaticon.com/512/5741/5741333.png" alt="error image" />
                <p>Desculpe Ocorreu algum error, volte outra hora...</p>
                <ToastContainer 
                    position='top-center'
                />
            </div>
        )
    } else {
        return (
            <div className='divLoader'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{margin: '0 auto'}}
                    colors={['#023e8a', '#3e71b4', '#2174e0', '#253242', '#777f8a']}
                />
                <p>Aguarde ...</p>
            </div>
        )
    }
}

export default Main