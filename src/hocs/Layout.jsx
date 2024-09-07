import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Navbar } from "../components/navigation/Navbar"
import { Footer } from "../components/footer/footer"

export const Layout = ({ children }) => {


  return (
    <div className="flex flex-col">
        <Navbar/>
        <ToastContainer autoClose={5000}/>
        <div className="container mx-auto">{children}</div>
        <Footer/>
    </div>
  )
}
