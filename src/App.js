import "./App.css";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart, useCart } from "./Cart";
import { Home } from "./Home";
import { Route, Routes } from "react-router";
import { Toast } from "./Toast";
import { PrivateRoute, Login } from "./Auth";

function App() {
  const { cartState } = useCart();

  return (
    <div className='App' id='top'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <PrivateRoute path='/cart' element={<Cart />}></PrivateRoute>
          <PrivateRoute path='/wishlist' element={<WishList />}></PrivateRoute>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
        {cartState.loading && <Toast />}
        <a href='#top'>
          <div className=' btn-top badge-av'>
            <div className='avatar avatar-top av-pink'>
              <i className='fas fa-lg  fa-arrow-up'></i>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;
