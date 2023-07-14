import { useEffect, useState } from "react"
import { AiFillStar,} from "react-icons/ai"
import "./style.scss"

export default function Rating({rating, setRated, dados, likedOrRated}) {
    const [rate, setRate] = useState()
    const [choiceRate, setChoiceRate] = useState(0)
    const [showChoices, setShowChoices] = useState(false)

    useEffect(()=> {
        if(rating) setRate(rating)
    },[])

    const {userId, gameId, type} = dados

    return (
        <>
            <div 
                className={`mainStars ${!showChoices ? 'show' : 'out'}`} 
                onMouseOver={() => setShowChoices(true)}
            >
                <AiFillStar 
                    className={`star ${rating >= 1 ? 'sSelected' : ''}`} 
                />
                <AiFillStar 
                    className={`star ${rating >= 2 ? 'sSelected' : ''}`} 

                />
                <AiFillStar 
                    className={`star ${rating >= 3 ? 'sSelected' : ''}`} 

                />
                <AiFillStar 
                    className={`star ${rating >= 4 ? 'sSelected' : ''}`} 

                />
                <AiFillStar 
                    className={`star ${rating >= 5 ? 'sSelected' : ''}`} 

                />
                
            </div>
            <div className={`choiceStars ${showChoices ? 'show' : 'out'}`}
                onMouseLeave={() => {
                    setChoiceRate(0)
                    setShowChoices(false)
                }}
            >
                <AiFillStar 
                    className={`star ${choiceRate >= 1 ? 'sSelected' : ''}`} 
                    onMouseEnter={() => setChoiceRate(1)} 
                    onClick={() => {
                            setRated(1)
                            likedOrRated(userId, gameId, type, 1)
                        }
                    }
                />
                <AiFillStar 
                    className={`star ${choiceRate >= 2 ? 'sSelected' : ''}`} 
                    onMouseEnter={() => setChoiceRate(2)} 
                    onClick={() => {
                        setRated(2)
                        likedOrRated(userId, gameId, type, 2)
                        }
                    }
                />
                <AiFillStar 
                    className={`star ${choiceRate >= 3 ? 'sSelected' : ''}`} 
                    onMouseEnter={() => setChoiceRate(3)} 
                    onClick={() => 
                        {
                            setRated(3) 
                            likedOrRated(userId, gameId, type, 3)
                        }
                        
                    }
                />
                <AiFillStar 
                    className={`star ${choiceRate >= 4 ? 'sSelected' : ''}`} 
                    onMouseEnter={() => setChoiceRate(4)} 
                    onClick={() => 
                        {
                            setRated(4)
                            likedOrRated(userId, gameId, type, 4)
                        }
                    }
                />
                <AiFillStar 
                    className={`star ${choiceRate >= 5 ? 'sSelected' : ''}`} 
                    onMouseEnter={() => setChoiceRate(5)} 
                    onClick={() => {
                        setRated(5)
                        likedOrRated(userId, gameId, type, 5)
                    }}
                />
            </div>
        </>
    )
}