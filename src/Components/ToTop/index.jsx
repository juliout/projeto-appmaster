import {BsArrowUpSquareFill} from 'react-icons/bs'
import './style.scss'

const ToTop = () => {
    return (
        <BsArrowUpSquareFill 
            className='toTop' 
            onClick={()=> window.scrollTo(0, 0)}>

        </BsArrowUpSquareFill>
    )
}

export default ToTop