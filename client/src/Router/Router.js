import { BrowserRouter, Route, Routes } from "react-router-dom"
import Admin from "../pages/Admin/Admin"
import Cart from "../pages/Cart/Cart"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"


const Router = () => {

    
  
    return (
      
          <BrowserRouter>
              <Routes>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/admin" element={<Admin/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="*" element={<Home/>} />
              </Routes>
          </BrowserRouter>
      
    )
  }
  
  export default Router