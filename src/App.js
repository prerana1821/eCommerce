import "./App.css";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart } from "./Cart";
import { useUser } from "./User";
import { Home } from "./Home";
import { Route, Routes } from "react-router";
import { Toast } from "./Toast";
import {
  PrivateRoute,
  Login,
  SignUp,
  ForgotPassword,
  Account,
  // useAuth,
} from "./Auth";
// import { findUserById } from "./utils";
import { Address, Checkout } from "./Checkout";
import { ProductDetail } from "./ProductDetail/ProductDetail";
import { BottomToTop } from "./BottomToTop";

function App() {
  const { userState } = useUser();
  // const { user } = useAuth();
  // const currentUser = findUserById(userState, user._id);

  return (
    <div className='App' id='top'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:id' element={<ProductDetail />}></Route>
          <PrivateRoute path='/cart' element={<Cart />}></PrivateRoute>
          <PrivateRoute path='/wishlist' element={<WishList />}></PrivateRoute>
          <PrivateRoute path='/address' element={<Address />}></PrivateRoute>
          <PrivateRoute path='/checkout' element={<Checkout />}></PrivateRoute>
          <PrivateRoute path='/account' element={<Account />}></PrivateRoute>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
        {userState?.loading && <Toast />}
        <BottomToTop />
      </div>
    </div>
  );
}

export default App;
