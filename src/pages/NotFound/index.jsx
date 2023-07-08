import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import './style.scss'

export default function NotFound(){
    return (
        <div className="notFound">
            <Header/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZiRm41fTag2sR9I4zx8X7xZnv3-7MEZQB1jJ3msCP9D58sqrF3lQpx2tHvLZYigdaau0&usqp=CAU" alt="404 page" className='notFoundImg'/>
                <h3>Sorry, that page does not exist </h3>
            <Footer/>
        </div>
    )
}