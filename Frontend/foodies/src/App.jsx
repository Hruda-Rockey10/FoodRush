import React from 'react'
import Menubar from './components/Menubar/Menubar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ExploreFood from './pages/ExploreFood/ExploreFood'
import ContactUs from './pages/Contact/Contact'
import BackgroundVideo from './components/BackgroundVideo'
import './App.css' 
import FoodDetails from './pages/FoodDetails/FoodDetails'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Register from './components/RegisterYeti/YetiRegister'
import Login from './components/LoginYeti/YetiLogin'
import MyOrders from './pages/MyOrders/MyOrders'
import { useContext } from 'react'
import { StoreContext } from './components/context/StoreContext'



const App = () => {
  const {token} = useContext(StoreContext);
  return (
    <div>
      <BackgroundVideo />
      <Menubar />
      <ToastContainer />
      <div className="content-wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/explore' element={<ExploreFood />} />
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={token ? <PlaceOrder/> : <Login/>} />
        <Route path='/register' element={token ? <Home/> : <Register/>} />
        <Route path='/login' element={token  ? <Home/> : <Login/>} />
        <Route path='/myorders' element={token ? <MyOrders/> : <Login/>}></Route>
      </Routes>
      </div>
    </div>
   
  )
}

export default App