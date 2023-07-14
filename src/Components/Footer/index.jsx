import './style.scss'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
    return(
        <footer>
            <ToastContainer style={{ zIndex: "999999" }} className={"error-container"}/>
        </footer>
    )
}

export default Footer