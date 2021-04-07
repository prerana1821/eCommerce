import "./App.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart, useCart } from "./Cart";
import { Filters } from "./Filters";
import { Home } from "./Home";

function App() {
  const [route, setRoute] = useState("products");
  const { cartState } = useCart();

  const changeRoute = (routeName) => {
    if (routeName === "cart") {
      setRoute("cart");
    }
    if (routeName === "wishlist") {
      setRoute("wishlist");
    }
    if (routeName === "products") {
      setRoute("products");
    }
    if (routeName === "home") {
      setRoute("home");
    }
  };

  return (
    <div className='App'>
      <Navbar changeRoute={changeRoute} route={route} />
      {route === "home" && <Home changeRoute={changeRoute} />}
      <div className='main'>
        {route === "products" && <Filters />}
        {route === "products" && <Products setRoute={setRoute} />}
        {route === "cart" && <Cart changeRoute={changeRoute} />}
        {route === "wishlist" && <WishList />}
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
