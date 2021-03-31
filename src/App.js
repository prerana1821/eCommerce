import "./App.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { WishList } from "./WishList";
import { Products } from "./Products";
import { Cart } from "./Cart";

function App() {
  const [route, setRoute] = useState("products");

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
  };

  return (
    <div className='App'>
      <Navbar changeRoute={changeRoute} />
      {route === "products" && <Products />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <WishList />}
    </div>
  );
}

export default App;
