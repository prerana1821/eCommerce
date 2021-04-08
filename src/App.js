import "./App.css";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart, useCart } from "./Cart";
import { Home } from "./Home";
import { Route, Routes } from "react-router";

function App() {
  // const [route, setRoute] = useState("products");
  const { cartState } = useCart();

  // const changeRoute = (routeName) => {
  //   if (routeName === "cart") {
  //     setRoute("cart");
  //   }
  //   if (routeName === "wishlist") {
  //     setRoute("wishlist");
  //   }
  //   if (routeName === "products") {
  //     setRoute("products");
  //   }
  //   if (routeName === "home") {
  //     setRoute("home");
  //   }
  // };

  return (
    <div className='App'>
      <Navbar />
      {/* {route === "home" && <Home changeRoute={changeRoute} />} */}
      <div className='main'>
        {/* {route === "products" && <Filters />}
        {route === "products" && <Products setRoute={setRoute} />}
        {route === "cart" && <Cart changeRoute={changeRoute} />}
        {route === "wishlist" && <WishList />}
      {cartState.loading && <Toast />} */}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/products' element={<Filters />}></Route> */}
          <Route path='/products' element={<Products />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/wishlist' element={<WishList />}></Route>
        </Routes>
        {cartState.loading && <Toast />}
      </div>
    </div>
  );
}

export const Toast = () => {
  const { cartState } = useCart();
  return (
    <>
      <div className='toast tl-error status'>
        <div className='tl-content-error'>
          <i className='fas fa-check-circle'></i>
          <p>{cartState.loading}</p>
        </div>
      </div>
    </>
  );
};

export default App;
