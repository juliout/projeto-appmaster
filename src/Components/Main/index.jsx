import Card from '../Card'

import './style.scss'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {FaFilter} from 'react-icons/fa'

import Loader from '../Loader'

const Main = () => {

    const [dataGames, setDataGames] = useState([]);
    const [showData, setShowData] = useState([])
    const [isLoad, setIsLoad] = useState(true)

    const [showOpt, setShowOpt] = useState(false)
    const [optGenre, setOptGenre ] = useState()
    const [showFilters, setShowFilters] = useState(false)
    const [optPlataform, setOptPlataform] = useState()

    const [inputSearch, setInputSearch] = useState()
    const [fixedFilter, setFixedFilter] = useState(false)

    useEffect(() => {
        let timeoutId;

        const fetchData = async () => {
            const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
            const email = 'juliocst1993@gmail.com';

            timeoutId = setTimeout(() => {
            toast.error('O servidor demorou para responder, tente mais tarde');
            }, 5000);

            try {
                const response = await axios.get(url, {
                    headers: {
                    'dev-email-address': email,
                    },
            });

            clearTimeout(timeoutId);

            setDataGames(response.data);
            setShowData(response.data)

            const Genre = getOptions('genre',response.data)
            const Plata = getOptions('platform', response.data)
            setOptGenre(Genre)
            setOptPlataform(Plata)
            setIsLoad(false)

            } catch (error) {
            clearTimeout(timeoutId);

            if (
                error.response &&
                [500, 502, 503, 504, 507, 508, 509].includes(error.response.status)
            ) {
                setIsLoad(false)
                toast.error('O servidor falhou em responder, tente recarregar a página');
            } else {
                setIsLoad(false)
                toast.error('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
            }
            }
        };

        fetchData();

        return () => {
            clearTimeout(timeoutId);
        };
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

    function optionsView(type) {
        if (type === 'genre') {
            if(!showOpt) setShowOpt(true)
            else setShowOpt(false)
        } else if (type === 'filter') {
            if(!showFilters) setShowFilters(true)
            else setShowFilters(false)
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
            const findSearch = dataGames.filter(filter => filter.platform === search)
            setShowData(findSearch)
        } else if (type === 'genre') {
            const findSearch = dataGames.filter(filter => filter.genre === search)
            setShowData(findSearch)
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
        }
        else if (locate < 100 && fixedFilter) {
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
                        > <FaFilter/>Filtros
                        </button>
                    </div>
                    {showOpt &&
                        <div className="options">
                            <div className="GenDiv">
                            {
                                optGenre?.map((gen, index) => {
                                    return (
                                        <button key={index} onClick={()=> SearchFilter('genre', gen)}>{gen}</button>
                                    )
                                })
                            }
                            </div>
                            <button 
                                onClick={()=> optionsView('filter')}
                                className='moreFilter'
                            >   More Filters
                            </button>
                            {showFilters &&
                                <div className="filters">
                                    {optPlataform?.map((filter, index) => {
                                        return (
                                            <button 
                                                key={index}  
                                                onClick={()=> SearchFilter('platform', filter)}
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
                <ToastContainer />
            </>
        )
    } else {
        return (
            <Loader/>
        )
    }
}

export default Main