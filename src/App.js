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
  useAuth,
} from "./Auth";
import { findUserById } from "./utils";

function App() {
  const { userState } = useUser();
  const { login, user } = useAuth();
  const currentUser = findUserById(userState, user._id);

  console.log({ user });
  console.log({ login });
  console.log({ currentUser });

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
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <PrivateRoute path='/account' element={<Account />}></PrivateRoute>
        </Routes>
        {currentUser?.loading && <Toast />}
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
